import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryModule } from '../category/category.module';
import { Favourite } from './entities/favourite.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../user/users.module';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Product, Favourite, User]),
    CategoryModule,
    UsersModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
