import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { GetCodeDto } from './get-code.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SendCodeDto extends GetCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;
}
