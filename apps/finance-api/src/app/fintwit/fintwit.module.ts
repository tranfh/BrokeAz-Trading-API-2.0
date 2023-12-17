import { Module } from '@nestjs/common';
import { FinTwitResolver } from './fintwit.resolver';

@Module({
  imports: [],
  providers: [FinTwitResolver]
})
export class FinTwitModule {}
