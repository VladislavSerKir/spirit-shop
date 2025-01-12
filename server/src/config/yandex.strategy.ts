import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport-yandex';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/datalake/user/users.service';
import { Strategy as YandexStrategy } from 'passport-yandex';

@Injectable()
export class YandexAuthStrategy extends PassportStrategy(
  YandexStrategy,
  'yandex',
) {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('yandex.client_id'),
      clientSecret: configService.get<string>('yandex.client_secret'),
      callbackURL: configService.get<string>('yandex.redirect_uri'),
    });
  }

  async validate(yandexProfile: Profile) {
    const user = await this.usersService.findByYandexID(yandexProfile);

    if (!user) {
      return await this.usersService.createFromYandex(yandexProfile);
    }

    return user;
  }
}
