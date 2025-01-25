import { User } from 'src/datalake/user/entities/user.entity';
import { Product } from './product.entity';
export declare class Favourite {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    products: Product[];
}
