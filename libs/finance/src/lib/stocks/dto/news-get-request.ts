import { NewsSortingType } from './news-sorting-type';

export interface NewsGetRequest {
  tickers: string;
  timeFrom?: string;
  timeTo?: string;
  limit?: number;
  sort?: NewsSortingType;
}
