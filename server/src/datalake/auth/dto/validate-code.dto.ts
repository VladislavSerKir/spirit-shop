import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SendCodeDto } from './send-code.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateCodeDto extends SendCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;
}
