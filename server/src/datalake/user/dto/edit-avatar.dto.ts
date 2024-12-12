import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditAvatarDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  avatar: string;
}
