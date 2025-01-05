import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class HideProfileDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  hideProfile: boolean;
}
