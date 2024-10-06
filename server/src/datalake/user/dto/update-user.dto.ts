import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

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
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsPhoneNumber('RU')
  phone: string;
}
