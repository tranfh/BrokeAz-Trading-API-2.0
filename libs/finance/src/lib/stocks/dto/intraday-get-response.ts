interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Interval': string;
  '5. Output Size': string;
  '6. Time Zone': string;
}

interface TimeSeriesData {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

interface TimeSeries {
  [key: string]: TimeSeriesData;
}

export interface IntradayGetResponse {
  'Meta Data': MetaData;
  'Time Series (1min)': TimeSeries | null;
  'Time Series (5min)': TimeSeries | null;
  'Time Series (15min)': TimeSeries | null;
  'Time Series (30min)': TimeSeries | null;
  'Time Series (60min)': TimeSeries | null;
}
