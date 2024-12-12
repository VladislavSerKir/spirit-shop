import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class LikeDislikeReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id: number;
}
