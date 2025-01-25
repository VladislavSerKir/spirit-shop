import { Product } from '../../product/entities/product.entity';
export declare class Category {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    products: Product[];
}
