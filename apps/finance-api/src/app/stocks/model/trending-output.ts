import { Trending } from '@brokeaz-trader-2.0/finance';
import { Field, ObjectType } from '@nestjs/graphql';
import { StockPerformanceOutput } from './stock-performance.output';

@ObjectType('TrendingOutput')
export class TrendingOutput {
  @Field(() => [StockPerformanceOutput])
  public topGainers: StockPerformanceOutput[];
  @Field(() => [StockPerformanceOutput])
  public topLosers: StockPerformanceOutput[];
  @Field(() => [StockPerformanceOutput])
  public mostActivelyTraded: StockPerformanceOutput[];

  public static fromModel(model: Trending): TrendingOutput {
    if (!model) {
      return null;
    }

    const output = new TrendingOutput();
    output.topGainers = model.topGainers.map(StockPerformanceOutput.fromModel);
    output.topLosers = model.topLosers.map(StockPerformanceOutput.fromModel);
    output.mostActivelyTraded = model.mostActivelyTraded.map(
      StockPerformanceOutput.fromModel
    );
    return output;
  }
}
