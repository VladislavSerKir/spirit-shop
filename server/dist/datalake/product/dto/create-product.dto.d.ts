import { Category } from 'src/datalake/category/entities/category.entity';
export declare class CreateProductDto {
    name: string;
    description: string;
    image: string;
    price: string;
    categories: Array<Category>;
}
