import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
