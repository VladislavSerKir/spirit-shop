import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryModule } from '../category/category.module';
import { Favourite } from './entities/favourite.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../user/users.service';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'access-secret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Product, Favourite]),
    CategoryModule,
    UsersModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, UsersService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
