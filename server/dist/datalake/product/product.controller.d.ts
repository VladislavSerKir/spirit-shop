import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { IHeadersAuthorizationRequest, RemoveProduct } from 'src/common/types/interfaces';
import { EditProductDto } from './dto/edit-product.dto';
import { LikeDislikeProductDto } from './dto/like-dislike-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProfileInfo(): Promise<Product[]>;
    createProduct(request: IHeadersAuthorizationRequest, createProductDto: CreateProductDto): Promise<Partial<Product>>;
    editProduct(request: IHeadersAuthorizationRequest, editProductDto: EditProductDto): Promise<Partial<Product>>;
    deleteProduct(request: IHeadersAuthorizationRequest, deleteProductDto: DeleteProductDto): Promise<RemoveProduct>;
    likeProduct(request: IHeadersAuthorizationRequest, likeDislikeProductDto: LikeDislikeProductDto): Promise<Product>;
    dislikeProduct(request: IHeadersAuthorizationRequest, likeDislikeProductDto: LikeDislikeProductDto): Promise<number>;
}
