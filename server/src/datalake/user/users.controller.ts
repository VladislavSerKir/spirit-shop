import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Param,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/profile')
  getProfileInfo(@AuthUser() user: User): Promise<User> {
    return this.usersService.getProfileInfo(user.email);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/profile')
  editProfile(
    @AuthUser() user: User,
    @Body() userData: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.editProfile(user, userData);
  }

  @Patch(':id')
  updateToken(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateToken(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/find')
  findUserInfo(@Body() body: FindUserDto): Promise<User[]> {
    return this.usersService.findUserInfo(body);
  }

  // @Delete(':id')
  // deleteUser(@Param('id') id: string) {
  //   return this.usersService.deleteUser(id);
  // }
}
