import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { IHeadersAuthorizationRequest, SuccessResponse } from 'src/common/types/interfaces';
import { CartItem } from './entities/cart-item.entity';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getProfileInfo(): Promise<Cart[]>;
    getUserCart(request: IHeadersAuthorizationRequest): Promise<Cart>;
    addToCart(request: IHeadersAuthorizationRequest, addToCartDto: AddToCartDto): Promise<Partial<CartItem[]>>;
    removeFromCart(request: IHeadersAuthorizationRequest, addToCartDto: AddToCartDto): Promise<Partial<CartItem[]>>;
    clearCart(request: IHeadersAuthorizationRequest): Promise<SuccessResponse>;
}
