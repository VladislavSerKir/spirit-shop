import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteProductDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
