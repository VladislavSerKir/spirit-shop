import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from '../category/entities/category.entity';
import { DeleteProductDto } from './dto/delete-product.dto';
import { RemoveProduct } from 'src/common/types/interfaces';
import { EditProductDto } from './dto/edit-product.dto';
import { Favourite } from './entities/favourite.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UsersService } from '../user/users.service';
import { ConfigService } from '@nestjs/config';
import { LikeDislikeProductDto } from './dto/like-dislike-product.dto';
export declare class ProductService {
    private configService;
    private readonly usersService;
    private productRepo;
    private categoryRepo;
    private favouriteRepo;
    private userRepo;
    private jwtService;
    constructor(configService: ConfigService, usersService: UsersService, productRepo: Repository<Product>, categoryRepo: Repository<Category>, favouriteRepo: Repository<Favourite>, userRepo: Repository<User>, jwtService: JwtService);
    getAllProducts(): Promise<Product[]>;
    createProduct(createProductDto: CreateProductDto, accessToken: string): Promise<Partial<Product>>;
    editProduct(editProductDto: EditProductDto, accessToken: string): Promise<Partial<Product>>;
    deleteProduct(deleteProductDto: DeleteProductDto, accessToken: string): Promise<RemoveProduct>;
    likeProduct(accessToken: string, likeDislikeProductDto: LikeDislikeProductDto): Promise<Product>;
    dislikeProduct(accessToken: string, likeDislikeProductDto: LikeDislikeProductDto): Promise<number>;
}
