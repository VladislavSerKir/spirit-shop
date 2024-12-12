import {
  Controller,
  Get,
  Body,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { IHeadersAuthorizationRequest } from 'src/common/types/interfaces';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/')
  @ApiOperation({ summary: 'Получение всех заказов пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Возврат всех заказов пользователя',
    type: Order,
  })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  getUserOrders(
    @Request() request: IHeadersAuthorizationRequest,
  ): Promise<Order[]> {
    const accessToken = request.headers.authorization;
    return this.orderService.getUserOrders(accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/purchase')
  @ApiOperation({ summary: 'Покупка на основании корзины' })
  @ApiResponse({
    status: 201,
    description: 'Возврат покупки',
    type: Order,
  })
  @ApiBody({
    type: CreateOrderDto,
  })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  purchaseOrder(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Partial<Order>> {
    const accessToken = request.headers.authorization;
    return this.orderService.purchaseOrder(accessToken, createOrderDto);
  }
}
