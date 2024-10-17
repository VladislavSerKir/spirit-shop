import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class EditProductDto extends CreateProductDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
