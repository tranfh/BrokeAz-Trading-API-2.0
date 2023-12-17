import { StockQuote } from '@brokeaz-trader-2.0/finance';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('StockQuote')
export class StockQuoteOutput {
  @Field()
  public symbol: string;
  @Field()
  public open: number;
  @Field()
  public high: number;
  @Field()
  public low: number;
  @Field()
  public price: number;
  @Field()
  public volume: number;
  @Field()
  public latestTradingDay: string;
  @Field()
  public previousClose: number;
  @Field()
  public change: number;
  @Field()
  public changePercent: number;

  public static fromModel(model: StockQuote): StockQuoteOutput {
    if (!model) {
      return;
    }

    const output = new StockQuoteOutput();
    output.symbol = model.symbol;
    output.open = model.open;
    output.high = model.high;
    output.low = model.low;
    output.price = model.price;
    output.volume = model.volume;
    output.latestTradingDay = model.latestTradingDay;
    output.previousClose = model.previousClose;
    output.change = model.change;
    output.changePercent = model.changePercent;
    return output;
  }
}
