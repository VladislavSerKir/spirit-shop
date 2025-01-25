"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../user/entities/user.entity");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../user/users.service");
const jwt_strategy_1 = require("../../config/jwt-strategy");
const passport_1 = require("@nestjs/passport");
const yandex_strategy_1 = require("../../config/yandex.strategy");
const axios_1 = require("@nestjs/axios");
const google_strategy_1 = require("../../config/google.strategy");
const hash_module_1 = require("../../common/hash/hash.module");
const users_module_1 = require("../user/users.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            axios_1.HttpModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.register({
                secret: 'access-secret',
                signOptions: { expiresIn: '1d' },
            }),
            users_module_1.UsersModule,
            hash_module_1.HashModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            users_service_1.UsersService,
            jwt_strategy_1.JwtStrategy,
            yandex_strategy_1.YandexAuthStrategy,
            google_strategy_1.GoogleStrategy,
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map