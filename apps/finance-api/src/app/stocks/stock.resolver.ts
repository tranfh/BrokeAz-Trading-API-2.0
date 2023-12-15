import { StocksService } from '@brokeaz-trader-2.0/finance';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { IntradayInput } from './model/intraday.input';
import { IntradayOutput } from './model/intraday.output';

@Resolver()
export class StockResolver {
  private readonly logger = new Logger(StockResolver.name);

  constructor(
    /* @Inject() */ private readonly stocksService: StocksService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Query(() => IntradayOutput)
  public async intraday(
    @Args('input', { type: () => IntradayInput }) input: IntradayInput
  ): Promise<IntradayOutput> {
    const cacheKey = `intraday-${input.symbol}-${input.interval}`;
    const cachedValue: string = await this.cacheManager.get(cacheKey);
    if (cachedValue) {
      this.logger.debug(`Cache Found for ${cacheKey}`);
      return JSON.parse(cachedValue);
    }
    const response = await this.stocksService.fetchIntraday(input);
    const result = IntradayOutput.fromModel(response);
    const interval = Number(input.interval[0]);
    await this.cacheManager.set(
      cacheKey,
      JSON.stringify(result),
      6000 * interval
    );
    this.logger.debug(`Cache Set for ${cacheKey}`);

    return result;
  }
}
