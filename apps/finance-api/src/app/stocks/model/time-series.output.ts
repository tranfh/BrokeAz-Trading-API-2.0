import { TimeSeries } from '@brokeaz-trader-2.0/finance';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('TimeSeries')
export class TimeSeriesOutput {
  @Field()
  public timestamp: string;

  @Field()
  public open: string;

  @Field()
  public high: string;

  @Field()
  public low: string;

  @Field()
  public close: string;

  @Field()
  public volume: string;

  public static fromModel(timeSeries: TimeSeries): TimeSeriesOutput {
    if (!timeSeries) {
      return null;
    }

    const output = new TimeSeriesOutput();
    output.timestamp = timeSeries.timestamp;
    output.open = timeSeries.open;
    output.high = timeSeries.high;
    output.low = timeSeries.low;
    output.close = timeSeries.close;
    output.volume = timeSeries.volume;
    return output;
  }
}
