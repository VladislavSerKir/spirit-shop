import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepo.find();

    if (!categories) {
      throw new NotFoundException('Ошибка загрузки категорий');
    } else {
      return categories;
    }
  }
}
