import { Module } from '@nestjs/common';
import { StockResolver } from './stock.resolver';

@Module({
  imports: [],
  providers: [StockResolver]
})
export class StockModule {}
