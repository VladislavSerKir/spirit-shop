import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Param,
  Request,
  Put,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EditAvatarDto } from './dto/edit-avatar.dto';
import { AssignAdminDto } from './dto/assign-admin.dto';
import { ManageAccountDto } from './dto/manage-account.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/profile')
  getProfileInfo(@AuthUser() user: User): Promise<User> {
    return this.usersService.getProfileInfo(user.email);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/users')
  getUsers(@Request() request: any): Promise<User[]> {
    const accessToken = request.headers.authorization;
    return this.usersService.getUsers(accessToken);
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

  @UseGuards(AccessTokenGuard)
  @Put('/avatar')
  editAvatar(
    @Request() request: any,
    @Body() userData: EditAvatarDto,
  ): Promise<Partial<User>> {
    const accessToken = request.headers.authorization;
    return this.usersService.editAvatar(accessToken, userData);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/admin')
  manageAdmin(
    @Request() request: any,
    @Body() userData: AssignAdminDto,
  ): Promise<Partial<User>> {
    const accessToken = request.headers.authorization;
    return this.usersService.manageAdmin(accessToken, userData);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/active')
  manageAccount(
    @Request() request: any,
    @Body() userData: ManageAccountDto,
  ): Promise<Partial<User>> {
    const accessToken = request.headers.authorization;
    return this.usersService.manageAccount(accessToken, userData);
  }
}
