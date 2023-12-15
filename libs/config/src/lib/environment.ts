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
  }
};
