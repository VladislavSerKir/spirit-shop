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
import { RefreshTokenGuard } from 'src/config/refresh-token.guard';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
// import { AuthGuard } from 'src/config/auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    // @InjectPinoLogger(AuthController.name)
    // private readonly logger: PinoLogger,
    private readonly authService: AuthService,
  ) {}

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

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  refreshTokens(@Request() req, @Body() body: any) {
    // const accessToken = req.headers.authorization;
    // const userId = req.user['sub'];
    // const refreshToken = req.user['refreshToken'];
    const { refreshToken } = body;
    return this.authService.refreshTokens(refreshToken);
  }

  @Get('/me')
  @UseGuards(AccessTokenGuard)
  async getUserData(@Request() request: any) {
    const accessToken = request.headers.authorization;
    // this.logger.log(accessToken);
    return await this.authService.getUserDataByAccessToken(accessToken);
    // return request.user;
    // return accessToken;
  }
}
