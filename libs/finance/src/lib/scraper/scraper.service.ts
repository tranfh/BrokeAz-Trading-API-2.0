import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { DateTime, Interval } from 'luxon';
import { RedditGetResponse } from './dto/reddit-get-response';
import { RedditPost } from './dto/reddit-post';
import Snoowrap = require('snoowrap');

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);
  private readonly userAgent: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly username: string;
  private readonly password: string;
  private readonly subreddits: string[];
  private readonly redditClient: Snoowrap;
  private readonly httpClient: AxiosInstance;

  constructor(/* @Inject() */ private configService: ConfigService) {
    this.userAgent = this.configService.get<string>('reddit.userAgent');
    this.clientId = this.configService.get<string>('reddit.clientId');
    this.clientSecret = this.configService.get<string>('reddit.clientSecret');
    this.username = this.configService.get<string>('reddit.username');
    this.password = this.configService.get<string>('reddit.password');
    this.subreddits = this.configService.get<string[]>('reddit.subreddits');

    this.redditClient = new Snoowrap({
      userAgent: this.userAgent,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      username: this.username,
      password: this.password
    });
    this.httpClient = axios.create({
      baseURL: this.configService.get<string>('reddit.baseUrl'),
      headers: { 'Content-Type': 'application/json' }
    });
  }
  public async trendingOnReddit(): Promise<string[]> {
    const promises = this.subreddits.map((subreddit) =>
      this.request<RedditGetResponse>(subreddit)
    );
    const resolved = await Promise.all(promises);
    const posts: RedditPost[] = resolved.flatMap(RedditPost.toModel);

    const postsWithinLastMonth = posts.filter((post) => {
      const start = DateTime.now().minus({ months: 1 });
      const end = DateTime.now();
      return Interval.fromDateTimes(start, end).contains(
        DateTime.fromISO(post.createdUTC)
      );
    });

    return this.parseContent(postsWithinLastMonth);
  }

  private parseContent(posts: RedditPost[]): string[] {
    const tickerCounts = new Map<string, number>();
    for (const post of posts) {
      const regex = /\$([A-Z]{1,5})/g;
      const matches = post.content.match(regex);
      if (matches) {
        for (const match of matches) {
          const count = tickerCounts.get(match) || 0;
          tickerCounts.set(match, count + 1);
        }
      }
    }
    const sorted = Array.from(tickerCounts.entries()).sort(
      (a, b) => b[1] - a[1]
    );
    return sorted.map((x) => x[0]);
  }

  private async request<R>(data: string): Promise<R> {
    try {
      this.logger.debug({
        msg: `Requesting Reddit Posts: ${data}`,
        data
      });

      const response = await this.httpClient.get(data + '.json');

      this.logger.verbose({
        msg: 'Reddit Response',
        data,
        status: response.status,
        statusText: response.statusText
      });

      return response.data.data.children;
    } catch (err) {
      this.logger.error({ msg: `Error logging request: ${err}` });
      throw new Error('Could not complete Reddit request');
    }
  }
}
