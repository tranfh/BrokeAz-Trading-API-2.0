import { StockPerformance } from './stock-performace';
import { TrendingGetResponse } from './trending-get-response';

export class Trending {
  public topGainers: StockPerformance[];
  public topLosers: StockPerformance[];
  public mostActivelyTraded: StockPerformance[];

  public static toModel(response: TrendingGetResponse): Trending {
    const trending = new Trending();
    console.log(response, 'top gainers');
    trending.topGainers = response.top_gainers
      ? response.top_gainers.map((result) => {
          const stockPerformance = new StockPerformance();
          stockPerformance.ticker = result.ticker;
          stockPerformance.price = result.price;
          stockPerformance.changeAmount = result.changeAmount;
          stockPerformance.changePercentage = result.changePercentage;
          stockPerformance.volume = result.volume;
          return stockPerformance;
        })
      : [];
    trending.topLosers = response.top_losers
      ? response.top_losers.map((result) => {
          const stockPerformance = new StockPerformance();
          stockPerformance.ticker = result.ticker;
          stockPerformance.price = result.price;
          stockPerformance.changeAmount = result.changeAmount;
          stockPerformance.changePercentage = result.changePercentage;
          stockPerformance.volume = result.volume;
          return stockPerformance;
        })
      : [];
    trending.mostActivelyTraded = response.most_actively_traded
      ? response.most_actively_traded.map((result) => {
          const stockPerformance = new StockPerformance();
          stockPerformance.ticker = result.ticker;
          stockPerformance.price = result.price;
          stockPerformance.changeAmount = result.changeAmount;
          stockPerformance.changePercentage = result.changePercentage;
          stockPerformance.volume = result.volume;
          return stockPerformance;
        })
      : [];
    console.log(trending);
    return trending;
  }
}
