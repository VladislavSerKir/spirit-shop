import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { UsersModule } from '../user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from '../product/product.module';
import { Product } from '../product/entities/product.entity';
import { CartItem } from './entities/cart-item.entity';
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
    TypeOrmModule.forFeature([Cart, Product, CartItem]),
    UsersModule,
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
