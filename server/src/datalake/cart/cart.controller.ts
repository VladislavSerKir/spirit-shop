import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/')
  getProfileInfo(): Promise<Cart[]> {
    return this.cartService.getAllProducts();
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/add')
  addToCart(
    @Request() request: any,
    @Body() body: AddToCartDto,
  ): Promise<Partial<Cart>> {
    const accessToken = request.headers.authorization;
    return this.cartService.addToCart(accessToken, body);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/remove')
  removeFromCart(
    @Request() request: any,
    @Body() body: AddToCartDto,
  ): Promise<Partial<Cart>> {
    const accessToken = request.headers.authorization;
    return this.cartService.removeFromCart(accessToken, body);
  }
}
