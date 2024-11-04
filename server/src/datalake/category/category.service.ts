import {
  BadRequestException,
  ForbiddenException,
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
import { UsersService } from '../user/users.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepo.find();

    if (!categories) {
      throw new NotFoundException('Error fetch categories');
    } else {
      return categories;
    }
  }

  async createCategory(
    body: CreateCategoryDto,
    accessToken: string,
  ): Promise<Partial<Category>> {
    const currentUserIsAdmin = await this.usersService.hasAdminRole(
      accessToken,
    );

    if (!currentUserIsAdmin) {
      throw new ForbiddenException('This action only available for admins');
    }

    const { name } = body;

    const newCategory = await this.categoryRepo.create({ name });

    try {
      const savedCategory = await this.categoryRepo.save(newCategory);
      return savedCategory;
    } catch {
      throw new BadRequestException(`Request did not work`);
    }
  }

  async editCategory(
    body: EditCategoryDto,
    accessToken: string,
  ): Promise<Partial<Category>> {
    const currentUserIsAdmin = await this.usersService.hasAdminRole(
      accessToken,
    );

    if (!currentUserIsAdmin) {
      throw new ForbiddenException('This action only available for admins');
    }

    const { name, id } = body;
    const updatedCategory = await this.categoryRepo.update({ id }, { name });

    if (!updatedCategory) {
      throw new BadRequestException('Error change category request');
    } else {
      return { name, id };
    }
  }

  async deleteCategory(
    body: DeleteCategoryDto,
    accessToken: string,
  ): Promise<IRemoveCategory> {
    const currentUserIsAdmin = await this.usersService.hasAdminRole(
      accessToken,
    );

    if (!currentUserIsAdmin) {
      throw new ForbiddenException('This action only available for admins');
    }

    const { id } = body;

    try {
      await this.categoryRepo.delete(String(id));
      return { id };
    } catch (e) {
      throw new NotFoundException(`Server error: ${e}`);
    }
  }
}
