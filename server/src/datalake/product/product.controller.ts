import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Delete,
  Put,
  Request,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { IRemoveProduct } from 'src/common/types/interfaces';
import { EditProductDto } from './dto/edit-product.dto';
import { LikeDislikeProductDto } from './dto/like-dislike-product.dto';
import { UsersService } from '../user/users.service';

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
    @Request() request: any,
    @Body() body: CreateProductDto,
  ): Promise<Partial<Product>> {
    const accessToken = request.headers.authorization;
    return this.productService.createProduct(body, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/edit')
  async editProduct(
    @Request() request: any,
    @Body() body: EditProductDto,
  ): Promise<Partial<Product>> {
    const accessToken = request.headers.authorization;
    return this.productService.editProduct(body, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/delete')
  async deleteProduct(
    @Request() request: any,
    @Body() body: DeleteProductDto,
  ): Promise<IRemoveProduct> {
    const accessToken = request.headers.authorization;
    return this.productService.deleteProduct(body, accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/like')
  async likeProduct(
    @Request() request: any,
    @Body() body: LikeDislikeProductDto,
  ): Promise<Product> {
    const accessToken = request.headers.authorization;
    return this.productService.likeProduct(accessToken, body);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/dislike')
  async dislikeProduct(
    @Request() request: any,
    @Body() body: LikeDislikeProductDto,
  ): Promise<number> {
    const accessToken = request.headers.authorization;
    return this.productService.dislikeProduct(accessToken, body);
  }
}
