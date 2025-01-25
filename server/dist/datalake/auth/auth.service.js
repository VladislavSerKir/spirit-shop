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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const constants_1 = require("../../common/constants/constants");
const hash_service_1 = require("../../common/hash/hash.service");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../user/users.service");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const cart_entity_1 = require("../cart/entities/cart.entity");
const favourite_entity_1 = require("../product/entities/favourite.entity");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AuthService = class AuthService {
    constructor(userRepo, jwtService, usersService, configService, httpService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.configService = configService;
        this.httpService = httpService;
    }
    async signUp(signupDto) {
        const { firstName, lastName, email, password, mobileNumber } = signupDto;
        const hashedPassword = await hash_service_1.HashService.generateHash(password);
        const newUser = this.userRepo.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            mobileNumber,
            role: email === process.env.ADMIN_EMAIL_SECONDARY ||
                email === process.env.ADMIN_EMAIL
                ? 'admin'
                : 'user',
        });
        const cart = new cart_entity_1.Cart();
        const favourite = new favourite_entity_1.Favourite();
        newUser.cart = cart;
        newUser.favourite = favourite;
        try {
            await this.userRepo.save(newUser);
            const { id, email } = newUser;
            const { accessToken, refreshToken } = await this.getTokens(id, email);
            await this.updateRefreshToken(id, refreshToken);
            return {
                accessToken,
                refreshToken,
            };
        }
        catch (e) {
            if (e.code === constants_1.duplicateKeyStatusCode) {
                throw new common_1.ConflictException('User with email already exist');
            }
            else {
                throw new common_1.InternalServerErrorException('Internal server error');
            }
        }
    }
    async signIn(signinDto) {
        const { email, password } = signinDto;
        const user = await this.userRepo.findOne({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                active: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Profile not found');
        }
        if (!user.active) {
            throw new common_1.ForbiddenException('User is not available or diactivated');
        }
        if (user && (await hash_service_1.HashService.compareHash(password, user.password))) {
            const { id, email } = user;
            const { accessToken, refreshToken } = await this.getTokens(id, email);
            await this.updateRefreshToken(id, refreshToken);
            return {
                accessToken,
                refreshToken,
            };
        }
        else {
            throw new common_1.UnauthorizedException('Check login or password');
        }
    }
    async logOut(logoutDto) {
        const { email } = logoutDto;
        const user = await this.usersService.findByEmail(email);
        this.usersService.updateToken(user.id, { refreshToken: '' });
        return { success: true };
    }
    async getUserDataByAccessToken(accessToken) {
        try {
            const token = accessToken.split(' ')[1];
            const decodedToken = this.jwtService.verify(token, {
                secret: this.configService.get('jwt.access'),
            });
            const username = decodedToken.username;
            const user = await this.userRepo.findOne({
                where: { email: username },
                relations: [
                    'favourite',
                    'favourite.products',
                    'favourite.products.categories',
                ],
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    mobileNumber: true,
                    role: true,
                    avatar: true,
                    hideProfile: true,
                    favourite: {
                        id: true,
                        products: {
                            id: true,
                            name: true,
                            price: true,
                            image: true,
                            description: true,
                            categories: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            });
            const { id, firstName, lastName, email, mobileNumber, role, cart, avatar, favourite, hideProfile, } = user;
            return {
                id,
                firstName,
                lastName,
                email,
                mobileNumber,
                role,
                avatar,
                cart,
                favourite,
                hideProfile,
            };
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('jwt expired');
            }
            throw new common_1.InternalServerErrorException(`Internal server error: ${error}`);
        }
    }
    hashToken(data) {
        return argon2.hash(data);
    }
    async updateRefreshToken(userId, refreshToken) {
        await this.usersService.updateToken(userId, {
            refreshToken: refreshToken,
        });
    }
    async refreshTokens(accessToken, refreshToken) {
        const token = accessToken.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const username = decodedToken['username'];
        const user = await this.userRepo.findOne({
            where: { email: username },
            select: {
                id: true,
                email: true,
                refreshToken: true,
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Token updating unavailable, access forbidden');
        }
        if (refreshToken !== user.refreshToken) {
            throw new common_1.ForbiddenException('Token updating unavailable, access forbidden');
        }
        const decodedRefreshToken = jwt.decode(refreshToken);
        const isRefreshTokenExpired = this.validateTokenExpired(decodedRefreshToken['exp']);
        if (isRefreshTokenExpired) {
            const newRefreshToken = '';
            await this.userRepo.update({ email: username }, { refreshToken: newRefreshToken });
            throw new common_1.ForbiddenException('Refresh token expired');
        }
        const { id, email } = user;
        const { accessToken: updatedAccessToken } = await this.getTokens(id, email);
        return { updatedAccessToken };
    }
    validateTokenExpired(exp) {
        const currentTime = Date.now() / 1000;
        return currentTime > exp;
    }
    async getTokens(userId, email) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                username: email,
            }, {
                secret: this.configService.get('jwt.access'),
                expiresIn: '1d',
            }),
            this.jwtService.signAsync({
                sub: userId,
                username: email,
            }, {
                secret: this.configService.get('jwt.refresh'),
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async getResetCode(resetPasswordDto) {
        const { email } = resetPasswordDto;
        const user = await this.userRepo.findOne({
            where: { email },
            select: {
                email: true,
                active: true,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid email');
        }
        if (!user.active) {
            throw new common_1.ForbiddenException('User is not available or diactivated');
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const updatedUser = await this.userRepo.update({ email }, { resetCode: code });
        if (!updatedUser) {
            throw new common_1.InternalServerErrorException('Error to update reset code');
        }
        setTimeout(async () => {
            await this.userRepo.update({ email }, { resetCode: '' });
        }, 60000);
        return { success: true };
    }
    async sendResetCode(validateCodeDto) {
        const { email, code } = validateCodeDto;
        const user = await this.userRepo.findOne({
            where: { email },
            select: {
                email: true,
                password: true,
                resetCode: true,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Error profile fetching');
        }
        if (code === user.resetCode) {
            return { success: true };
        }
        else {
            throw new common_1.ForbiddenException('Invalid code');
        }
    }
    async resetPassword(resetPasswordDto) {
        const { newPassword, email } = resetPasswordDto;
        const user = await this.userRepo.findOne({
            where: { email },
            select: {
                email: true,
                password: true,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Error profile fetching');
        }
        const hashedPassword = await hash_service_1.HashService.generateHash(newPassword);
        const updatedUser = await this.userRepo.update({ email }, { password: hashedPassword });
        if (updatedUser) {
            return { success: true };
        }
        else {
            throw new common_1.InternalServerErrorException('Error to update password');
        }
    }
    async loginYandex(loginYandexDto) {
        const { code } = loginYandexDto;
        const clientID = this.configService.get('yandex.client_id');
        const clientSecret = this.configService.get('yandex.client_secret');
        const yandexAuthUrl = `https://oauth.yandex.ru/token`;
        const yandexAuthConfig = {
            'Content-type': 'application/x-www-form-urlencoded',
        };
        const body = new URLSearchParams();
        body.append('grant_type', 'authorization_code');
        body.append('code', code);
        body.append('client_id', clientID);
        body.append('client_secret', clientSecret);
        let access_token;
        try {
            const { data, status } = await (0, rxjs_1.firstValueFrom)(this.httpService.post(yandexAuthUrl, body.toString(), yandexAuthConfig));
            if (status === 200) {
                ({ access_token } = data);
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
        catch (err) {
            const { response: { status, statusText }, } = err;
            switch (status) {
                case 401:
                    throw new common_1.UnauthorizedException(statusText);
                default:
                    throw new common_1.InternalServerErrorException({
                        message: 'Unexpected error occured',
                    });
            }
        }
        const yandexUserUrl = `https://login.yandex.ru/info?format=json`;
        const yandexUserConfig = {
            headers: {
                Authorization: `OAuth ${access_token}`,
            },
        };
        let yandexUserData;
        try {
            const { data, status } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(yandexUserUrl, yandexUserConfig));
            if (status === 200) {
                yandexUserData = data;
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
        catch (err) {
            const { response: { status, statusText }, } = err;
            switch (status) {
                case 401:
                    throw new common_1.UnauthorizedException(statusText);
                default:
                    throw new common_1.InternalServerErrorException({
                        message: 'Unexpected error occured',
                    });
            }
        }
        const { default_email, first_name, last_name } = yandexUserData;
        const user = await this.userRepo.findOne({
            where: { email: default_email },
            select: {
                id: true,
                email: true,
                password: true,
                active: true,
                firstName: true,
                lastName: true,
            },
        });
        if (!user) {
            const hashedPassword = await hash_service_1.HashService.generateHash('password');
            const newUser = this.userRepo.create({
                firstName: first_name,
                lastName: last_name,
                email: default_email,
                password: hashedPassword,
                mobileNumber: '',
                role: default_email === process.env.ADMIN_EMAIL_SECONDARY ||
                    default_email === process.env.ADMIN_EMAIL
                    ? 'admin'
                    : 'user',
            });
            const cart = new cart_entity_1.Cart();
            const favourite = new favourite_entity_1.Favourite();
            newUser.cart = cart;
            newUser.favourite = favourite;
            try {
                await this.userRepo.save(newUser);
                const { id, email } = newUser;
                const { accessToken, refreshToken } = await this.getTokens(id, email);
                await this.updateRefreshToken(id, refreshToken);
                return {
                    accessToken,
                    refreshToken,
                };
            }
            catch (e) {
                if (e.code === constants_1.duplicateKeyStatusCode) {
                    throw new common_1.ConflictException('User with email already exist');
                }
                else {
                    throw new common_1.InternalServerErrorException('Internal server error');
                }
            }
        }
        if (!user.active) {
            throw new common_1.ForbiddenException('User is not available or diactivated');
        }
        const { id, email } = user;
        const { accessToken, refreshToken } = await this.getTokens(id, email);
        await this.updateRefreshToken(id, refreshToken);
        return {
            accessToken,
            refreshToken,
        };
    }
    async loginGoogle(loginGoogleDto) {
        const { access_token } = loginGoogleDto;
        const googleUserUrl = `https://www.googleapis.com/oauth2/v2/userinfo`;
        const googleUserConfig = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };
        let googleUserData;
        try {
            const { data, status } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(googleUserUrl, googleUserConfig));
            if (status === 200) {
                googleUserData = data;
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
        catch (err) {
            const { response: { status, statusText }, } = err;
            switch (status) {
                case 401:
                    throw new common_1.UnauthorizedException(statusText);
                default:
                    throw new common_1.InternalServerErrorException({
                        message: 'Unexpected error occured',
                    });
            }
        }
        const { email, given_name, family_name, picture } = googleUserData;
        const user = await this.userRepo.findOne({
            where: { email: email },
            select: {
                id: true,
                email: true,
                password: true,
                active: true,
                firstName: true,
                lastName: true,
                avatar: true,
            },
        });
        if (!user) {
            const hashedPassword = await hash_service_1.HashService.generateHash('password');
            const newUser = this.userRepo.create({
                firstName: given_name,
                lastName: family_name,
                email,
                password: hashedPassword,
                avatar: picture,
                mobileNumber: '',
                role: email === 'kireew.vladislaw@gmail.com' ? 'admin' : 'user',
            });
            const cart = new cart_entity_1.Cart();
            const favourite = new favourite_entity_1.Favourite();
            newUser.cart = cart;
            newUser.favourite = favourite;
            try {
                await this.userRepo.save(newUser);
                const { id } = newUser;
                const { accessToken, refreshToken } = await this.getTokens(id, email);
                await this.updateRefreshToken(id, refreshToken);
                return {
                    accessToken,
                    refreshToken,
                };
            }
            catch (e) {
                if (e.code === constants_1.duplicateKeyStatusCode) {
                    throw new common_1.ConflictException('User with email already exist');
                }
                else {
                    throw new common_1.InternalServerErrorException('Internal server error');
                }
            }
        }
        if (!user.active) {
            throw new common_1.ForbiddenException('User is not available or diactivated');
        }
        const { id } = user;
        const { accessToken, refreshToken } = await this.getTokens(id, email);
        await this.updateRefreshToken(id, refreshToken);
        return {
            accessToken,
            refreshToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        users_service_1.UsersService,
        config_1.ConfigService,
        axios_1.HttpService])
], AuthService);
//# sourceMappingURL=auth.service.js.map