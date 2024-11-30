import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SendCodeDto } from './send-code.dto';

export class ValidateCodeDto extends SendCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
