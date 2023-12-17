import { StockSearch } from '@brokeaz-trader-2.0/finance';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('SearchOutput')
export class SearchOutput {
  @Field()
  public symbol: string;
  @Field()
  public name: string;
  @Field()
  public type: string;
  @Field()
  public region: string;
  @Field()
  public marketOpen: string;
  @Field()
  public marketClose: string;
  @Field()
  public timezone: string;
  @Field()
  public currency: string;
  @Field()
  public matchScore: string;

  public static fromModel(model: StockSearch): SearchOutput {
    if (!model) {
      return;
    }

    const output = new SearchOutput();
    output.symbol = model.symbol;
    output.name = model.name;
    output.type = model.type;
    output.region = model.region;
    output.marketOpen = model.marketOpen;
    output.marketClose = model.marketClose;
    output.timezone = model.timezone;
    output.currency = model.currency;
    output.matchScore = model.matchScore;
    return output;
  }
}
