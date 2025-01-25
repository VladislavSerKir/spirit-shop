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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const access_token_guard_1 = require("../../config/access-token.guard");
const cart_service_1 = require("./cart.service");
const cart_entity_1 = require("./entities/cart.entity");
const add_to_cart_dto_1 = require("./dto/add-to-cart.dto");
const interfaces_1 = require("../../common/types/interfaces");
const cart_item_entity_1 = require("./entities/cart-item.entity");
const swagger_1 = require("@nestjs/swagger");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    getProfileInfo() {
        return this.cartService.getAllProducts();
    }
    getUserCart(request) {
        const accessToken = request.headers.authorization;
        return this.cartService.getUserCart(accessToken);
    }
    addToCart(request, addToCartDto) {
        const accessToken = request.headers.authorization;
        return this.cartService.addToCart(accessToken, addToCartDto);
    }
    removeFromCart(request, addToCartDto) {
        const accessToken = request.headers.authorization;
        return this.cartService.removeFromCart(accessToken, addToCartDto);
    }
    clearCart(request) {
        const accessToken = request.headers.authorization;
        return this.cartService.clearCart(accessToken);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение всех корзин всех пользователей' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат всех корзин',
        type: cart_entity_1.Cart,
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getProfileInfo", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('/cart'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение корзины пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат корзины пользователя',
        type: cart_entity_1.Cart,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getUserCart", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/add'),
    (0, swagger_1.ApiOperation)({ summary: 'Добавить продукт в корзину' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат обновленной корзины',
        type: cart_item_entity_1.CartItem,
    }),
    (0, swagger_1.ApiBody)({
        type: add_to_cart_dto_1.AddToCartDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/remove'),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить продукт из корзины' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат наименований корзины',
        type: cart_item_entity_1.CartItem,
    }),
    (0, swagger_1.ApiBody)({
        type: add_to_cart_dto_1.AddToCartDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Delete)('/clear'),
    (0, swagger_1.ApiOperation)({ summary: 'Очистить корзину' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат результата операции',
        type: interfaces_1.SuccessResponse,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clearCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('cart'),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map