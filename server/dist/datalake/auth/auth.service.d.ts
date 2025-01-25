import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../user/users.service';
import { GetCodeDto } from './dto/get-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginYandexDto } from './dto/login-yandex.dto';
import { HttpService } from '@nestjs/axios';
import { AccessRefreshTokenResponse, IAccessRefreshTokenResponse, SuccessResponse, UpdatedAccessTokenResponse } from 'src/common/types/interfaces';
import { LogoutDto } from './dto/logout.dto';
import { LoginGoogleDto } from './dto/login-google.dto';
import { SendCodeDto } from './dto/send-code.dto';
export declare class AuthService {
    private userRepo;
    private jwtService;
    private usersService;
    private configService;
    private readonly httpService;
    constructor(userRepo: Repository<User>, jwtService: JwtService, usersService: UsersService, configService: ConfigService, httpService: HttpService);
    signUp(signupDto: SignupDto): Promise<IAccessRefreshTokenResponse>;
    signIn(signinDto: SigninDto): Promise<IAccessRefreshTokenResponse>;
    logOut(logoutDto: LogoutDto): Promise<{
        success: boolean;
    }>;
    getUserDataByAccessToken(accessToken: string): Promise<Partial<User>>;
    hashToken(data: string): Promise<string>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    refreshTokens(accessToken: string, refreshToken: string): Promise<UpdatedAccessTokenResponse>;
    validateTokenExpired(exp: number): boolean;
    getTokens(userId: number, email: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getResetCode(resetPasswordDto: GetCodeDto): Promise<SuccessResponse>;
    sendResetCode(validateCodeDto: SendCodeDto): Promise<SuccessResponse>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        success: boolean;
    }>;
    loginYandex(loginYandexDto: LoginYandexDto): Promise<AccessRefreshTokenResponse>;
    loginGoogle(loginGoogleDto: LoginGoogleDto): Promise<AccessRefreshTokenResponse>;
}
