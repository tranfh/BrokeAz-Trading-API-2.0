import { StocksService } from '@brokeaz-trader-2.0/finance';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { IntradayInterval } from './model/intraday-interval';
import { IntradayStockInput } from './model/intraday-stock.input';
import { IntradayOutput } from './model/intraday.output';
import { NewsOutput } from './model/news.output';
import { SearchOutput } from './model/search.output';
import { StockQuoteOutput } from './model/stock-quote.output';
import { TrendingOutput } from './model/trending-output';

@Resolver()
export class StockResolver {
  private readonly logger = new Logger(StockResolver.name);

  constructor(
    /* @Inject() */ private readonly stocksService: StocksService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Query(() => IntradayOutput)
  public async oneMinute(
    @Args('input', { type: () => IntradayStockInput }) input: IntradayStockInput
  ): Promise<IntradayOutput> {
    const cacheKey = `intraday-${input.symbol}-${IntradayInterval.OneMinute}`;
    const cachedValue: string = await this.cacheManager.get(cacheKey);
    if (cachedValue) {
      this.logger.debug(`Cache Found for ${cacheKey}`);
      return JSON.parse(cachedValue);
    }
    const response = await this.stocksService.fetchIntraday(
      IntradayStockInput.toModel(input, IntradayInterval.OneMinute)
    );
    const result = IntradayOutput.fromModel(
      input.symbol,
      IntradayInterval.OneMinute,
      response
    );

    if (result) {
      await this.cacheManager.set(cacheKey, JSON.stringify(result), 6000);
      this.logger.debug(`Cache Set for ${cacheKey}`);
    }
    return result;
  }

  @Query(() => IntradayOutput)
  public async fiveMinute(
    @Args('input', { type: () => IntradayStockInput }) input: IntradayStockInput
  ): Promise<IntradayOutput> {
    const cacheKey = `intraday-${input.symbol}-${IntradayInterval.FiveMinutes}`;
    const cachedValue: string = await this.cacheManager.get(cacheKey);
    if (cachedValue) {
      this.logger.debug(`Cache Found for ${cacheKey}`);
      return JSON.parse(cachedValue);
    }
    const response = await this.stocksService.fetchIntraday(
      IntradayStockInput.toModel(input, IntradayInterval.FiveMinutes)
    );

    const result = IntradayOutput.fromModel(
      input.symbol,
      IntradayInterval.FiveMinutes,
      response
    );
    if (result) {
      await this.cacheManager.set(cacheKey, JSON.stringify(result), 6000 * 5);
      this.logger.debug(`Cache Set for ${cacheKey}`);
    }

    return result;
  }
  @Query(() => IntradayOutput)
  public async fifteenMinute(
    @Args('input', { type: () => IntradayStockInput }) input: IntradayStockInput
  ): Promise<IntradayOutput> {
    const cacheKey = `intraday-${input.symbol}-${IntradayInterval.FifteenMinutes}`;
    const cachedValue: string = await this.cacheManager.get(cacheKey);
    if (cachedValue) {
      this.logger.debug(`Cache Found for ${cacheKey}`);
      return JSON.parse(cachedValue);
    }
    const response = await this.stocksService.fetchIntraday(
      IntradayStockInput.toModel(input, IntradayInterval.FifteenMinutes)
    );
    const result = IntradayOutput.fromModel(
      input.symbol,
      IntradayInterval.FifteenMinutes,
      response
    );
    if (result) {
      await this.cacheManager.set(cacheKey, JSON.stringify(result), 6000 * 15);
      this.logger.debug(`Cache Set for ${cacheKey}`);
    }

    return result;
  }

  @Query(() => IntradayOutput)
  public async thirtyMinute(
    @Args('input', { type: () => IntradayStockInput }) input: IntradayStockInput
  ): Promise<IntradayOutput> {
    const cacheKey = `intraday-${input.symbol}-${IntradayInterval.ThirtyMinutes}`;
    const cachedValue: string = await this.cacheManager.get(cacheKey);
    if (cachedValue) {
      this.logger.debug(`Cache Found for ${cacheKey}`);
      return JSON.parse(cachedValue);
    }
    const response = await this.stocksService.fetchIntraday(
      IntradayStockInput.toModel(input, IntradayInterval.ThirtyMinutes)
    );
    const result = IntradayOutput.fromModel(
      input.symbol,
      IntradayInterval.ThirtyMinutes,
      response
    );
    if (result) {
      await this.cacheManager.set(cacheKey, JSON.stringify(result), 6000 * 30);
      this.logger.debug(`Cache Set for ${cacheKey}`);
    }

    return result;
  }

  @Query(() => IntradayOutput)
  public async sixtyMinute(
    @Args('input', { type: () => IntradayStockInput }) input: IntradayStockInput
  ): Promise<IntradayOutput> {
    const cacheKey = `intraday-${input.symbol}-${IntradayInterval.SixtyMinutes}`;
    const cachedValue: string = await this.cacheManager.get(cacheKey);
    if (cachedValue) {
      this.logger.debug(`Cache Found for ${cacheKey}`);
      return JSON.parse(cachedValue);
    }
    const response = await this.stocksService.fetchIntraday(
      IntradayStockInput.toModel(input, IntradayInterval.SixtyMinutes)
    );
    const result = IntradayOutput.fromModel(
      input.symbol,
      IntradayInterval.SixtyMinutes,
      response
    );
    if (result) {
      await this.cacheManager.set(cacheKey, JSON.stringify(result), 6000 * 60);
      this.logger.debug(`Cache Set for ${cacheKey}`);
    }
    return result;
  }

  @Query(() => StockQuoteOutput, { nullable: true })
  public async quote(
    @Args('symbol', { type: () => String }) symbol: string
  ): Promise<StockQuoteOutput> {
    const cacheKey = `quote-${symbol}`;
    const cachedValue: string = await this.cacheManager.get(cacheKey);
    if (cachedValue) {
      this.logger.debug(`Cache Found for ${cacheKey}`);
      return JSON.parse(cachedValue);
    }
    const response = await this.stocksService.fetchQuote(symbol);
    const result = StockQuoteOutput.fromModel(response);
    if (result) {
      await this.cacheManager.set(cacheKey, JSON.stringify(result), 6000 * 15);
      this.logger.debug(`Cache Set for ${cacheKey}`);
    }

    return result;
  }

  @Query(() => [SearchOutput], { nullable: true })
  public async search(
    @Args('keywords', { type: () => String }) keywords: string | null
  ): Promise<SearchOutput[]> {
    const cacheKey = `search-${keywords}`;
    const cachedValue: string = await this.cacheManager.get(cacheKey);
    if (cachedValue) {
      this.logger.debug(`Cache Found for ${cacheKey}`);
      return JSON.parse(cachedValue);
    }
    const response = await this.stocksService.search(keywords);
    const result = response && response.map(SearchOutput.fromModel);
    if (result) {
      await this.cacheManager.set(cacheKey, JSON.stringify(result), 6000 * 60);
      this.logger.debug(`Cache Set for ${cacheKey}`);
    }

    return result;
  }

  @Query(() => [NewsOutput])
  public async marketNews(
    @Args('ticker', { type: () => String }) ticker: string
  ): Promise<NewsOutput[]> {
    const cacheKey = `marketNews-${ticker}`;
    const cachedValue: string = await this.cacheManager.get(cacheKey);
    if (cachedValue) {
      this.logger.debug(`Cache Found for ${cacheKey}`);
      return JSON.parse(cachedValue);
    }
    const response = await this.stocksService.marketNews(ticker);
    const result = response.newsItems.map(NewsOutput.fromModel);
    if (result) {
      await this.cacheManager.set(cacheKey, JSON.stringify(result), 6000 * 60);
      this.logger.debug(`Cache Set for ${cacheKey}`);
    }
    return result;
  }

  @Query(() => TrendingOutput)
  public async trending(): Promise<TrendingOutput> {
    const cacheKey = `trending`;
    const cachedValue: string = await this.cacheManager.get(cacheKey);
    if (cachedValue) {
      this.logger.debug(`Cache Found for ${cacheKey}`);
      return JSON.parse(cachedValue);
    }
    const response = await this.stocksService.trending();
    const result = TrendingOutput.fromModel(response);
    if (result) {
      await this.cacheManager.set(cacheKey, JSON.stringify(result), 6000 * 60);
      this.logger.debug(`Cache Set for ${cacheKey}`);
    }
    return result;
  }
}
