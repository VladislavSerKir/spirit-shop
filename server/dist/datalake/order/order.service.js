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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../user/entities/user.entity");
const cart_entity_1 = require("../cart/entities/cart.entity");
const order_entity_1 = require("./entities/order.entity");
const cart_item_entity_1 = require("../cart/entities/cart-item.entity");
const config_1 = require("@nestjs/config");
let OrderService = class OrderService {
    constructor(configService, orderRepo, cartRepo, userRepo, cartItemRepo, jwtService) {
        this.configService = configService;
        this.orderRepo = orderRepo;
        this.cartRepo = cartRepo;
        this.userRepo = userRepo;
        this.cartItemRepo = cartItemRepo;
        this.jwtService = jwtService;
    }
    async getUserOrders(accessToken) {
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const user = await this.userRepo.findOne({
            where: { email: username },
            select: { id: true },
        });
        if (!user) {
            throw new common_1.BadRequestException('User does not exist');
        }
        const userOrders = await this.orderRepo.find({
            where: { user: user },
            relations: ['purchase', 'purchase.product'],
            select: {
                id: true,
                createdAt: true,
                number: true,
                isNeedDelivery: true,
                isNeedPackage: true,
                comment: true,
                purchase: {
                    quantity: true,
                    product: {
                        name: true,
                        createdAt: true,
                        image: true,
                        price: true,
                    },
                },
            },
        });
        return userOrders;
    }
    async purchaseOrder(accessToken, createOrderDto) {
        const { comment, isNeedDelivery, isNeedPackage } = createOrderDto;
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const user = await this.userRepo.findOne({
            where: { email: username },
            relations: ['cart', 'cart.cartItem', 'cart.cartItem.product'],
            select: {
                id: true,
                cart: {
                    id: true,
                    cartItem: {
                        id: true,
                        product: {
                            id: true,
                        },
                    },
                },
            },
        });
        if (!user.cart.cartItem.length) {
            throw new Error('Cart is empty');
        }
        const cartItemIds = user.cart.cartItem.map((item) => item.id);
        const userCartItems = await this.cartItemRepo.find({
            where: {
                id: (0, typeorm_2.In)(cartItemIds),
            },
            relations: ['product'],
            select: {
                id: true,
                quantity: true,
                product: {
                    id: true,
                    image: true,
                    price: true,
                    name: true,
                },
            },
        });
        const newOrder = this.orderRepo.create({
            user: user,
            comment,
            isNeedDelivery,
            isNeedPackage,
            purchase: userCartItems.map((item) => {
                return item;
            }),
        });
        try {
            const savedOrder = await this.orderRepo.save(newOrder);
            const { id, number, isNeedPackage, isNeedDelivery, comment, purchase, createdAt, } = savedOrder;
            const updatedCart = await this.cartRepo.findOne({
                where: { id: user.cart.id },
                relations: ['cartItem'],
                select: {
                    id: true,
                    cartItem: {
                        id: true,
                        quantity: true,
                        product: { id: true, image: true, price: true, name: true },
                    },
                },
            });
            updatedCart.cartItem = [];
            await this.cartRepo.save(updatedCart);
            if (!updatedCart) {
                throw new common_1.BadRequestException('Error set bucket to null');
            }
            return {
                id,
                number,
                isNeedPackage,
                isNeedDelivery,
                comment,
                purchase,
                createdAt,
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Internal server error');
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], OrderService);
//# sourceMappingURL=order.service.js.map