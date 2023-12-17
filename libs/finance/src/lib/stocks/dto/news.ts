import { NewsGetResponse } from './news-get-response';

export class NewsItem {
  public title: string;
  public url: string;
  public summary: string;
  public timePublished: string;
  public author: string;
  public source: string;
  public bannerImage: string;
}

export class News {
  public newsItems: NewsItem[];

  public static toModel(response: NewsGetResponse): News {
    if (!response) {
      return;
    }

    const news = new News();
    news.newsItems = response.feed
      ? response.feed.map((result) => {
          console.log('result \n\n', result);
          const newsItem = new NewsItem();
          newsItem.title = result.title;
          newsItem.url = result.url;
          newsItem.summary = result.summary;
          newsItem.timePublished = result.timePublished;
          newsItem.author = result.author;
          newsItem.source = result.source;
          newsItem.bannerImage = result.bannerImage;
          return newsItem;
        })
      : [];
    return news;
  }
}
