/* eslint-disable @typescript-eslint/ban-types */
import {
  Inject,
  LogLevel,
  LoggerService,
  NotImplementedException
} from '@nestjs/common';
import { pino } from 'pino';

export class PinoLogger implements LoggerService {
  private readonly logger: pino.Logger;

  private readonly context = 'Root';

  constructor(@Inject('root-logger') rootLogger: pino.Logger) {
    this.logger = rootLogger.child({});
  }

  public log(message, ...optionalParams): void {
    this.pinoLog('info', message, optionalParams);
  }

  public error(message, ...optionalParams): void {
    this.pinoLog('error', message, optionalParams);
  }

  public warn(message, ...optionalParams): void {
    this.pinoLog('warn', message, optionalParams);
  }

  public debug(message, ...optionalParams): void {
    this.pinoLog('debug', message, optionalParams);
  }

  public verbose?(message, ...optionalParams): void {
    this.pinoLog('trace', message, optionalParams);
  }

  private pinoLog(level: string, message, optionalParams): void {
    const module = optionalParams[0] ?? this.context;

    if (typeof message === 'string') {
      this.logger[level]({
        msg: message,
        name: module,
        status: level
      });
    } else {
      this.logger[level]({
        ...message,
        name: module,
        status: level
      });
    }
  }

  setLogLevels?(levels: LogLevel[]): void {
    throw new NotImplementedException();
  }
}
