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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../user/users.service");
let CategoryService = class CategoryService {
    constructor(usersService, categoryRepo) {
        this.usersService = usersService;
        this.categoryRepo = categoryRepo;
    }
    async getAllCategories() {
        const categories = await this.categoryRepo.find({
            select: {
                id: true,
                name: true,
            },
        });
        if (!categories) {
            throw new common_1.NotFoundException('Error fetch categories');
        }
        else {
            return categories;
        }
    }
    async createCategory(createCategoryDto, accessToken) {
        const currentUserIsAdmin = await this.usersService.hasAdminRole(accessToken);
        if (!currentUserIsAdmin) {
            throw new common_1.ForbiddenException('This action only available for admins');
        }
        const { name } = createCategoryDto;
        const newCategory = await this.categoryRepo.create({ name });
        try {
            const savedCategory = await this.categoryRepo.save(newCategory);
            return savedCategory;
        }
        catch (_a) {
            throw new common_1.BadRequestException(`Request did not work`);
        }
    }
    async editCategory(editCategoryDto, accessToken) {
        const currentUserIsAdmin = await this.usersService.hasAdminRole(accessToken);
        if (!currentUserIsAdmin) {
            throw new common_1.ForbiddenException('This action only available for admins');
        }
        const { name, id } = editCategoryDto;
        const updatedCategory = await this.categoryRepo.update({ id }, { name });
        if (!updatedCategory) {
            throw new common_1.BadRequestException('Error change category request');
        }
        else {
            return { name, id };
        }
    }
    async deleteCategory(deleteCategoryDto, accessToken) {
        const currentUserIsAdmin = await this.usersService.hasAdminRole(accessToken);
        if (!currentUserIsAdmin) {
            throw new common_1.ForbiddenException('This action only available for admins');
        }
        const { id } = deleteCategoryDto;
        try {
            await this.categoryRepo.delete(String(id));
            return { id };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(`Server error: ${e}`);
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map