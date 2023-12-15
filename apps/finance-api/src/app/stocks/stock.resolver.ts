import { StocksService } from '@brokeaz-trader-2.0/finance';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { IntradayInput } from './model/intraday.input';
import { IntradayOutput } from './model/intraday.output';

@Resolver()
export class StockResolver {
  constructor(/* @Inject() */ private readonly stocksService: StocksService) {}

  @Query(() => IntradayOutput)
  public async intraday(
    @Args('input', { type: () => IntradayInput }) input: IntradayInput
  ): Promise<IntradayOutput> {
    const result = await this.stocksService.fetchIntraday(input);
    return IntradayOutput.fromModel(result);
  }
}
