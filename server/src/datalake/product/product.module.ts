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

@Module({
  imports: [
    JwtModule.register({
      secret: 'access-secret',
      signOptions: { expiresIn: 60 },
    }),
    TypeOrmModule.forFeature([Product, Favourite, User]),
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, UsersService],
})
export class ProductModule {}
