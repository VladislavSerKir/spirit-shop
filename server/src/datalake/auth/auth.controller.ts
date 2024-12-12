import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { SendCodeDto } from './dto/send-code.dto';
import { ValidateCodeDto } from './dto/validate-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginYandexDto } from './dto/login-yandex.dto';
import {
  AccessRefreshTokenResponse,
  IHeadersAuthorizationRequest,
  ISuccessResponse,
  SuccessResponse,
  UpdatedAccessTokenResponse,
} from 'src/common/types/interfaces';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginGoogleDto } from './dto/login-google.dto';
import {
  ApiBody,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Регистрация аккаунта' })
  @ApiResponse({
    status: 201,
    description: 'Возврат access token, refresh token',
    type: AccessRefreshTokenResponse,
  })
  @ApiBody({
    type: SignupDto,
  })
  @ApiConflictResponse()
  @ApiInternalServerErrorResponse()
  async signUp(
    @Body() signupDto: SignupDto,
  ): Promise<AccessRefreshTokenResponse> {
    return await this.authService.signUp(signupDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Возврат access token, refresh token',
    type: AccessRefreshTokenResponse,
  })
  @ApiBody({
    type: SigninDto,
  })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async signIn(
    @Body() signinDto: SigninDto,
  ): Promise<AccessRefreshTokenResponse> {
    return this.authService.signIn(signinDto);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Выйти из аккаунта' })
  @ApiResponse({
    status: 201,
    description: 'Возврат результата операции',
    type: SuccessResponse,
  })
  @ApiBody({
    type: LogoutDto,
  })
  logOut(@Body() logoutDto: LogoutDto): Promise<SuccessResponse> {
    return this.authService.logOut(logoutDto);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Запрос access token по refresh token' })
  @ApiResponse({
    status: 201,
    description: 'Возврат access token',
    type: UpdatedAccessTokenResponse,
  })
  @ApiBody({
    type: RefreshTokenDto,
  })
  @ApiForbiddenResponse()
  refreshTokens(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<UpdatedAccessTokenResponse> {
    const accessToken = request.headers.authorization;
    const { refreshToken } = refreshTokenDto;

    return this.authService.refreshTokens(accessToken, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/me')
  @ApiOperation({ summary: 'Получить пользователя по access token' })
  @ApiResponse({
    status: 200,
    description: 'Возвращен объект пользователя',
    type: User,
  })
  @ApiInternalServerErrorResponse()
  async getUserData(
    @Request() request: IHeadersAuthorizationRequest,
  ): Promise<Partial<User>> {
    const accessToken = request.headers.authorization;

    return await this.authService.getUserDataByAccessToken(accessToken);
  }

  @Post('/send-code')
  sendResetCode(@Body() sendCodeDto: SendCodeDto): Promise<any> {
    return this.authService.sendResetCode(sendCodeDto);
  }

  @Post('validate-code')
  async validateResetCode(
    @Body() validateCodeDto: ValidateCodeDto,
  ): Promise<ISuccessResponse> {
    return await this.authService.validateResetCode(validateCodeDto);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<ISuccessResponse> {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @Post('/login-yandex')
  @ApiOperation({
    summary:
      'Авторизация или создание аккаунта на основе данных пользователя с Yandex',
  })
  @ApiResponse({
    status: 201,
    description: 'Возврат access token, refresh token',
    type: AccessRefreshTokenResponse,
  })
  @ApiBody({
    type: LoginYandexDto,
  })
  @ApiInternalServerErrorResponse()
  @ApiUnauthorizedResponse()
  loginYandex(
    @Body() loginYandexDto: LoginYandexDto,
  ): Promise<AccessRefreshTokenResponse> {
    return this.authService.loginYandex(loginYandexDto);
  }

  @Post('/login-google')
  @ApiOperation({
    summary:
      'Авторизация или создание аккаунта на основе данных пользователя с Google',
  })
  @ApiResponse({
    status: 201,
    description: 'Возврат access token, refresh token',
    type: AccessRefreshTokenResponse,
  })
  @ApiBody({
    type: LoginGoogleDto,
  })
  @ApiInternalServerErrorResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiConflictResponse()
  loginGoogle(
    @Body() loginGoogleDto: LoginGoogleDto,
  ): Promise<AccessRefreshTokenResponse> {
    return this.authService.loginGoogle(loginGoogleDto);
  }
}
