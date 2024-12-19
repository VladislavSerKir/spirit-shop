import { IsNotEmpty, IsString } from 'class-validator';
import { GetCodeDto } from './get-code.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto extends GetCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;
}
