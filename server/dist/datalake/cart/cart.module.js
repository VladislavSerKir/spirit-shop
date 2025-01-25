"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const cart_controller_1 = require("./cart.controller");
const cart_service_1 = require("./cart.service");
const users_module_1 = require("../user/users.module");
const jwt_1 = require("@nestjs/jwt");
const product_module_1 = require("../product/product.module");
const cart_item_entity_1 = require("./entities/cart-item.entity");
let CartModule = class CartModule {
};
exports.CartModule = CartModule;
exports.CartModule = CartModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: 'access-secret',
                signOptions: { expiresIn: '1d' },
            }),
            typeorm_1.TypeOrmModule.forFeature([cart_entity_1.Cart, cart_item_entity_1.CartItem]),
            users_module_1.UsersModule,
            product_module_1.ProductModule,
        ],
        controllers: [cart_controller_1.CartController],
        providers: [cart_service_1.CartService],
        exports: [typeorm_1.TypeOrmModule],
    })
], CartModule);
//# sourceMappingURL=cart.module.js.map