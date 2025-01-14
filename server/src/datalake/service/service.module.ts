import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { Order } from '../order/entities/order.entity';
import { Review } from '../review/entities/review.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { Product } from '../product/entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';
import { UsersModule } from '../user/users.module';
import { UsersService } from '../user/users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'access-secret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([
      User,
      Order,
      Review,
      CartItem,
      Product,
      Category,
    ]),
    UsersModule,
  ],
  controllers: [ServiceController],
  providers: [ServiceService, UsersService],
  exports: [TypeOrmModule],
})
export class ServiceModule {}
