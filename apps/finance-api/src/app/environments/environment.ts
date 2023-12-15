import { localConfig } from '@brokeaz-trader-2.0/config';

export const environment = {
  ...localConfig,
  name: 'finance-api',
  server: {
    port: 5006
  }
};

export default () => environment;
