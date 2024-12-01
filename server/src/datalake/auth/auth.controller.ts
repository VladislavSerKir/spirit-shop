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
  IHeadersAuthorizationRequest,
  ISuccessResponse,
} from 'src/common/types/interfaces';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signupDto: SignupDto): Promise<Partial<User>> {
    return await this.authService.signUp(signupDto);
  }

  @Post('/signin')
  async signIn(@Body() signinDto: SigninDto): Promise<Partial<User>> {
    return this.authService.signIn(signinDto);
  }

  @Post('/logout')
  logOut(@Body() logoutDto: LogoutDto): Promise<{ success: boolean }> {
    return this.authService.logOut(logoutDto);
  }

  @Post('/refresh')
  refreshTokens(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() refreshTokenDto: RefreshTokenDto,
  ) {
    const accessToken = request.headers.authorization;
    const { refreshToken } = refreshTokenDto;

    return this.authService.refreshTokens(accessToken, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/me')
  async getUserData(@Request() request: IHeadersAuthorizationRequest) {
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
  loginYandex(@Body() loginYandexDto: LoginYandexDto): Promise<Partial<User>> {
    return this.authService.loginYandex(loginYandexDto);
  }
}
