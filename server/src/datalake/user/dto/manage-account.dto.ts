import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ManageAccountDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
