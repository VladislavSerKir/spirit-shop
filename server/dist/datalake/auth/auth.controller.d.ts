import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { GetCodeDto } from './dto/get-code.dto';
import { SendCodeDto } from './dto/send-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginYandexDto } from './dto/login-yandex.dto';
import { AccessRefreshTokenResponse, IHeadersAuthorizationRequest, SuccessResponse, UpdatedAccessTokenResponse } from 'src/common/types/interfaces';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginGoogleDto } from './dto/login-google.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signupDto: SignupDto): Promise<AccessRefreshTokenResponse>;
    signIn(signinDto: SigninDto): Promise<AccessRefreshTokenResponse>;
    logOut(logoutDto: LogoutDto): Promise<SuccessResponse>;
    refreshTokens(request: IHeadersAuthorizationRequest, refreshTokenDto: RefreshTokenDto): Promise<UpdatedAccessTokenResponse>;
    getUserData(request: IHeadersAuthorizationRequest): Promise<Partial<User>>;
    getResetCode(sendCodeDto: GetCodeDto): Promise<SuccessResponse>;
    sendResetCode(sendCodeDto: SendCodeDto): Promise<SuccessResponse>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<SuccessResponse>;
    loginYandex(loginYandexDto: LoginYandexDto): Promise<AccessRefreshTokenResponse>;
    loginGoogle(loginGoogleDto: LoginGoogleDto): Promise<AccessRefreshTokenResponse>;
}
