import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isNeedPackage: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isNeedDelivery: boolean;

  @IsString()
  @ApiProperty()
  comment: string;
}
