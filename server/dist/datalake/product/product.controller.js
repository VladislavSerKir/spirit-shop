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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const access_token_guard_1 = require("../../config/access-token.guard");
const product_entity_1 = require("./entities/product.entity");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const delete_product_dto_1 = require("./dto/delete-product.dto");
const interfaces_1 = require("../../common/types/interfaces");
const edit_product_dto_1 = require("./dto/edit-product.dto");
const like_dislike_product_dto_1 = require("./dto/like-dislike-product.dto");
const swagger_1 = require("@nestjs/swagger");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getProfileInfo() {
        return this.productService.getAllProducts();
    }
    async createProduct(request, createProductDto) {
        const accessToken = request.headers.authorization;
        return this.productService.createProduct(createProductDto, accessToken);
    }
    async editProduct(request, editProductDto) {
        const accessToken = request.headers.authorization;
        return this.productService.editProduct(editProductDto, accessToken);
    }
    async deleteProduct(request, deleteProductDto) {
        const accessToken = request.headers.authorization;
        return this.productService.deleteProduct(deleteProductDto, accessToken);
    }
    async likeProduct(request, likeDislikeProductDto) {
        const accessToken = request.headers.authorization;
        return this.productService.likeProduct(accessToken, likeDislikeProductDto);
    }
    async dislikeProduct(request, likeDislikeProductDto) {
        const accessToken = request.headers.authorization;
        return this.productService.dislikeProduct(accessToken, likeDislikeProductDto);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение всех продуктов' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат всех продуктов',
        type: product_entity_1.Product,
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProfileInfo", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiOperation)({ summary: 'Создать продукт' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Возврат созданного продукта',
        type: product_entity_1.Product,
    }),
    (0, swagger_1.ApiBody)({
        type: create_product_dto_1.CreateProductDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/edit'),
    (0, swagger_1.ApiOperation)({ summary: 'Изменить продукт' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат изменного продукта',
        type: product_entity_1.Product,
    }),
    (0, swagger_1.ApiBody)({
        type: edit_product_dto_1.EditProductDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_product_dto_1.EditProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "editProduct", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Delete)('/delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить продукт' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат индентификатора удаленного продукта',
        type: interfaces_1.RemoveProduct,
    }),
    (0, swagger_1.ApiBody)({
        type: delete_product_dto_1.DeleteProductDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, delete_product_dto_1.DeleteProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/like'),
    (0, swagger_1.ApiOperation)({ summary: 'Добавить продукт в избранное' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат продукта',
        type: product_entity_1.Product,
    }),
    (0, swagger_1.ApiBody)({
        type: like_dislike_product_dto_1.LikeDislikeProductDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, like_dislike_product_dto_1.LikeDislikeProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "likeProduct", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/dislike'),
    (0, swagger_1.ApiOperation)({ summary: 'Убрать продукт из избранного' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат индентификатора удаляемого из избранного продукта',
    }),
    (0, swagger_1.ApiBody)({
        type: like_dislike_product_dto_1.LikeDislikeProductDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, like_dislike_product_dto_1.LikeDislikeProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "dislikeProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('product'),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map