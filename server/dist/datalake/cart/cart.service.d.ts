import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from '../product/entities/product.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { CartItem } from './entities/cart-item.entity';
import { ConfigService } from '@nestjs/config';
import { SuccessResponse } from 'src/common/types/interfaces';
export declare class CartService {
    private configService;
    private cartRepo;
    private userRepo;
    private productRepo;
    private cartItemRepo;
    private jwtService;
    constructor(configService: ConfigService, cartRepo: Repository<Cart>, userRepo: Repository<User>, productRepo: Repository<Product>, cartItemRepo: Repository<CartItem>, jwtService: JwtService);
    getAllProducts(): Promise<Cart[]>;
    getUserCart(accessToken: string): Promise<Cart>;
    addToCart(accessToken: string, product: Partial<Product>): Promise<Partial<CartItem[]>>;
    removeFromCart(accessToken: string, product: Partial<Product>): Promise<Partial<CartItem[]>>;
    clearCart(accessToken: any): Promise<SuccessResponse>;
}
