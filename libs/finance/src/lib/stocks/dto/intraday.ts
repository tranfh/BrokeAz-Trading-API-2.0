import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { IntradayGetResponse } from './intraday-get-response';
import { TimeSeries } from './time-series';

export class Intraday {
  @IsDefined()
  public symbol: string;

  @IsDefined()
  public interval: string;

  @ValidateNested()
  @Type(() => TimeSeries)
  public timeSeries: TimeSeries[];

  public static toModel(response: IntradayGetResponse): Intraday {
    if (!response) {
      return;
    }

    const model = new Intraday();
    const metadata = response['Meta Data'];

    if (!metadata) {
      return null;
    }

    model.symbol = metadata['2. Symbol'];
    model.interval = metadata['4. Interval'];
    const timeSeries = this.createTimeSeries(response, model.interval);

    model.timeSeries = timeSeries;
    return model;
  }

  private static createTimeSeries(
    response: IntradayGetResponse,
    interval: string
  ): TimeSeries[] {
    const timeSeriesArray = [];

    for (const timestamp in response[`Time Series (${interval})`]) {
      const newTimeSeries = new TimeSeries();
      newTimeSeries.timestamp = timestamp;
      newTimeSeries.open =
        response[`Time Series (${interval})`][timestamp]['1. open'];
      newTimeSeries.high =
        response[`Time Series (${interval})`][timestamp]['2. high'];
      newTimeSeries.low =
        response[`Time Series (${interval})`][timestamp]['3. low'];
      newTimeSeries.close =
        response[`Time Series (${interval})`][timestamp]['4. close'];
      newTimeSeries.volume =
        response[`Time Series (${interval})`][timestamp]['5. volume'];

      timeSeriesArray.unshift(newTimeSeries);
    }

    return timeSeriesArray;
  }
}
