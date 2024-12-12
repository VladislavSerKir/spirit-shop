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
  SuccessResponse,
} from 'src/common/types/interfaces';
import { CartItem } from './entities/cart-item.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/')
  @ApiOperation({ summary: 'Получение всех корзин всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Возврат всех корзин',
    type: Cart,
  })
  @ApiNotFoundResponse()
  getProfileInfo(): Promise<Cart[]> {
    return this.cartService.getAllProducts();
  }

  @UseGuards(AccessTokenGuard)
  @Get('/cart')
  @ApiOperation({ summary: 'Получение корзины пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Возврат корзины пользователя',
    type: Cart,
  })
  @ApiNotFoundResponse()
  getUserCart(@Request() request: IHeadersAuthorizationRequest): Promise<Cart> {
    const accessToken = request.headers.authorization;
    return this.cartService.getUserCart(accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/add')
  @ApiOperation({ summary: 'Добавить продукт в корзину' })
  @ApiResponse({
    status: 200,
    description: 'Возврат обновленной корзины',
    type: CartItem,
  })
  @ApiBody({
    type: AddToCartDto,
  })
  @ApiBadRequestResponse()
  addToCart(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() addToCartDto: AddToCartDto,
  ): Promise<Partial<CartItem[]>> {
    const accessToken = request.headers.authorization;
    return this.cartService.addToCart(accessToken, addToCartDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/remove')
  @ApiOperation({ summary: 'Удалить продукт из корзины' })
  @ApiResponse({
    status: 200,
    description: 'Возврат наименований корзины',
    type: CartItem,
  })
  @ApiBody({
    type: AddToCartDto,
  })
  @ApiBadRequestResponse()
  removeFromCart(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() addToCartDto: AddToCartDto,
  ): Promise<Partial<CartItem[]>> {
    const accessToken = request.headers.authorization;
    return this.cartService.removeFromCart(accessToken, addToCartDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/clear')
  @ApiOperation({ summary: 'Очистить корзину' })
  @ApiResponse({
    status: 200,
    description: 'Возврат результата операции',
    type: SuccessResponse,
  })
  @ApiBadRequestResponse()
  clearCart(
    @Request() request: IHeadersAuthorizationRequest,
  ): Promise<SuccessResponse> {
    const accessToken = request.headers.authorization;
    return this.cartService.clearCart(accessToken);
  }
}
