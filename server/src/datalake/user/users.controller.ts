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
import { IHeadersAuthorizationRequest } from 'src/common/types/interfaces';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/profile')
  @ApiOperation({ summary: 'Получение данных пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Возврат профиля',
    type: User,
  })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  getProfileInfo(@AuthUser() user: User): Promise<User> {
    return this.usersService.getProfileInfo(user.email);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/users')
  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Возврат всех пользователей',
    type: Array<User>,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  getUsers(@Request() request: IHeadersAuthorizationRequest): Promise<User[]> {
    const accessToken = request.headers.authorization;
    return this.usersService.getUsers(accessToken);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/profile')
  @ApiOperation({ summary: 'Изменение данных пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Возврат обновленного пользователя',
    type: User,
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  editProfile(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    const accessToken = request.headers.authorization;
    return this.usersService.editProfile(accessToken, updateUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Изменение данных пользователя по индентификатору' })
  @ApiResponse({
    status: 200,
    description: 'Возврат обновленного пользователя',
    type: User,
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiBadRequestResponse()
  updateToken(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateToken(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/find')
  @ApiOperation({ summary: 'Найти пользователей' })
  @ApiResponse({
    status: 201,
    description: 'Возврат найденных пользователей',
    type: Array<User>,
  })
  @ApiBody({
    type: FindUserDto,
  })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  findUserInfo(@Body() findUserDto: FindUserDto): Promise<User[]> {
    return this.usersService.findUserInfo(findUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/avatar')
  @ApiOperation({ summary: 'Изменить аватар пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Возврат обновленного пользователя',
    type: User,
  })
  @ApiBody({
    type: EditAvatarDto,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  editAvatar(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() editAvatarDto: EditAvatarDto,
  ): Promise<Partial<User>> {
    const accessToken = request.headers.authorization;
    return this.usersService.editAvatar(accessToken, editAvatarDto);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/admin')
  @ApiOperation({ summary: 'Назаначить админом' })
  @ApiResponse({
    status: 200,
    description: 'Возврат обновленного пользователя',
    type: User,
  })
  @ApiBody({
    type: AssignAdminDto,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  manageAdmin(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() assignAdminDto: AssignAdminDto,
  ): Promise<Partial<User>> {
    const accessToken = request.headers.authorization;
    return this.usersService.manageAdmin(accessToken, assignAdminDto);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/active')
  @ApiOperation({ summary: 'Управление состоянием аккаунта' })
  @ApiResponse({
    status: 200,
    description: 'Возврат обновленного пользователя',
    type: User,
  })
  @ApiBody({
    type: ManageAccountDto,
  })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  manageAccount(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() manageAccountDto: ManageAccountDto,
  ): Promise<Partial<User>> {
    const accessToken = request.headers.authorization;
    return this.usersService.manageAccount(accessToken, manageAccountDto);
  }
}
