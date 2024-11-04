import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AssignAdminDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  role: string;
}
