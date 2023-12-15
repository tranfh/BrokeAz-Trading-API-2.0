import { Global, Module } from '@nestjs/common';
import { AlphavantageClient } from './alphavantage-client';
import { StocksService } from './stocks';

@Global()
@Module({
  providers: [AlphavantageClient, StocksService],
  exports: [StocksService]
})
export class FinanceModule {}
