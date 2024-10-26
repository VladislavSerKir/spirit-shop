import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Order } from './entities/order.entity';
import { CartItem } from '../cart/entities/cart-item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    private jwtService: JwtService,
  ) {}

  async purchaseOrder(
    accessToken,
    order: Partial<Order>,
  ): Promise<Partial<Order>> {
    const { comment, isNeedDelivery, isNeedPackage } = order;

    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      relations: [
        'cart',
        'cart.cartItem',
        'cart.cartItem.product',
        'cart.cartItem.product.categories',
      ],
    });

    if (!user.cart.cartItem.length) {
      throw new Error('Cart is empty');
    }

    const cartItemIds = user.cart.cartItem.map(
      (item: any) => item.id as number,
    );
    const userCartItems = await this.cartItemRepo.find({
      where: {
        id: In(cartItemIds),
      },
      relations: ['product', 'product.categories'],
    });

    const newOrder = this.orderRepo.create({
      user: user as User,
      comment,
      isNeedDelivery,
      isNeedPackage,
      purchase: userCartItems.map((item) => {
        return item as CartItem;
      }),
    });

    try {
      const savedOrder = await this.orderRepo.save(newOrder);
      const {
        id,
        number,
        isNeedPackage,
        isNeedDelivery,
        comment,
        purchase,
        createdAt,
      } = savedOrder;

      const updatedCart = await this.cartRepo.findOne({
        where: { id: user.cart.id },
        relations: ['cartItem'],
      });
      updatedCart.cartItem = [];
      await this.cartRepo.save(updatedCart);

      if (!updatedCart) {
        throw new BadRequestException('Ошибка обнуления корзины');
      }

      return {
        id,
        number,
        isNeedPackage,
        isNeedDelivery,
        comment,
        purchase,
        createdAt,
      };
    } catch (e) {
      throw new InternalServerErrorException('Внутренняя ошибка сервера');
    }
  }
}
