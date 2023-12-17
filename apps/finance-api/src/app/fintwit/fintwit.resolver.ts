import { ScraperService } from '@brokeaz-trader-2.0/finance';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';

@Resolver()
export class FinTwitResolver {
  private readonly logger = new Logger(FinTwitResolver.name);

  constructor(
    /* @Inject() */ private readonly scraperService: ScraperService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Query(() => [String])
  public async trendingOnReddit(): Promise<string[]> {
    const cacheKey = `redditPosts`;
    const cachedValue: string = await this.cacheManager.get(cacheKey);
    if (cachedValue) {
      this.logger.debug(`Cache Found for ${cacheKey}`);
      return JSON.parse(cachedValue);
    }
    const response = await this.scraperService.trendingOnReddit();
    await this.cacheManager.set(
      cacheKey,
      JSON.stringify(response),
      60 * 60 * 24
    );
    this.logger.debug(`Cache Set for ${cacheKey}`);
    return response;
  }
}
