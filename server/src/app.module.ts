import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './datalake/user/entities/user.entity';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule } from './datalake/user/users.module';
import { AuthModule } from './datalake/auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import { ProductModule } from './datalake/product/product.module';
import { Product } from './datalake/product/entities/product.entity';
import { Category } from './datalake/category/entities/category.entity';
import { CategoryModule } from './datalake/category/category.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'shop_db',
      entities: [User, Product, Category],
      synchronize: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: () => ({
    //     type: 'postgres',
    //     entities: [User],
    //     synchronize: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    WinstonModule.forRoot({
      levels: {
        critical_error: 0,
        error: 1,
        special_warning: 2,
        another_log_level: 3,
        info: 4,
      },
      transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
