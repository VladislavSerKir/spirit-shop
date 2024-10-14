import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { IRemoveCategory } from 'src/common/types/interfaces';
import { EditCategoryDto } from './dto/edit-category.dto';

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

  async createCategory(body: CreateCategoryDto): Promise<Partial<Category>> {
    const { name } = body;

    const newCategory = await this.categoryRepo.create({ name });

    try {
      const savedCategory = await this.categoryRepo.save(newCategory);
      return savedCategory;
    } catch {
      throw new BadRequestException(`Запрос не сработал`);
    }
  }

  async editCategory(body: EditCategoryDto): Promise<Partial<Category>> {
    const { name, id } = body;
    const updatedCategory = await this.categoryRepo.update({ id }, { name });

    if (!updatedCategory) {
      throw new BadRequestException('Ошибка запроса на изменение категории');
    } else {
      return { name, id };
    }
  }

  async deleteCategory(body: DeleteCategoryDto): Promise<IRemoveCategory> {
    const { id } = body;

    try {
      await this.categoryRepo.delete(String(id));
      return { id };
    } catch (e) {
      throw new NotFoundException(`Ошибка сервера: ${e}`);
    }
  }
}
