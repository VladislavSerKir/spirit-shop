import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { IAccessToken } from 'src/common/types/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: SignupDto): Promise<User> {
    return await this.authService.signUp(body);
  }

  @Post('/signin')
  async signIn(@Body() body: SigninDto): Promise<IAccessToken> {
    return this.authService.signIn(body);
  }
}
