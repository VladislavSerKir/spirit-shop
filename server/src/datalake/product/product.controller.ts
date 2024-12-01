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
  IRemoveProduct,
} from 'src/common/types/interfaces';
import { EditProductDto } from './dto/edit-product.dto';
import { LikeDislikeProductDto } from './dto/like-dislike-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  getProfileInfo(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @UseGuards(AccessTokenGuard)
  @Post('/create')
  async createProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Partial<Product>> {
    const accessToken = request.headers.authorization;
    return this.productService.createProduct(createProductDto, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/edit')
  async editProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() editProductDto: EditProductDto,
  ): Promise<Partial<Product>> {
    const accessToken = request.headers.authorization;
    return this.productService.editProduct(editProductDto, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/delete')
  async deleteProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() deleteProductDto: DeleteProductDto,
  ): Promise<IRemoveProduct> {
    const accessToken = request.headers.authorization;
    return this.productService.deleteProduct(deleteProductDto, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/like')
  async likeProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() likeDislikeProductDto: LikeDislikeProductDto,
  ): Promise<Product> {
    const accessToken = request.headers.authorization;
    return this.productService.likeProduct(accessToken, likeDislikeProductDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/dislike')
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
