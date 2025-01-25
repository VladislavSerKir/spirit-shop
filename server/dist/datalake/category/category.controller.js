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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const category_entity_1 = require("./entities/category.entity");
const create_category_dto_1 = require("./dto/create-category.dto");
const delete_category_dto_1 = require("./dto/delete-category.dto");
const interfaces_1 = require("../../common/types/interfaces");
const access_token_guard_1 = require("../../config/access-token.guard");
const edit_category_dto_1 = require("./dto/edit-category.dto");
const swagger_1 = require("@nestjs/swagger");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getCategoriesInfo() {
        return this.categoryService.getAllCategories();
    }
    async createCategory(request, createCategoryDto) {
        const accessToken = request.headers.authorization;
        return this.categoryService.createCategory(createCategoryDto, accessToken);
    }
    async editCategory(request, editCategoryDto) {
        const accessToken = request.headers.authorization;
        return this.categoryService.editCategory(editCategoryDto, accessToken);
    }
    async deleteCategory(request, deleteCategoryDto) {
        const accessToken = request.headers.authorization;
        return this.categoryService.deleteCategory(deleteCategoryDto, accessToken);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение всех категорий' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат категорий',
        type: category_entity_1.Category,
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoriesInfo", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiOperation)({ summary: 'Создать категорию' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Возврат категории',
        type: category_entity_1.Category,
    }),
    (0, swagger_1.ApiBody)({
        type: create_category_dto_1.CreateCategoryDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/edit'),
    (0, swagger_1.ApiOperation)({ summary: 'Изменить категорию' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат измененной категории',
        type: category_entity_1.Category,
    }),
    (0, swagger_1.ApiBody)({
        type: edit_category_dto_1.EditCategoryDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_category_dto_1.EditCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "editCategory", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Delete)('/delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить категорию' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат индентификатора удаленной категории',
        type: interfaces_1.RemoveCategory,
    }),
    (0, swagger_1.ApiBody)({
        type: delete_category_dto_1.DeleteCategoryDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, delete_category_dto_1.DeleteCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)('category'),
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map