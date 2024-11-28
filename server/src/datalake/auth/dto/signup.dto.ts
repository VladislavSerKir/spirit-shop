import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('RU')
  mobileNumber: string;
}
