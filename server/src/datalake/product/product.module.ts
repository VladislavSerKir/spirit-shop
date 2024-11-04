import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryModule } from '../category/category.module';
import { Favourite } from './entities/favourite.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UsersService } from '../user/users.service';
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
    TypeOrmModule.forFeature([Product, Favourite, User]),
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, UsersService],
})
export class ProductModule {}
