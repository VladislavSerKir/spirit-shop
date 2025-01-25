"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./datalake/user/entities/user.entity");
const core_1 = require("@nestjs/core");
const users_module_1 = require("./datalake/user/users.module");
const auth_module_1 = require("./datalake/auth/auth.module");
const nestjs_pino_1 = require("nestjs-pino");
const product_module_1 = require("./datalake/product/product.module");
const product_entity_1 = require("./datalake/product/entities/product.entity");
const category_entity_1 = require("./datalake/category/entities/category.entity");
const category_module_1 = require("./datalake/category/category.module");
const cart_entity_1 = require("./datalake/cart/entities/cart.entity");
const cart_module_1 = require("./datalake/cart/cart.module");
const cart_item_entity_1 = require("./datalake/cart/entities/cart-item.entity");
const order_entity_1 = require("./datalake/order/entities/order.entity");
const order_module_1 = require("./datalake/order/order.module");
const favourite_entity_1 = require("./datalake/product/entities/favourite.entity");
const review_entity_1 = require("./datalake/review/entities/review.entity");
const review_module_1 = require("./datalake/review/review.module");
const service_module_1 = require("./datalake/service/service.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                envFilePath: `.env`,
            }),
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    customProps: () => ({
                        context: 'HTTP',
                    }),
                    transport: {
                        target: 'pino-pretty',
                        options: {
                            singleLine: true,
                        },
                    },
                },
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT, 10),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                entities: [
                    user_entity_1.User,
                    product_entity_1.Product,
                    category_entity_1.Category,
                    cart_entity_1.Cart,
                    cart_item_entity_1.CartItem,
                    order_entity_1.Order,
                    favourite_entity_1.Favourite,
                    review_entity_1.Review,
                ],
                synchronize: true,
            }),
            nest_winston_1.WinstonModule.forRoot({
                levels: {
                    critical_error: 0,
                    error: 1,
                    special_warning: 2,
                    another_log_level: 3,
                    info: 4,
                },
                transports: [
                    new winston.transports.Console({ format: winston.format.simple() }),
                    new winston.transports.File({ filename: 'error.log', level: 'error' }),
                ],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            product_module_1.ProductModule,
            category_module_1.CategoryModule,
            cart_module_1.CartModule,
            order_module_1.OrderModule,
            review_module_1.ReviewModule,
            service_module_1.ServiceModule,
        ],
        providers: [
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                }),
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map