import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  lastName: string;

  @IsString()
  @IsPhoneNumber('RU')
  @IsNotEmpty()
  mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
