import { User } from 'src/datalake/user/entities/user.entity';
import { CartItem } from 'src/datalake/cart/entities/cart-item.entity';
export declare class Order {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    number: number;
    generateRandomNumber(): void;
    user: User;
    isNeedPackage: boolean;
    isNeedDelivery: boolean;
    comment: string;
    purchase: CartItem[];
}
