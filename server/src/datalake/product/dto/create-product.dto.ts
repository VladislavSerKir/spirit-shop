import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/datalake/category/entities/category.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsArray()
  categories: Array<Category>;
}
