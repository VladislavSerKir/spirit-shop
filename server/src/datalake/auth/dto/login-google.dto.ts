import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginGoogleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  access_token: string;
}
