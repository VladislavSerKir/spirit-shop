import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Delete,
  Request,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import {
  IHeadersAuthorizationRequest,
  RemoveProduct,
} from 'src/common/types/interfaces';
import { EditProductDto } from './dto/edit-product.dto';
import { LikeDislikeProductDto } from './dto/like-dislike-product.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  @ApiOperation({ summary: 'Получение всех продуктов' })
  @ApiResponse({
    status: 200,
    description: 'Возврат всех продуктов',
    type: Product,
  })
  @ApiNotFoundResponse()
  getProfileInfo(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @UseGuards(AccessTokenGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Создать продукт' })
  @ApiResponse({
    status: 201,
    description: 'Возврат созданного продукта',
    type: Product,
  })
  @ApiBody({
    type: CreateProductDto,
  })
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  async createProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Partial<Product>> {
    const accessToken = request.headers.authorization;
    return this.productService.createProduct(createProductDto, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/edit')
  @ApiOperation({ summary: 'Изменить продукт' })
  @ApiResponse({
    status: 200,
    description: 'Возврат изменного продукта',
    type: Product,
  })
  @ApiBody({
    type: EditProductDto,
  })
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async editProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() editProductDto: EditProductDto,
  ): Promise<Partial<Product>> {
    const accessToken = request.headers.authorization;
    return this.productService.editProduct(editProductDto, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/delete')
  @ApiOperation({ summary: 'Удалить продукт' })
  @ApiResponse({
    status: 200,
    description: 'Возврат индентификатора удаленного продукта',
    type: RemoveProduct,
  })
  @ApiBody({
    type: DeleteProductDto,
  })
  async deleteProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() deleteProductDto: DeleteProductDto,
  ): Promise<RemoveProduct> {
    const accessToken = request.headers.authorization;
    return this.productService.deleteProduct(deleteProductDto, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/like')
  @ApiOperation({ summary: 'Добавить продукт в избранное' })
  @ApiResponse({
    status: 200,
    description: 'Возврат продукта',
    type: Product,
  })
  @ApiBody({
    type: LikeDislikeProductDto,
  })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async likeProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() likeDislikeProductDto: LikeDislikeProductDto,
  ): Promise<Product> {
    const accessToken = request.headers.authorization;
    return this.productService.likeProduct(accessToken, likeDislikeProductDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/dislike')
  @ApiOperation({ summary: 'Убрать продукт из избранного' })
  @ApiResponse({
    status: 200,
    description: 'Возврат индентификатора удаляемого из избранного продукта',
  })
  @ApiBody({
    type: LikeDislikeProductDto,
  })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async dislikeProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() likeDislikeProductDto: LikeDislikeProductDto,
  ): Promise<number> {
    const accessToken = request.headers.authorization;
    return this.productService.dislikeProduct(
      accessToken,
      likeDislikeProductDto,
    );
  }
}
