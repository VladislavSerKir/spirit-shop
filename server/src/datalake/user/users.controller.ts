import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { JwtGuard } from 'src/config/jwt-guard';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('/profile')
  getProfileInfo(@AuthUser() user: User): Promise<User> {
    return this.usersService.getProfileInfo(user.email);
  }

  @UseGuards(JwtGuard)
  @Patch('/profile')
  editProfile(
    @AuthUser() user: User,
    @Body() userData: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.editProfile(user, userData);
  }

  @UseGuards(JwtGuard)
  @Post('/find')
  findUserInfo(@Body() body: FindUserDto): Promise<User[]> {
    return this.usersService.findUserInfo(body);
  }
}
