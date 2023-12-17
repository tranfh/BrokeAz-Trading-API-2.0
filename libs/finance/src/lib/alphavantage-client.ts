import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { AlphaVFunctions } from './alphav-functions';

@Injectable()
export class AlphavantageClient {
  private readonly logger = new Logger(AlphavantageClient.name);
  private readonly httpClient: AxiosInstance;
  private readonly apiKey: string;

  constructor(/* @Inject() */ private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('alphavantage.apiKey') || '';
    this.httpClient = axios.create({
      baseURL: this.configService.get<string>('alphavantage.baseUrl'),
      headers: { 'Content-Type': 'application/json' }
    });

    axiosRetry(this.httpClient, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: axiosRetry.isRetryableError
    });
  }

  public async request<T, R>(fn: AlphaVFunctions, data?: T): Promise<R> {
    try {
      this.logger.debug({
        msg: `Requesting Alpha Vantage ${fn}`,
        data
      });

      const params = new URLSearchParams(
        data as Record<string, string>
      ).toString();

      console.log(params);
      const response = await this.httpClient.get(
        `&function=${fn}&${params}&apikey=${this.apiKey}`
      );

      this.logger.verbose({
        msg: 'Alpha Vantage Response',
        data,
        status: response.status,
        statusText: response.statusText
      });

      if (response.data.Information) {
        this.logger.warn({
          msg: `Alpha Vantage Error: ${response.data.Information}`
        });
        this.logger.error({
          msg: `Alpha Vantage API Error: Rate Limit Exceeded`
        });
      }
      return response.data;
    } catch (err) {
      this.logger.error({ msg: `Error logging request: ${err}` });
      throw new Error('API Error: Could not complete Alpha Vantage request');
    }
  }
}
