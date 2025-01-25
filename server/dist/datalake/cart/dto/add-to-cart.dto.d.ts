import { Category } from 'src/datalake/category/entities/category.entity';
export declare class AddToCartDto {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    categories: Array<Category>;
}
