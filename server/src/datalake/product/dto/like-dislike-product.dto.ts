import { IsNotEmpty, IsNumber } from 'class-validator';

export class LikeDislikeProductDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
