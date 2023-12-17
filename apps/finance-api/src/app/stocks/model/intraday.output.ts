import { Intraday } from '@brokeaz-trader-2.0/finance';
import { Field, ObjectType } from '@nestjs/graphql';
import { IntradayInterval } from './intraday-interval';
import { TimeSeriesOutput } from './time-series.output';

@ObjectType('Intraday')
export class IntradayOutput {
  @Field()
  public symbol: string;

  @Field()
  public interval: string;

  @Field(() => [TimeSeriesOutput])
  public timeSeries: TimeSeriesOutput[];

  public static fromModel(
    symbol: string,
    interval: IntradayInterval,
    model: Intraday
  ): IntradayOutput {
    const output = new IntradayOutput();
    if (!model) {
      output.symbol = symbol;
      output.interval = interval;
      output.timeSeries = [];
      return output;
    }

    output.symbol = model.symbol;
    output.interval = model.interval;
    output.timeSeries = model.timeSeries.map(TimeSeriesOutput.fromModel);
    return output;
  }
}
