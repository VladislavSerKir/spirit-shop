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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const access_token_guard_1 = require("../../config/access-token.guard");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const users_service_1 = require("./users.service");
const find_user_dto_1 = require("./dto/find-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const edit_avatar_dto_1 = require("./dto/edit-avatar.dto");
const assign_admin_dto_1 = require("./dto/assign-admin.dto");
const manage_account_dto_1 = require("./dto/manage-account.dto");
const interfaces_1 = require("../../common/types/interfaces");
const swagger_1 = require("@nestjs/swagger");
const hide_profile_dto_1 = require("./dto/hide-profile.dto");
const period_statistics_dto_1 = require("./dto/period-statistics.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getProfileInfo(user) {
        return this.usersService.getProfileInfo(user.email);
    }
    getShopStatisticsInfo(request) {
        const accessToken = request.headers.authorization;
        return this.usersService.getShopStatisticsInfo(accessToken);
    }
    getShopStatisticsPeriodInfo(request, getStatisticsPeriodDto) {
        const accessToken = request.headers.authorization;
        return this.usersService.getShopStatisticsPeriodInfo(accessToken, getStatisticsPeriodDto);
    }
    getUsers(request) {
        const accessToken = request.headers.authorization;
        return this.usersService.getUsers(accessToken);
    }
    getBasicUserInfo(id, request) {
        const accessToken = request.headers.authorization;
        return this.usersService.getBasicUserInfo(+id, accessToken);
    }
    editProfile(request, updateUserDto) {
        const accessToken = request.headers.authorization;
        return this.usersService.editProfile(accessToken, updateUserDto);
    }
    updateToken(id, updateUserDto) {
        return this.usersService.updateToken(id, updateUserDto);
    }
    findUserInfo(findUserDto) {
        return this.usersService.findUserInfo(findUserDto);
    }
    editAvatar(request, editAvatarDto) {
        const accessToken = request.headers.authorization;
        return this.usersService.editAvatar(accessToken, editAvatarDto);
    }
    manageAdmin(request, assignAdminDto) {
        const accessToken = request.headers.authorization;
        return this.usersService.manageAdmin(accessToken, assignAdminDto);
    }
    manageAccount(request, manageAccountDto) {
        const accessToken = request.headers.authorization;
        return this.usersService.manageAccount(accessToken, manageAccountDto);
    }
    hideAccount(request, hideProfileDto) {
        const accessToken = request.headers.authorization;
        return this.usersService.hideAccount(accessToken, hideProfileDto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('/profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение данных пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат профиля',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfileInfo", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('/statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение админом основной аналитики магазина' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат аналитики магазина админу',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "getShopStatisticsInfo", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)('/period'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение админом аналитики магазина за период' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат аналитики магазина админу',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, period_statistics_dto_1.GetStatisticsPeriodDto]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "getShopStatisticsPeriodInfo", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('/users'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение всех пользователей' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат всех пользователей',
        type: (Array),
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение основной аналитики пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат аналитики пользователя',
        type: interfaces_1.BasicUserInfoResponse || interfaces_1.BasicUserInfoHiddenResponse,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getBasicUserInfo", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Изменение данных пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат обновленного пользователя',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiBody)({
        type: update_user_dto_1.UpdateUserDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editProfile", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Изменение данных пользователя по индентификатору' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат обновленного пользователя',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiBody)({
        type: update_user_dto_1.UpdateUserDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateToken", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)('/find'),
    (0, swagger_1.ApiOperation)({ summary: 'Найти пользователей' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Возврат найденных пользователей',
        type: (Array),
    }),
    (0, swagger_1.ApiBody)({
        type: find_user_dto_1.FindUserDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_dto_1.FindUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUserInfo", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Put)('/avatar'),
    (0, swagger_1.ApiOperation)({ summary: 'Изменить аватар пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат обновленного пользователя',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiBody)({
        type: edit_avatar_dto_1.EditAvatarDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_avatar_dto_1.EditAvatarDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editAvatar", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Put)('/admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Назаначить админом' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат обновленного пользователя',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiBody)({
        type: assign_admin_dto_1.AssignAdminDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, assign_admin_dto_1.AssignAdminDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "manageAdmin", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Put)('/active'),
    (0, swagger_1.ApiOperation)({ summary: 'Управление состоянием аккаунта' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат обновленного пользователя',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiBody)({
        type: manage_account_dto_1.ManageAccountDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, manage_account_dto_1.ManageAccountDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "manageAccount", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Put)('/hide'),
    (0, swagger_1.ApiOperation)({ summary: 'Управление видимостью аккаунта' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат состояния видимости',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiBody)({
        type: hide_profile_dto_1.HideProfileDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, hide_profile_dto_1.HideProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "hideAccount", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map