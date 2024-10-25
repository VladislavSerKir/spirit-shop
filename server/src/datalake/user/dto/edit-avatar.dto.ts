import { IsNotEmpty, IsString } from 'class-validator';

export class EditAvatarDto {
  @IsNotEmpty()
  @IsString()
  avatar: string;
}
