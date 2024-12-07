import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginGoogleDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
