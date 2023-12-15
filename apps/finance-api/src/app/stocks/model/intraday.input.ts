import { IntradayGetRequest, OutputSize } from '@brokeaz-trader-2.0/finance';
import { Field, InputType } from '@nestjs/graphql';

@InputType('IntradayInput')
export class IntradayInput {
  @Field()
  public interval: string;

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

  public static toModel(input: IntradayInput): IntradayGetRequest {
    const request = new IntradayInput();
    request.interval = input.interval;
    request.symbol = input.symbol;
    request.month = input.month;
    request.adjusted = input.adjusted;
    request.extendedHours = input.extendedHours;
    request.outputSize = input.outputSize;
    return request;
  }
}
