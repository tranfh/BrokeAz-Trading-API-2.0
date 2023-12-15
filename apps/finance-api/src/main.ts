/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  console.log('Starting server...');
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get<number>('server.port', 5000);

  await app.listen(port, () => {
    Logger.log(`🚀 Started server on port ${port}`);
  });
}

bootstrap();
