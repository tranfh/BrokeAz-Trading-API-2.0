import { Injectable } from '@nestjs/common';
import { AlphaVFunctions } from '../alphav-functions';
import { AlphavantageClient } from '../alphavantage-client';
import {
  Intraday,
  IntradayGetRequest,
  IntradayGetResponse,
  IntradayInput
} from './dto';

@Injectable()
export class StocksService {
  constructor(/* @Inject() */ private alphavantageClient: AlphavantageClient) {}

  public async fetchIntraday(input: IntradayInput): Promise<Intraday> {
    const intradayResponse = await this.alphavantageClient.request<
      IntradayGetRequest,
      IntradayGetResponse
    >(AlphaVFunctions.TIME_SERIES_INTRADAY, input);

    return Intraday.toModel(intradayResponse);
  }
}
