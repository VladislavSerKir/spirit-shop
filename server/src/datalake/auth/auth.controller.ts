import {
  Body,
  Controller,
  Get,
  Logger,
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
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: SignupDto): Promise<Partial<User>> {
    return await this.authService.signUp(body);
  }

  @Post('/signin')
  async signIn(@Body() body: SigninDto): Promise<Partial<User>> {
    return this.authService.signIn(body);
  }

  @Post('/logout')
  logOut(@Body() body: any): Promise<{ success: boolean }> {
    this.logger.log(body);

    return this.authService.logOut(body);
  }

  @Post('/refresh')
  refreshTokens(@Request() req, @Body() body: any) {
    const accessToken = req.headers.authorization;
    const { refreshToken } = body;

    return this.authService.refreshTokens(accessToken, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/me')
  async getUserData(@Request() request: any) {
    const accessToken = request.headers.authorization;

    return await this.authService.getUserDataByAccessToken(accessToken);
  }

  @Post('/send-code')
  sendResetCode(@Body() body: SendCodeDto): Promise<any> {
    return this.authService.sendResetCode(body);
  }

  @Post('validate-code')
  async validateResetCode(
    @Body() body: ValidateCodeDto,
  ): Promise<{ success: boolean }> {
    return await this.authService.validateResetCode(body);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() body: ResetPasswordDto,
  ): Promise<{ success: boolean }> {
    return await this.authService.resetPassword(body);
  }

  @UseGuards(AuthGuard('yandex'))
  @Get('yandex')
  yandex() {
    /* Этот метод можно оставить пустым, так как Passport перенаправит пользователя в Яндекс */
  }

  @UseGuards(AuthGuard('yandex'))
  @Get('yandex/callback')
  yandexCallback(@Request() request: any) {
    return this.authService.getTokens(request.user.email, request.user.userId);
  }
}
