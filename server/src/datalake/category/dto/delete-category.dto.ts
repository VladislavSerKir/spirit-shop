import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
