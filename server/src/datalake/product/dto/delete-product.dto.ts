import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteProductDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
