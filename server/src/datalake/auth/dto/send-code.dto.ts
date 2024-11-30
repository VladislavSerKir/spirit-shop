import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendCodeDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
