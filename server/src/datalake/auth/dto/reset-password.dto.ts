import { IsNotEmpty, IsString } from 'class-validator';
import { SendCodeDto } from './send-code.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto extends SendCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;
}
