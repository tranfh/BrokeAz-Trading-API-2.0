import { QuoteGetResponse } from './quote-get-response';

export class StockQuote {
  public symbol: string;
  public open: number;
  public high: number;
  public low: number;
  public price: number;
  public volume: number;
  public latestTradingDay: string;
  public previousClose: number;
  public change: number;
  public changePercent: number;

  public static toModel(response: QuoteGetResponse): StockQuote {
    const quote = response['Global Quote'];

    if (!response || !quote) {
      return;
    }
    const model = new StockQuote();
    model.symbol = quote['01. symbol'];
    model.open = parseFloat(quote['02. open']);
    model.high = parseFloat(quote['03. high']);
    model.low = parseFloat(quote['04. low']);
    model.price = parseFloat(quote['05. price']);
    model.volume = parseFloat(quote['06. volume']);
    model.latestTradingDay = quote['07. latest trading day'];
    model.previousClose = parseFloat(quote['08. previous close']);
    model.change = parseFloat(quote['09. change']);
    model.changePercent = parseFloat(quote['10. change percent']);

    return model;
  }
}
