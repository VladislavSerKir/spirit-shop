import { Cart } from 'src/datalake/cart/entities/cart.entity';
import { Order } from 'src/datalake/order/entities/order.entity';
import { Favourite } from 'src/datalake/product/entities/favourite.entity';
import { Review } from 'src/datalake/review/entities/review.entity';
export declare class User {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    about: string;
    avatar: string;
    email: string;
    password: string;
    mobileNumber: string;
    refreshToken: string;
    accessToken?: string;
    role: string;
    cart: Cart;
    favourite: Favourite;
    purchase: Order[];
    reviews: Review[];
    likedReviews: Review[];
    resetCode?: string;
    active: boolean;
    hideProfile: boolean;
}
