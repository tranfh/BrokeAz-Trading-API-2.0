import { OutputSize } from './output-size';

export class IntradayInput {
  public interval: string;
  public symbol: string;
  public month?: string;
  public adjusted?: boolean;
  public extendedHours?: boolean;
  public outputSize?: OutputSize;
}
