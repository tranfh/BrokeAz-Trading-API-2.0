import { IntradayInput, OutputSize } from '@brokeaz-trader-2.0/finance';
import { Field, InputType } from '@nestjs/graphql';

@InputType('IntradayStockInput')
export class IntradayStockInput {
  @Field()
  public symbol: string;

  @Field({ nullable: true })
  public month?: string;

  @Field({ nullable: true })
  public adjusted?: boolean;

  @Field({ nullable: true })
  public extendedHours?: boolean;

  @Field(() => String, { nullable: true })
  public outputSize?: OutputSize;

  public static toModel(
    input: IntradayStockInput,
    interval: string
  ): IntradayInput {
    const request = new IntradayInput();
    request.interval = interval;
    request.symbol = input.symbol;
    request.month = input.month;
    request.adjusted = input.adjusted;
    request.extendedHours = input.extendedHours;
    request.outputSize = input.outputSize;
    return request;
  }
}
