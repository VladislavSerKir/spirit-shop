import { Product } from 'src/datalake/product/entities/product.entity';
import { User } from 'src/datalake/user/entities/user.entity';
export declare class Review {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    rate: number;
    comment: string;
    user: User;
    product: Product;
    helpful: User[];
}
