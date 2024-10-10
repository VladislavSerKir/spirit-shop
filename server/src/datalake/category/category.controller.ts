import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { IRemoveCategory } from 'src/common/types/interfaces';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/')
  getCategoriesInfo(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Post('/create')
  async createProduct(
    @Body() body: CreateCategoryDto,
  ): Promise<Partial<Category>> {
    return this.categoryService.createCategory(body);
  }

  @Delete('/delete')
  async deleteCategory(
    @Body() body: DeleteCategoryDto,
  ): Promise<IRemoveCategory> {
    return this.categoryService.deleteCategory(body);
  }
}
