import { NewsItem } from '@brokeaz-trader-2.0/finance';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('NewsOutput')
export class NewsOutput {
  @Field()
  public title: string;
  @Field()
  public url: string;
  @Field()
  public summary: string;

  @Field({ nullable: true })
  public timePublished?: string;

  @Field({ nullable: true })
  public author?: string;

  @Field({ nullable: true })
  public source?: string;

  @Field({ nullable: true })
  public bannerImage?: string;

  public static fromModel(model: NewsItem): NewsOutput {
    if (!model) {
      return;
    }

    const output = new NewsOutput();
    output.title = model.title;
    output.url = model.url;
    output.summary = model.summary;
    output.timePublished = model.timePublished;
    output.author = model.author;
    output.source = model.source;
    output.bannerImage = model.bannerImage;
    return output;
  }
}
