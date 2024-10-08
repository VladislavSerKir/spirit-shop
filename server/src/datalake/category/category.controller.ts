import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/')
  getCategoriesInfo(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }
}
