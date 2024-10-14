import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { DeleteResult } from 'typeorm';
import { IRemoveProduct } from 'src/common/types/interfaces';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  getProfileInfo(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @UseGuards(AccessTokenGuard)
  @Post('/create')
  async createProduct(
    @Body() body: CreateProductDto,
  ): Promise<Partial<Product>> {
    return this.productService.createProduct(body);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/delete')
  async deleteProduct(@Body() body: DeleteProductDto): Promise<IRemoveProduct> {
    return this.productService.deleteProduct(body);
  }
}
