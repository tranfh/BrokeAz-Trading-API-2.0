import { OutputSize } from './output-size';

export interface IntradayGetRequest {
  symbol: string;
  interval: string;
  adjusted?: boolean;
  extendedHours?: boolean;

  // YYYY-MM format string
  month?: string;

  // Full returns the trailing 30days intraday time series. The "compact" option is recommended if you would like to reduce the data size of each API call.
  // Compact returns only the latest 100 data points in the intraday time series;
  outputSize?: OutputSize;
}
