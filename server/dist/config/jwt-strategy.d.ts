import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/datalake/user/entities/user.entity';
import { UsersService } from 'src/datalake/user/users.service';
export interface IJwt {
    userId: number;
    email: string;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: IJwt): Promise<User>;
}
export {};
