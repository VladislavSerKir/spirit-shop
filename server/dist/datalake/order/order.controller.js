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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const access_token_guard_1 = require("../../config/access-token.guard");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const order_entity_1 = require("./entities/order.entity");
const swagger_1 = require("@nestjs/swagger");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    getUserOrders(request) {
        const accessToken = request.headers.authorization;
        return this.orderService.getUserOrders(accessToken);
    }
    purchaseOrder(request, createOrderDto) {
        const accessToken = request.headers.authorization;
        return this.orderService.purchaseOrder(accessToken, createOrderDto);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение всех заказов пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат всех заказов пользователя',
        type: order_entity_1.Order,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserOrders", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)('/purchase'),
    (0, swagger_1.ApiOperation)({ summary: 'Покупка на основании корзины' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Возврат покупки',
        type: order_entity_1.Order,
    }),
    (0, swagger_1.ApiBody)({
        type: create_order_dto_1.CreateOrderDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "purchaseOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('order'),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map