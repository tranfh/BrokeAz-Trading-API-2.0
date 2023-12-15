import { OutputSize } from '@brokeaz-trader-2.0/finance';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(OutputSize, {
  name: 'OutputSize'
});
