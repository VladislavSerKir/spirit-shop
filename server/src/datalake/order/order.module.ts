import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { UsersModule } from '../user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'access-secret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Order]),
    CartModule,
    UsersModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [TypeOrmModule],
})
export class OrderModule {}
