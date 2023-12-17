import { DateTime } from 'luxon';

export class RedditPost {
  public subreddit: string;
  public title: string;
  public content: string;
  public createdUTC: string;

  public static toModel(response: any): RedditPost[] {
    const posts = response.map((post) => {
      const redditPost = new RedditPost();
      redditPost.subreddit = post.data.subreddit;
      redditPost.title = post.data.title;
      redditPost.content = post.data.selftext;
      redditPost.createdUTC = DateTime.fromSeconds(
        post.data.created_utc
      ).toISO();
      return redditPost;
    });
    return posts;
  }
}
