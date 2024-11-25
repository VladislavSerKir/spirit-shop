import { IsNotEmpty, IsNumber } from 'class-validator';

export class LikeDislikeReviewDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
