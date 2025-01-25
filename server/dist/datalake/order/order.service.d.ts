import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Order } from './entities/order.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { ConfigService } from '@nestjs/config';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderService {
    private configService;
    private orderRepo;
    private cartRepo;
    private userRepo;
    private cartItemRepo;
    private jwtService;
    constructor(configService: ConfigService, orderRepo: Repository<Order>, cartRepo: Repository<Cart>, userRepo: Repository<User>, cartItemRepo: Repository<CartItem>, jwtService: JwtService);
    getUserOrders(accessToken: string): Promise<Order[]>;
    purchaseOrder(accessToken: string, createOrderDto: CreateOrderDto): Promise<Partial<Order>>;
}
