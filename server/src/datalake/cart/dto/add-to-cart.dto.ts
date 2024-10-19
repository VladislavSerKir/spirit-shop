import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/datalake/category/entities/category.entity';

export class AddToCartDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  categories: Array<Category>;
}
