import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Order } from './entities/order.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { ConfigService } from '@nestjs/config';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    private jwtService: JwtService,
  ) {}

  async getUserOrders(accessToken: string): Promise<Order[]> {
    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });

    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      select: { id: true },
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const userOrders = await this.orderRepo.find({
      where: { user: user as User },
      relations: ['purchase', 'purchase.product'],
      select: {
        id: true,
        createdAt: true,
        number: true,
        isNeedDelivery: true,
        isNeedPackage: true,
        comment: true,
        purchase: {
          quantity: true,
          product: {
            name: true,
            createdAt: true,
            image: true,
            price: true,
          },
        },
      },
    });

    return userOrders;
  }

  async purchaseOrder(
    accessToken: string,
    createOrderDto: CreateOrderDto,
  ): Promise<Partial<Order>> {
    const { comment, isNeedDelivery, isNeedPackage } = createOrderDto;

    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      relations: ['cart', 'cart.cartItem', 'cart.cartItem.product'],
      select: {
        id: true,
        cart: {
          id: true,
          cartItem: {
            id: true,
            product: {
              id: true,
            },
          },
        },
      },
    });

    if (!user.cart.cartItem.length) {
      throw new Error('Cart is empty');
    }

    const cartItemIds = user.cart.cartItem.map((item: CartItem) => item.id);
    const userCartItems = await this.cartItemRepo.find({
      where: {
        id: In(cartItemIds),
      },
      relations: ['product'],
      select: {
        id: true,
        quantity: true,
        product: {
          id: true,
          image: true,
          price: true,
          name: true,
        },
      },
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
        select: {
          id: true,
          cartItem: {
            id: true,
            quantity: true,
            product: { id: true, image: true, price: true, name: true },
          },
        },
      });

      updatedCart.cartItem = [];
      await this.cartRepo.save(updatedCart);

      if (!updatedCart) {
        throw new BadRequestException('Error set bucket to null');
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
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
