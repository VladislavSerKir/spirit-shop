import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class EditCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}
