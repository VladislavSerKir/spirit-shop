import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Review } from './entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { UsersModule } from '../user/users.module';
import { ProductModule } from '../product/product.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'access-secret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Review]),
    ProductModule,
    UsersModule,
    OrderModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [TypeOrmModule],
})
export class ReviewModule {}
