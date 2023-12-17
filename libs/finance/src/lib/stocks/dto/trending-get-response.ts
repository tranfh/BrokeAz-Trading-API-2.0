import { StockPerformance } from './stock-performace';

export interface TrendingGetResponse {
  top_gainers: StockPerformance[];
  top_losers: StockPerformance[];
  most_actively_traded: StockPerformance[];
}
