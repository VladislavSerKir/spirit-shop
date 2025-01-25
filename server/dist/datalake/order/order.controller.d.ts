import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { IHeadersAuthorizationRequest } from 'src/common/types/interfaces';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getUserOrders(request: IHeadersAuthorizationRequest): Promise<Order[]>;
    purchaseOrder(request: IHeadersAuthorizationRequest, createOrderDto: CreateOrderDto): Promise<Partial<Order>>;
}
