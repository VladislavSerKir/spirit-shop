import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MethodNotAllowedExceptionFilter } from './common/filters/methodNotAllowedFilter';
import configuration from './config/configuration';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn'],
  });

  const config = new DocumentBuilder()
    .setTitle('API документация')
    .setDescription('Описание API')
    .setVersion('1.0')
    .addTag('auth') // Добавьте свои теги
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

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
