import { StockPerformance } from '@brokeaz-trader-2.0/finance';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('StockPerformance')
export class StockPerformanceOutput {
  @Field()
  public ticker: string;
  @Field()
  public price: number;
  @Field()
  public changeAmount: number;
  @Field()
  public changePercentage: number;
  @Field()
  public volume: number;

  public static fromModel(model: StockPerformance): StockPerformanceOutput {
    if (!model) {
      return null;
    }

    const output = new StockPerformanceOutput();
    output.ticker = model.ticker;
    output.price = model.price;
    output.changeAmount = model.changeAmount;
    output.changePercentage = model.changePercentage;
    output.volume = model.volume;
    return output;
  }
}
