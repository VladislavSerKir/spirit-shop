import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SendCodeDto } from './send-code.dto';

export class ResetPasswordDto extends SendCodeDto {
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
