import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from '../category/entities/category.entity';
import { DeleteProductDto } from './dto/delete-product.dto';
import { IRemoveProduct } from 'src/common/types/interfaces';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepo.find({
      relations: { categories: true },
    });

    if (!products) {
      throw new NotFoundException('Ошибка загрузки продуктов');
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
      // return savedProduct;
      return savedProduct;
    } catch {
      throw new BadRequestException(`Запрос не сработал`);
    }
  }

  async deleteProduct(body: DeleteProductDto): Promise<IRemoveProduct> {
    const { id } = body;

    try {
      await this.productRepo.delete(String(id));
      return { id };
    } catch (e) {
      throw new NotFoundException(`Ошибка сервера: ${e}`);
    }
  }
}
