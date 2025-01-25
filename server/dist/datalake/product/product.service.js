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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const category_entity_1 = require("../category/entities/category.entity");
const favourite_entity_1 = require("./entities/favourite.entity");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../user/entities/user.entity");
const users_service_1 = require("../user/users.service");
const config_1 = require("@nestjs/config");
let ProductService = class ProductService {
    constructor(configService, usersService, productRepo, categoryRepo, favouriteRepo, userRepo, jwtService) {
        this.configService = configService;
        this.usersService = usersService;
        this.productRepo = productRepo;
        this.categoryRepo = categoryRepo;
        this.favouriteRepo = favouriteRepo;
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async getAllProducts() {
        const products = await this.productRepo.find({
            relations: ['categories', 'favourites.user'],
            select: {
                id: true,
                description: true,
                image: true,
                name: true,
                price: true,
                categories: {
                    id: true,
                    name: true,
                },
                favourites: {
                    id: true,
                    user: {
                        id: true,
                    },
                },
            },
        });
        if (!products) {
            throw new common_1.NotFoundException('Error fetching products');
        }
        else {
            return products;
        }
    }
    async createProduct(createProductDto, accessToken) {
        const currentUserIsAdmin = await this.usersService.hasAdminRole(accessToken);
        if (!currentUserIsAdmin) {
            throw new common_1.ForbiddenException('This action only available for admins');
        }
        const { name, description, image, price, categories } = createProductDto;
        const categoryIds = categories.map((category) => category);
        const newProduct = await this.productRepo.create({
            name,
            description,
            image,
            price: +price,
            categories: categoryIds,
        });
        try {
            const savedProduct = await this.productRepo.save(newProduct);
            return savedProduct;
        }
        catch (_a) {
            throw new common_1.BadRequestException(`Request did not work`);
        }
    }
    async editProduct(editProductDto, accessToken) {
        const currentUserIsAdmin = await this.usersService.hasAdminRole(accessToken);
        if (!currentUserIsAdmin) {
            throw new common_1.ForbiddenException('This action only available for admins');
        }
        const { name, description, image, price, categories, id } = editProductDto;
        const existingProduct = await this.productRepo.findOne({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                image: true,
                price: true,
                categories: {
                    id: true,
                    name: true,
                },
            },
        });
        if (!existingProduct) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        const categoryIds = categories.map((category) => category.id);
        const updatedCategories = await this.categoryRepo.find({
            where: {
                id: (0, typeorm_2.In)(categoryIds),
            },
            select: {
                id: true,
                name: true,
            },
        });
        existingProduct.name = name;
        existingProduct.description = description;
        existingProduct.image = image;
        existingProduct.price = +price;
        existingProduct.categories = updatedCategories;
        try {
            await this.productRepo.save(existingProduct);
            return Object.assign({}, existingProduct);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error product updating');
        }
    }
    async deleteProduct(deleteProductDto, accessToken) {
        const currentUserIsAdmin = await this.usersService.hasAdminRole(accessToken);
        if (!currentUserIsAdmin) {
            throw new common_1.ForbiddenException('This action only available for admins');
        }
        const { id } = deleteProductDto;
        try {
            await this.productRepo.delete(String(id));
            return { id };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(`Server error: ${e}`);
        }
    }
    async likeProduct(accessToken, likeDislikeProductDto) {
        const { id } = likeDislikeProductDto;
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const user = await this.userRepo.findOne({
            where: { email: username },
            relations: ['favourite'],
            select: {
                id: true,
                favourite: {
                    id: true,
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User does not exist');
        }
        const favourite = await this.favouriteRepo.findOne({
            where: {
                id: user.favourite.id,
            },
            relations: ['products'],
            select: {
                id: true,
                products: {
                    id: true,
                },
            },
        });
        const product = await this.productRepo.findOne({
            where: {
                id,
            },
            relations: ['categories'],
            select: {
                id: true,
                name: true,
                price: true,
                image: true,
                categories: {
                    id: true,
                    name: true,
                },
            },
        });
        favourite.products = [...(favourite.products || []), product];
        try {
            await this.favouriteRepo.save(favourite);
            return product;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(`Server error: ${e}`);
        }
    }
    async dislikeProduct(accessToken, likeDislikeProductDto) {
        const { id } = likeDislikeProductDto;
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const user = await this.userRepo.findOne({
            where: { email: username },
            relations: ['favourite'],
            select: {
                id: true,
                favourite: {
                    id: true,
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User does not exist');
        }
        const favourite = await this.favouriteRepo.findOne({
            where: {
                id: user.favourite.id,
            },
            relations: ['products'],
            select: {
                id: true,
                products: {
                    id: true,
                },
            },
        });
        favourite.products = favourite.products.filter((product) => product.id !== id);
        try {
            await this.favouriteRepo.save(favourite);
            return id;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(`Server error: ${e}`);
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(4, (0, typeorm_1.InjectRepository)(favourite_entity_1.Favourite)),
    __param(5, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], ProductService);
//# sourceMappingURL=product.service.js.map