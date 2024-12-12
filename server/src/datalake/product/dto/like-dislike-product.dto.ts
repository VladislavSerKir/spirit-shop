import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class LikeDislikeProductDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id: number;
}
