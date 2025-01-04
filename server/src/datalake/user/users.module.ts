import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Order } from '../order/entities/order.entity';
import { Review } from '../review/entities/review.entity';
import { CartItem } from '../cart/entities/cart-item.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'access-secret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User, Order, Review, CartItem]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
