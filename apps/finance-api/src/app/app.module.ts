import { FinanceModule } from '@brokeaz-trader-2.0/finance';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import environment from './environments/environment';
import { FinTwitModule } from './fintwit/fintwit.module';
import { StockModule } from './stocks/stock.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environment]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: {
        federation: 2
      },
      introspection: true,
      playground: true
    }),
    FinanceModule,
    StockModule,
    FinTwitModule
  ],
  providers: [FinanceModule]
})
export class AppModule {}
