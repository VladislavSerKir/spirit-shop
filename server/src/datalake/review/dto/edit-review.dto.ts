import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class EditReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  productId: number;

  @IsString()
  @ApiProperty()
  comment: string;

  @IsInt()
  @Min(0, { message: 'Rate must be at least 0' })
  @Max(5, { message: 'Rate must not exceed 5' })
  @ApiProperty()
  rate: number;
}
