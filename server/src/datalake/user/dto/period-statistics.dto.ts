import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetStatisticsPeriodDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  endDate: string;
}
