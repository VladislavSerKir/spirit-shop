import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteProductDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id: number;
}
