import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  getProfileInfo(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Post('/create')
  async createProduct(
    @Body() body: CreateProductDto,
  ): Promise<Partial<Product>> {
    return this.productService.createProduct(body);
  }
}
