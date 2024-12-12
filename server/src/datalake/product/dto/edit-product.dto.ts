import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EditProductDto extends CreateProductDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id: number;
}
