import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { UsersModule } from '../user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from '../product/product.module';
import { Product } from '../product/entities/product.entity';
import { Cart } from '../cart/entities/cart.entity';
import { User } from '../user/entities/user.entity';
import { CartItem } from '../cart/entities/cart-item.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Order, Cart, Product, User, CartItem]),
    UsersModule,
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
