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
import {
  IHeadersAuthorizationRequest,
  IRemoveCategory,
} from 'src/common/types/interfaces';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { EditCategoryDto } from './dto/edit-category.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/')
  @ApiOperation({ summary: 'Получение всех категорий' })
  @ApiResponse({
    status: 200,
    description: 'Возврат категорий',
    type: Array<Category>,
  })
  @ApiNotFoundResponse()
  getCategoriesInfo(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @UseGuards(AccessTokenGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Создать категорию' })
  @ApiResponse({
    status: 201,
    description: 'Возврат категории',
    type: Category,
  })
  @ApiBody({
    type: CreateCategoryDto,
  })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  async createCategory(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Partial<Category>> {
    const accessToken = request.headers.authorization;
    return this.categoryService.createCategory(createCategoryDto, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/edit')
  @ApiOperation({ summary: 'Изменить категорию' })
  @ApiResponse({
    status: 200,
    description: 'Возврат измененной категории',
    type: Category,
  })
  @ApiBody({
    type: EditCategoryDto,
  })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  async editCategory(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() editCategoryDto: EditCategoryDto,
  ): Promise<Partial<Category>> {
    const accessToken = request.headers.authorization;
    return this.categoryService.editCategory(editCategoryDto, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/delete')
  @ApiOperation({ summary: 'Удалить категорию' })
  @ApiResponse({
    status: 200,
    description: 'Возврат индентификатора удаленной категории',
  })
  @ApiBody({
    type: DeleteCategoryDto,
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteCategory(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() deleteCategoryDto: DeleteCategoryDto,
  ): Promise<IRemoveCategory> {
    const accessToken = request.headers.authorization;
    return this.categoryService.deleteCategory(deleteCategoryDto, accessToken);
  }
}
