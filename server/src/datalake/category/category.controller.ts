import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { IRemoveCategory } from 'src/common/types/interfaces';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { EditCategoryDto } from './dto/edit-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/')
  getCategoriesInfo(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @UseGuards(AccessTokenGuard)
  @Post('/create')
  async createCategory(
    @Request() request: any,
    @Body() body: CreateCategoryDto,
  ): Promise<Partial<Category>> {
    const accessToken = request.headers.authorization;
    return this.categoryService.createCategory(body, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/edit')
  async editCategory(
    @Request() request: any,
    @Body() body: EditCategoryDto,
  ): Promise<Partial<Category>> {
    const accessToken = request.headers.authorization;
    return this.categoryService.editCategory(body, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/delete')
  async deleteCategory(
    @Request() request: any,
    @Body() body: DeleteCategoryDto,
  ): Promise<IRemoveCategory> {
    const accessToken = request.headers.authorization;
    return this.categoryService.deleteCategory(body, accessToken);
  }
}
