import { Global, Module } from '@nestjs/common';
import { AlphavantageClient } from './alphavantage-client';
import { ScraperService } from './scraper';
import { StocksService } from './stocks';

@Global()
@Module({
  providers: [AlphavantageClient, StocksService, ScraperService],
  exports: [StocksService, ScraperService]
})
export class FinanceModule {}
