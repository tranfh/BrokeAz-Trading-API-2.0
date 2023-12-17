import { Injectable } from '@nestjs/common';
import { AlphaVFunctions } from '../alphav-functions';
import { AlphavantageClient } from '../alphavantage-client';
import {
  Intraday,
  IntradayGetRequest,
  IntradayGetResponse,
  IntradayInput
} from './dto';
import { News } from './dto/news';
import { NewsGetRequest } from './dto/news-get-request';
import { NewsGetResponse } from './dto/news-get-response';
import { QuoteGetRequest } from './dto/quote-get-request';
import { QuoteGetResponse } from './dto/quote-get-response';
import { SearchGetRequest } from './dto/search-get-request';
import { SearchGetResponse } from './dto/search-get-response';
import { StockQuote } from './dto/stock-quote';
import { StockSearch } from './dto/stock-search';
import { Trending } from './dto/trending';
import { TrendingGetRequest } from './dto/trending-get-request';
import { TrendingGetResponse } from './dto/trending-get-response';

@Injectable()
export class StocksService {
  constructor(/* @Inject() */ private alphavantageClient: AlphavantageClient) {}

  public async fetchIntraday(input: IntradayInput): Promise<Intraday> {
    const intradayResponse = await this.alphavantageClient.request<
      IntradayGetRequest,
      IntradayGetResponse
    >(AlphaVFunctions.TIME_SERIES_INTRADAY, input);

    return Intraday.toModel(intradayResponse);
  }

  public async fetchQuote(symbol: string): Promise<StockQuote> {
    const quoteResponse = await this.alphavantageClient.request<
      QuoteGetRequest,
      QuoteGetResponse
    >(AlphaVFunctions.GLOBAL_QUOTE, { symbol });

    return StockQuote.toModel(quoteResponse);
  }

  public async search(keywords: string): Promise<StockSearch[]> {
    const searchResponse = await this.alphavantageClient.request<
      SearchGetRequest,
      SearchGetResponse
    >(AlphaVFunctions.SYMBOL_SEARCH, { keywords });
    return StockSearch.toModel(searchResponse);
  }

  public async marketNews(ticker: string): Promise<News> {
    const newsResponse = await this.alphavantageClient.request<
      NewsGetRequest,
      NewsGetResponse
    >(AlphaVFunctions.NEWS_SENTIMENT, {
      tickers: ticker
    });

    return News.toModel(newsResponse);
  }

  public async trending(): Promise<Trending> {
    const trendingResponse = await this.alphavantageClient.request<
      TrendingGetRequest,
      TrendingGetResponse
    >(AlphaVFunctions.TOP_GAINERS_LOSERS, {});

    return Trending.toModel(trendingResponse);
  }
}
