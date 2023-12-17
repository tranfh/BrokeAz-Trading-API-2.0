export class RedditGetResponseData {
  public subreddit: string;
  public title: string;
  public selftext: string;
  public created_utc: number;
}
export interface RedditGetResponse {
  kind: string;
  data: RedditGetResponseData;
}
