import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/datalake/user/entities/user.entity';
import { UsersService } from 'src/datalake/user/users.service';

export interface IJwt {
  userId: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: configService.get<string>('jwt.key'),
      secretOrKey: process.env.JWT_KEY,
      // algorithms: ['RS256'],
    });
  }

  async validate(payload: IJwt): Promise<User> {
    const user = this.usersService.getUserById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
