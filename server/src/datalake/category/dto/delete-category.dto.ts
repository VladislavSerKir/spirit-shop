import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id: number;
}
