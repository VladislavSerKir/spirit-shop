import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from '../category/entities/category.entity';
import { DeleteProductDto } from './dto/delete-product.dto';
import { IRemoveProduct } from 'src/common/types/interfaces';
import { EditProductDto } from './dto/edit-product.dto';
import { Favourite } from './entities/favourite.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Favourite) private favouriteRepo: Repository<Favourite>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepo.find({
      relations: ['categories', 'favourites.user'],
    });

    if (!products) {
      throw new NotFoundException('Error fetching products');
    } else {
      return products;
    }
  }

  async createProduct(body: CreateProductDto): Promise<Partial<Product>> {
    const { name, description, image, price, categories } = body;
    const categoryIds = categories.map(
      // (category: number) => ({category.id} as Category),

      (category: any) => category as Category,
    );

    const newProduct = await this.productRepo.create({
      name,
      description,
      image,
      price: +price,
      categories: categoryIds,
    });

    try {
      const savedProduct = await this.productRepo.save(newProduct);
      return savedProduct;
    } catch {
      throw new BadRequestException(`Request did not work`);
    }
  }

  async editProduct(body: EditProductDto): Promise<Partial<Product>> {
    const { name, description, image, price, categories, id } = body;

    const existingProduct = await this.productRepo.findOne({ where: { id } });
    if (!existingProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const categoryIds = categories.map(
      (category: any) => category.id as number,
    );
    const updatedCategories = await this.categoryRepo.find({
      where: {
        id: In(categoryIds),
      },
    });

    existingProduct.name = name;
    existingProduct.description = description;
    existingProduct.image = image;
    existingProduct.price = +price;
    existingProduct.categories = updatedCategories;

    try {
      await this.productRepo.save(existingProduct);
      return { ...existingProduct }; // Возвращаем обновленный продукт
    } catch (error) {
      throw new BadRequestException('Error product updating');
    }
  }

  async deleteProduct(body: DeleteProductDto): Promise<IRemoveProduct> {
    const { id } = body;

    try {
      await this.productRepo.delete(String(id));
      return { id };
    } catch (e) {
      throw new NotFoundException(`Server error: ${e}`);
    }
  }

  async likeProduct(
    accessToken: string,
    body: DeleteProductDto,
  ): Promise<Product> {
    const { id } = body;

    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      relations: ['favourite', 'favourite.products'],
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const favourite = await this.favouriteRepo.findOne({
      where: {
        id: user.favourite.id,
      },
      relations: ['user', 'products'],
    });

    const product = await this.productRepo.findOne({
      where: {
        id,
      },
      relations: ['categories'],
    });

    favourite.products = [...(favourite.products || []), product];

    try {
      await this.favouriteRepo.save(favourite);
      return product;
    } catch (e) {
      throw new NotFoundException(`Server error: ${e}`);
    }
  }
}
