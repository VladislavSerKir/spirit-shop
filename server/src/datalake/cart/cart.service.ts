import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from '../product/entities/product.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private jwtService: JwtService,
  ) {}

  async getAllProducts(): Promise<Cart[]> {
    const products = await this.cartRepo.find({
      relations: { cartItem: true },
    });

    if (!products) {
      throw new NotFoundException('Ошибка загрузки продуктов');
    } else {
      return products;
    }
  }

  async addToCart(accessToken, product: Partial<Product>): Promise<any> {
    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      relations: ['cart'],
    });

    if (!user) {
      throw new BadRequestException('Пользователя не существует');
    }

    const existingProduct = await this.productRepo.findOne({
      where: {
        id: product.id,
      },
    });
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const cart = await this.cartRepo.findOne({
      where: { id: user.cart.id },
      relations: ['user', 'cartItem', 'cartItem.product'],
    });
    if (!cart) {
      throw new Error('Cart not found');
    }

    let cartItem = cart.cartItem.find(
      (item) => item.product.id === existingProduct.id,
    );
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cartItem = new CartItem();
      cartItem.product = existingProduct;
      cartItem.quantity = 1;
      cart.cartItem.push(cartItem);
    }
    await this.cartRepo.save(cart);
    return cart.cartItem;
  }

  async removeFromCart(accessToken, product: Partial<Product>): Promise<any> {
    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      relations: ['cart'],
    });

    if (!user) {
      throw new BadRequestException('Пользователя не существует');
    }

    const existingProduct = await this.productRepo.findOne({
      where: {
        id: product.id,
      },
    });
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const cart = await this.cartRepo.findOne({
      where: { id: user.cart.id },
      relations: ['user', 'cartItem', 'cartItem.product'],
    });
    if (!cart) {
      throw new Error('Cart not found');
    }

    let cartItem = cart.cartItem.find(
      (item) => item.product.id === existingProduct.id,
    );
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      cart.cartItem = cart.cartItem.filter((item) => item.id !== cartItem.id);
    }
    await this.cartRepo.save(cart);
    return cart.cartItem;
  }
}
