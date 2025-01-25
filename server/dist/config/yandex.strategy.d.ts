import { Profile } from 'passport-yandex';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/datalake/user/users.service';
import { Strategy as YandexStrategy } from 'passport-yandex';
declare const YandexAuthStrategy_base: new (...args: any[]) => YandexStrategy<unknown>;
export declare class YandexAuthStrategy extends YandexAuthStrategy_base {
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(yandexProfile: Profile): Promise<string | import("../common/types/interfaces").YandexUserResponseOKInterface>;
}
export {};
