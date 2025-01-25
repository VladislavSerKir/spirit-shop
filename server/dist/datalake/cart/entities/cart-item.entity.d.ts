import { Cart } from './cart.entity';
import { Product } from 'src/datalake/product/entities/product.entity';
import { Order } from 'src/datalake/order/entities/order.entity';
export declare class CartItem {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    cart: Cart;
    purchase: Order;
    product: Product;
    quantity: number;
}
