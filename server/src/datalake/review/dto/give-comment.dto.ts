import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GiveCommentDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
