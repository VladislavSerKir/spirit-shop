import { User } from 'src/datalake/user/entities/user.entity';
import { CartItem } from './cart-item.entity';
export declare class Cart {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    cartItem: CartItem[];
    user: User;
}
