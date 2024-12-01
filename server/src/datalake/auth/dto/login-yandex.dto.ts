import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginYandexDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
