import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MethodNotAllowedExceptionFilter } from './common/filters/methodNotAllowedFilter';
import configuration from './config/configuration';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn'],
  });
  app.useLogger(app.get(Logger));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new MethodNotAllowedExceptionFilter());
  app.enableCors({ origin: '*' });

  await app.listen(configuration().server.port);

  console.info(`running on: ${await app.getUrl()}`);
}

bootstrap();
