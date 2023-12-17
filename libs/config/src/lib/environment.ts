export const config = {
  env: 'dev',

  // Logger
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        errorProps: 'err,error',
        messageKey: 'msg',
        ignore: 'hostname'
      }
    },
    level: process.env.NX_LOGGER_LEVEL ?? 'debug'
  },
  alphavantage: {
    apiKey: process.env.ALPHAVANTAGE_API_KEY ?? 'demo',
    baseUrl: 'https://www.alphavantage.co/query?'
  },
  reddit: {
    subreddits: [
      'wallstreetbets',
      'stocks',
      'pennystocks',
      'investing',
      'stockmarket',
      'options',
      'robinhood',
      'weedstocks',
      'trading',
      'robinhoodpennystocks'
    ],
    baseUrl: 'https://www.reddit.com/r/',
    userAgent: process.env.REDDIT_USER_AGENT ?? 'demo',
    clientId: process.env.REDDIT_CLIENT_ID ?? 'demo',
    clientSecret: process.env.REDDIT_APP_SECRET ?? 'demo',
    username: process.env.REDDIT_USERNAME ?? 'demo',
    password: process.env.REDDIT_PASSWORD ?? 'demo'
  }
};
