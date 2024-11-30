import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MethodNotAllowedExceptionFilter } from './common/filters/methodNotAllowedFilter';
import configuration from './config/configuration';
import { Logger } from 'nestjs-pino';
import passport from 'passport';
import { YandexAuthStrategy } from './config/yandex.strategy';

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

// passport.use(
//   new YandexAuthStrategy(
//     {
//       clientID: process.env.YANDEX_CLIENT_ID,
//       clientSecret: process.env.YANDEX_CLIENT_SECRET,
//       callbackURL: process.env.YANDEX_REDIRECT_URI,
//     },
//     function (accessToken, refreshToken, profile, done) {
//       User.findOrCreate({ yandexId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//     },
//   ),
// );

// passport.use('yandex', new YandexAuthStrategy());
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));

bootstrap();
