import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { UsersService } from '../user/users.service';
import { UsersModule } from '../user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.key'),
        signOptions: { expiresIn: configService.get<string>('jwt.ttl') },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Category]),
    UsersModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService, UsersService],
  exports: [TypeOrmModule],
})
export class CategoryModule {}
