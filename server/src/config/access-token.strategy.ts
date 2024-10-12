import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/common/types/system.types';
import { UsersService } from 'src/datalake/user/users.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.access'),
    });
  }

  validate(payload: JwtPayload) {
    // return payload;

    const user = this.usersService.getUserById(Number(payload.sub));
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
