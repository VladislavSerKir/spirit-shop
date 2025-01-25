"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const signup_dto_1 = require("./dto/signup.dto");
const signin_dto_1 = require("./dto/signin.dto");
const user_entity_1 = require("../user/entities/user.entity");
const auth_service_1 = require("./auth.service");
const access_token_guard_1 = require("../../config/access-token.guard");
const get_code_dto_1 = require("./dto/get-code.dto");
const send_code_dto_1 = require("./dto/send-code.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const login_yandex_dto_1 = require("./dto/login-yandex.dto");
const interfaces_1 = require("../../common/types/interfaces");
const logout_dto_1 = require("./dto/logout.dto");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const login_google_dto_1 = require("./dto/login-google.dto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(signupDto) {
        return await this.authService.signUp(signupDto);
    }
    async signIn(signinDto) {
        return this.authService.signIn(signinDto);
    }
    logOut(logoutDto) {
        return this.authService.logOut(logoutDto);
    }
    refreshTokens(request, refreshTokenDto) {
        const accessToken = request.headers.authorization;
        const { refreshToken } = refreshTokenDto;
        return this.authService.refreshTokens(accessToken, refreshToken);
    }
    async getUserData(request) {
        const accessToken = request.headers.authorization;
        return await this.authService.getUserDataByAccessToken(accessToken);
    }
    async getResetCode(sendCodeDto) {
        return this.authService.getResetCode(sendCodeDto);
    }
    async sendResetCode(sendCodeDto) {
        return await this.authService.sendResetCode(sendCodeDto);
    }
    async resetPassword(resetPasswordDto) {
        return await this.authService.resetPassword(resetPasswordDto);
    }
    loginYandex(loginYandexDto) {
        return this.authService.loginYandex(loginYandexDto);
    }
    loginGoogle(loginGoogleDto) {
        return this.authService.loginGoogle(loginGoogleDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/signup'),
    (0, swagger_1.ApiOperation)({ summary: 'Регистрация аккаунта' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Возврат access token, refresh token',
        type: interfaces_1.AccessRefreshTokenResponse,
    }),
    (0, swagger_1.ApiBody)({
        type: signup_dto_1.SignupDto,
    }),
    (0, swagger_1.ApiConflictResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/signin'),
    (0, swagger_1.ApiOperation)({ summary: 'Авторизация пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Возврат access token, refresh token',
        type: interfaces_1.AccessRefreshTokenResponse,
    }),
    (0, swagger_1.ApiBody)({
        type: signin_dto_1.SigninDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SigninDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/logout'),
    (0, swagger_1.ApiOperation)({ summary: 'Выйти из аккаунта' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Возврат результата операции',
        type: interfaces_1.SuccessResponse,
    }),
    (0, swagger_1.ApiBody)({
        type: logout_dto_1.LogoutDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [logout_dto_1.LogoutDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.Post)('/refresh'),
    (0, swagger_1.ApiOperation)({ summary: 'Запрос access token по refresh token' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Возврат access token',
        type: interfaces_1.UpdatedAccessTokenResponse,
    }),
    (0, swagger_1.ApiBody)({
        type: refresh_token_dto_1.RefreshTokenDto,
    }),
    (0, swagger_1.ApiForbiddenResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('/me'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить пользователя по access token' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возвращен объект пользователя',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserData", null);
__decorate([
    (0, common_1.Post)('/get-code'),
    (0, swagger_1.ApiOperation)({ summary: 'Запрос кода на почту' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Возврат результата',
        type: interfaces_1.SuccessResponse,
    }),
    (0, swagger_1.ApiBody)({
        type: get_code_dto_1.GetCodeDto,
    }),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_code_dto_1.GetCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getResetCode", null);
__decorate([
    (0, common_1.Post)('/send-code'),
    (0, swagger_1.ApiOperation)({ summary: 'Отправка и валидация кода проверки' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Возврат результата',
        type: interfaces_1.SuccessResponse,
    }),
    (0, swagger_1.ApiBody)({
        type: send_code_dto_1.SendCodeDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_code_dto_1.SendCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendResetCode", null);
__decorate([
    (0, common_1.Patch)('/reset-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Запрос на изменение пароля' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат результата',
        type: interfaces_1.SuccessResponse,
    }),
    (0, swagger_1.ApiBody)({
        type: reset_password_dto_1.ResetPasswordDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('/login-yandex'),
    (0, swagger_1.ApiOperation)({
        summary: 'Авторизация или создание аккаунта на основе данных пользователя с Yandex',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Возврат access token, refresh token',
        type: interfaces_1.AccessRefreshTokenResponse,
    }),
    (0, swagger_1.ApiBody)({
        type: login_yandex_dto_1.LoginYandexDto,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_yandex_dto_1.LoginYandexDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginYandex", null);
__decorate([
    (0, common_1.Post)('/login-google'),
    (0, swagger_1.ApiOperation)({
        summary: 'Авторизация или создание аккаунта на основе данных пользователя с Google',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Возврат access token, refresh token',
        type: interfaces_1.AccessRefreshTokenResponse,
    }),
    (0, swagger_1.ApiBody)({
        type: login_google_dto_1.LoginGoogleDto,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiConflictResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_google_dto_1.LoginGoogleDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginGoogle", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map