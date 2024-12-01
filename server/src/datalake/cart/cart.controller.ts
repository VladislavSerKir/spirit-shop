import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import {
  IHeadersAuthorizationRequest,
  ISuccessResponse,
} from 'src/common/types/interfaces';
import { CartItem } from './entities/cart-item.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/')
  getProfileInfo(): Promise<Cart[]> {
    return this.cartService.getAllProducts();
  }

  @UseGuards(AccessTokenGuard)
  @Get('/cart')
  getUserCart(@Request() request: IHeadersAuthorizationRequest): Promise<Cart> {
    const accessToken = request.headers.authorization;
    return this.cartService.getUserCart(accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/add')
  addToCart(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() addToCartDto: AddToCartDto,
  ): Promise<Partial<CartItem[]>> {
    const accessToken = request.headers.authorization;
    return this.cartService.addToCart(accessToken, addToCartDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/remove')
  removeFromCart(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() addToCartDto: AddToCartDto,
  ): Promise<Partial<CartItem[]>> {
    const accessToken = request.headers.authorization;
    return this.cartService.removeFromCart(accessToken, addToCartDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/clear')
  clearCart(
    @Request() request: IHeadersAuthorizationRequest,
  ): Promise<ISuccessResponse> {
    const accessToken = request.headers.authorization;
    return this.cartService.clearCart(accessToken);
  }
}
