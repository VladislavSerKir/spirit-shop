import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from 'src/config/access-token.guard';

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
  logOut(@Body() body: any) {
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
}
