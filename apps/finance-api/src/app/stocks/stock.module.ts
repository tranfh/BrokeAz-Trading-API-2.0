import { Module } from '@nestjs/common';
import { StockResolver } from './stock.resolver';

@Module({
  providers: [StockResolver]
})
export class StockModule {}
