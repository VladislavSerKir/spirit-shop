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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const product_entity_1 = require("../product/entities/product.entity");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../user/entities/user.entity");
const cart_item_entity_1 = require("./entities/cart-item.entity");
const config_1 = require("@nestjs/config");
let CartService = class CartService {
    constructor(configService, cartRepo, userRepo, productRepo, cartItemRepo, jwtService) {
        this.configService = configService;
        this.cartRepo = cartRepo;
        this.userRepo = userRepo;
        this.productRepo = productRepo;
        this.cartItemRepo = cartItemRepo;
        this.jwtService = jwtService;
    }
    async getAllProducts() {
        const products = await this.cartRepo.find({
            relations: { cartItem: true },
        });
        if (!products) {
            throw new common_1.NotFoundException('Error fetching products');
        }
        else {
            return products;
        }
    }
    async getUserCart(accessToken) {
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const user = await this.userRepo.findOne({
            where: { email: username },
            relations: ['cart'],
        });
        const cart = await this.cartRepo.findOne({
            where: { id: user.cart.id },
            relations: [
                'cartItem',
                'cartItem.product',
                'cartItem.product.categories',
            ],
            select: {
                id: true,
                cartItem: {
                    id: true,
                    quantity: true,
                    product: {
                        id: true,
                        name: true,
                        image: true,
                        price: true,
                        description: true,
                        categories: {
                            id: true,
                        },
                    },
                },
            },
        });
        if (!cart) {
            throw new common_1.NotFoundException('Error fetching cart');
        }
        else {
            return cart;
        }
    }
    async addToCart(accessToken, product) {
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const user = await this.userRepo.findOne({
            where: { email: username },
            relations: ['cart'],
            select: {
                id: true,
                cart: {
                    id: true,
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User does not exist');
        }
        const existingProduct = await this.productRepo.findOne({
            where: {
                id: product.id,
            },
            relations: ['categories'],
            select: {
                id: true,
                name: true,
                image: true,
                price: true,
                description: true,
                categories: {
                    id: true,
                },
            },
        });
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        const cart = await this.cartRepo.findOne({
            where: { id: user.cart.id },
            relations: [
                'cartItem',
                'cartItem.product',
                'cartItem.product.categories',
            ],
            select: {
                id: true,
                cartItem: {
                    id: true,
                    quantity: true,
                    product: {
                        id: true,
                        name: true,
                        image: true,
                        price: true,
                        description: true,
                        categories: {
                            id: true,
                        },
                    },
                },
            },
        });
        if (!cart) {
            throw new Error('Cart not found');
        }
        let cartItem = cart.cartItem.find((item) => item.product.id === existingProduct.id);
        if (cartItem) {
            cartItem.quantity += 1;
        }
        else {
            cartItem = new cart_item_entity_1.CartItem();
            cartItem.product = existingProduct;
            cartItem.quantity = 1;
            cart.cartItem.push(cartItem);
        }
        await this.cartRepo.save(cart);
        return cart.cartItem;
    }
    async removeFromCart(accessToken, product) {
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const user = await this.userRepo.findOne({
            where: { email: username },
            relations: ['cart'],
            select: {
                id: true,
                cart: {
                    id: true,
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User does not exist');
        }
        const existingProduct = await this.productRepo.findOne({
            where: {
                id: product.id,
            },
            select: {
                id: true,
            },
        });
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        const cart = await this.cartRepo.findOne({
            where: { id: user.cart.id },
            relations: [
                'cartItem',
                'cartItem.product',
                'cartItem.product.categories',
            ],
            select: {
                id: true,
                cartItem: {
                    id: true,
                    quantity: true,
                    product: {
                        id: true,
                        name: true,
                        image: true,
                        price: true,
                        description: true,
                        categories: {
                            id: true,
                        },
                    },
                },
            },
        });
        if (!cart) {
            throw new Error('Cart not found');
        }
        let cartItem = cart.cartItem.find((item) => item.product.id === existingProduct.id);
        if (cartItem && cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        }
        else {
            cart.cartItem = cart.cartItem.filter((item) => item.id !== cartItem.id);
        }
        await this.cartRepo.save(cart);
        return cart.cartItem;
    }
    async clearCart(accessToken) {
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const user = await this.userRepo.findOne({
            where: { email: username },
            relations: ['cart', 'cart.cartItem'],
            select: {
                id: true,
                cart: {
                    id: true,
                    cartItem: {
                        id: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Пользователя не существует');
        }
        if (!user.cart.cartItem.length) {
            throw new common_1.BadRequestException('В корзине ничего нет');
        }
        await this.cartItemRepo.delete({ cart: user.cart });
        return { success: true };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(4, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], CartService);
//# sourceMappingURL=cart.service.js.map