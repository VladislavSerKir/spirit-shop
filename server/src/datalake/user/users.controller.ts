import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Param,
  Request,
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
    @Request() request: any,
    @Body() userData: UpdateUserDto,
  ): Promise<Partial<User>> {
    const accessToken = request.headers.authorization;
    return this.usersService.editProfile(accessToken, userData);
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
}
