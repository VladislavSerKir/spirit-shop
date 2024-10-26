import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsBoolean()
  isNeedPackage: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isNeedDelivery: boolean;

  @IsString()
  comment: string;
}
