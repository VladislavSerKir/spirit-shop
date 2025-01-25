"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const review_entity_1 = require("./entities/review.entity");
const review_controller_1 = require("./review.controller");
const review_service_1 = require("./review.service");
const users_module_1 = require("../user/users.module");
const product_module_1 = require("../product/product.module");
const order_module_1 = require("../order/order.module");
let ReviewModule = class ReviewModule {
};
exports.ReviewModule = ReviewModule;
exports.ReviewModule = ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: 'access-secret',
                signOptions: { expiresIn: '1d' },
            }),
            typeorm_1.TypeOrmModule.forFeature([review_entity_1.Review]),
            product_module_1.ProductModule,
            users_module_1.UsersModule,
            order_module_1.OrderModule,
        ],
        controllers: [review_controller_1.ReviewController],
        providers: [review_service_1.ReviewService],
        exports: [typeorm_1.TypeOrmModule],
    })
], ReviewModule);
//# sourceMappingURL=review.module.js.map