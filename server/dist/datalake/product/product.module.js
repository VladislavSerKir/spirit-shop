"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
const category_module_1 = require("../category/category.module");
const favourite_entity_1 = require("./entities/favourite.entity");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../user/users.service");
const users_module_1 = require("../user/users.module");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: 'access-secret',
                signOptions: { expiresIn: '1d' },
            }),
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, favourite_entity_1.Favourite]),
            category_module_1.CategoryModule,
            users_module_1.UsersModule,
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService, users_service_1.UsersService],
        exports: [typeorm_1.TypeOrmModule],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map