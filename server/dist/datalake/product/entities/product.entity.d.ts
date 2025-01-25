import { Category } from '../../category/entities/category.entity';
import { CartItem } from 'src/datalake/cart/entities/cart-item.entity';
import { Favourite } from './favourite.entity';
import { Review } from 'src/datalake/review/entities/review.entity';
export declare class Product {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    image: string;
    name: string;
    price: number;
    categories: Category[];
    cartItems: CartItem[];
    favourites: Favourite;
    reviews: Review[];
}
