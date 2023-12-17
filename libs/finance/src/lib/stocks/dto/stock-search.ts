import { SearchGetResponse } from './search-get-response';

export class StockSearch {
  public symbol: string;
  public name: string;
  public type: string;
  public region: string;
  public marketOpen: string;
  public marketClose: string;
  public timezone: string;
  public currency: string;
  public matchScore: string;

  public static toModel(response: SearchGetResponse): StockSearch[] {
    if (!response || !response.bestMatches) {
      return;
    }

    return response.bestMatches.map((result) => {
      const stockSearch = new StockSearch();
      stockSearch.symbol = result['1. symbol'];
      stockSearch.name = result['2. name'];
      stockSearch.type = result['3. type'];
      stockSearch.region = result['4. region'];
      stockSearch.marketOpen = result['5. marketOpen'];
      stockSearch.marketClose = result['6. marketClose'];
      stockSearch.timezone = result['7. timezone'];
      stockSearch.currency = result['8. currency'];
      stockSearch.matchScore = result['9. matchScore'];
      return stockSearch;
    });
  }
}
