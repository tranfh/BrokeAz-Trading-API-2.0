import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PinoLogger } from './pino.logger';
import { pino } from 'pino';

@Module({
  providers: [
    {
      provide: 'root-logger',
      useFactory: (configService: ConfigService) => {
        return pino({
          transport: configService.get('logger.transport'),
          level: configService.get<string>('logger.level'),
        });
      },
      inject: [ConfigService],
      useExisting: [ConfigService],
    },
    PinoLogger,
  ],
  exports: [PinoLogger],
})
export class LoggerModule {}
