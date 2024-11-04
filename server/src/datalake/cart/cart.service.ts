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
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CartService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    private jwtService: JwtService,
  ) {}

  async getAllProducts(): Promise<Cart[]> {
    const products = await this.cartRepo.find({
      relations: { cartItem: true },
    });

    if (!products) {
      throw new NotFoundException('Error fetching products');
    } else {
      return products;
    }
  }

  async getUserCart(accessToken: string): Promise<any> {
    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      relations: ['cart'],
    });

    const cart = await this.cartRepo.findOne({
      where: { id: user.cart.id },
      relations: [
        'cartItem',
        'cartItem.product',
        'cartItem.product.categories',
      ],
    });

    if (!cart) {
      throw new NotFoundException('Error fetching cart');
    } else {
      return cart;
    }
  }

  async addToCart(accessToken, product: Partial<Product>): Promise<any> {
    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      relations: ['cart'],
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const existingProduct = await this.productRepo.findOne({
      where: {
        id: product.id,
      },
      relations: ['categories'],
    });
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const cart = await this.cartRepo.findOne({
      where: { id: user.cart.id },
      relations: [
        'user',
        'cartItem',
        'cartItem.product',
        'cartItem.product.categories',
      ],
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
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      relations: ['cart'],
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
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
      relations: [
        'user',
        'cartItem',
        'cartItem.product',
        'cartItem.product.categories',
      ],
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

  async clearCart(accessToken): Promise<any> {
    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      relations: ['cart', 'cart.cartItem'],
    });

    if (!user) {
      throw new BadRequestException('Пользователя не существует');
    }

    if (!user.cart.cartItem.length) {
      throw new BadRequestException('В корзине ничего нет');
    }

    await this.cartItemRepo.delete({ cart: user.cart });

    return { success: true };
  }
}
