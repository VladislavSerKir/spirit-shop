import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id: number;
}
