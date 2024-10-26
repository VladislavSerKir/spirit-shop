import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AccessTokenGuard)
  @Post('/purchase')
  purchaseOrder(
    @Request() request: any,
    @Body() body: CreateOrderDto,
  ): Promise<Partial<Order>> {
    const accessToken = request.headers.authorization;
    return this.orderService.purchaseOrder(accessToken, body);
  }
}
