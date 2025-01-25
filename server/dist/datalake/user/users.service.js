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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const hash_service_1 = require("../../common/hash/hash.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const order_entity_1 = require("../order/entities/order.entity");
const review_entity_1 = require("../review/entities/review.entity");
const cart_item_entity_1 = require("../cart/entities/cart-item.entity");
const category_entity_1 = require("../category/entities/category.entity");
const product_entity_1 = require("../product/entities/product.entity");
let UsersService = class UsersService {
    constructor(jwtService, configService, orderRepo, reviewRepo, cartItemRepo, userRepo, categoryRepo, productRepo) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.orderRepo = orderRepo;
        this.reviewRepo = reviewRepo;
        this.cartItemRepo = cartItemRepo;
        this.userRepo = userRepo;
        this.categoryRepo = categoryRepo;
        this.productRepo = productRepo;
    }
    async getProfileInfo(email) {
        const user = await this.userRepo.findOne({
            where: { email },
        });
        if (!user) {
            throw new common_1.NotFoundException('Error profile fetching');
        }
        else if (!user.active) {
            throw new common_1.ForbiddenException('User is not available or diactivated');
        }
        else {
            return user;
        }
    }
    async getBasicUserInfo(id, accessToken) {
        if (isNaN(id)) {
            throw new common_1.BadRequestException('Invalid user ID');
        }
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const currentUser = await this.userRepo.findOne({
            where: { email: username },
            select: {
                id: true,
                email: true,
            },
        });
        const user = await this.userRepo.findOne({
            where: { id },
            select: {
                id: true,
                email: true,
                createdAt: true,
                firstName: true,
                lastName: true,
                avatar: true,
                hideProfile: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Error profile fetching');
        }
        const firstOrder = await this.orderRepo.findOne({
            where: { user: { id } },
            order: { createdAt: 'ASC' },
        });
        const orderCount = await this.orderRepo.count({
            where: { user: { id } },
        });
        const reviewCount = await this.reviewRepo.count({
            where: { user: { id } },
        });
        const reviews = await this.reviewRepo.find({
            where: { user: { id } },
            relations: ['helpful'],
        });
        const reviewHelpfulCount = reviews.filter((review) => review.helpful.length > 0).length;
        const boughtProductCount = await this.cartItemRepo
            .createQueryBuilder('cartItem')
            .innerJoin('cartItem.purchase', 'order')
            .where('order.userId = :id', { id })
            .select('SUM(cartItem.quantity)', 'total')
            .getRawOne();
        const buyableProduct = await this.cartItemRepo
            .createQueryBuilder('cartItem')
            .innerJoin('cartItem.purchase', 'order')
            .innerJoin('cartItem.product', 'product')
            .where('order.userId = :id', { id })
            .select('product.name', 'name')
            .addSelect('product.image', 'image')
            .addSelect('SUM(cartItem.quantity)', 'times')
            .groupBy('product.id')
            .orderBy('times', 'DESC')
            .limit(1)
            .getRawOne();
        const userReviews = await this.reviewRepo.find({
            where: { user: { id } },
            relations: ['user', 'product', 'helpful'],
            select: {
                id: true,
                createdAt: true,
                rate: true,
                comment: true,
                user: {
                    id: true,
                },
                product: {
                    id: true,
                    name: true,
                    image: true,
                },
                helpful: {
                    email: true,
                },
            },
        });
        const userOrders = await this.cartItemRepo
            .createQueryBuilder('cartItem')
            .innerJoin('cartItem.purchase', 'order')
            .innerJoin('cartItem.product', 'product')
            .where('order.userId = :id', { id })
            .select([
            'product.id AS id',
            'product.name AS name',
            'product.image AS image',
            'product.price AS price',
            'SUM(cartItem.quantity) AS quantity',
        ])
            .groupBy('product.id')
            .orderBy('quantity', 'DESC')
            .getRawMany();
        if (user.hideProfile && currentUser.email !== user.email) {
            return {
                id: user.id,
                hideProfile: user.hideProfile,
            };
        }
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            hideProfile: user.hideProfile,
            whenRegistered: (user === null || user === void 0 ? void 0 : user.createdAt) ? user.createdAt : '',
            firstOrderDate: (firstOrder === null || firstOrder === void 0 ? void 0 : firstOrder.createdAt) ? firstOrder.createdAt : '',
            totalOrders: orderCount,
            totalReviews: reviewCount,
            helpfulReviews: reviewHelpfulCount,
            totalBoughtProducts: (boughtProductCount === null || boughtProductCount === void 0 ? void 0 : boughtProductCount.total)
                ? parseInt(boughtProductCount.total, 10)
                : 0,
            mostBuyableProduct: buyableProduct
                ? {
                    name: buyableProduct.name,
                    image: buyableProduct.image,
                    times: parseInt(buyableProduct.times, 10),
                }
                : null,
            userReviews,
            userOrders: userOrders.map((product) => ({
                id: product.id,
                quantity: parseInt(product.quantity, 10),
            })),
        };
    }
    async getUsers(accessToken) {
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        let users = await this.userRepo.find({
            select: [
                'id',
                'createdAt',
                'firstName',
                'lastName',
                'avatar',
                'email',
                'role',
                'active',
                'mobileNumber',
            ],
        });
        const currentUser = users.find((user) => user.email === username);
        if (currentUser.role !== 'admin' && currentUser.active) {
            throw new common_1.ForbiddenException('Show users only available for admins');
        }
        users = users.filter((user) => user.email !== username);
        return users;
    }
    async editProfile(accessToken, updateUserDto) {
        const { password, email } = updateUserDto;
        const userWithEmailExist = await this.userRepo.findOne({
            where: { email },
            select: {
                id: true,
                role: true,
            },
        });
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        if (userWithEmailExist && username !== email) {
            throw new common_1.BadRequestException('Email is not available');
        }
        if (password) {
            const hashedPassword = await hash_service_1.HashService.generateHash(password);
            updateUserDto = Object.assign(Object.assign({}, updateUserDto), { password: hashedPassword });
        }
        const updatedUser = await this.userRepo.update({ email: username }, updateUserDto);
        const user = await this.userRepo.findOne({
            where: { email: username },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                mobileNumber: true,
                active: true,
            },
        });
        if (!updatedUser) {
            throw new common_1.BadRequestException('Error profile change request');
        }
        else if (!user.active) {
            throw new common_1.ForbiddenException('User is not available or diactivated');
        }
        else {
            const { firstName, lastName, email, mobileNumber } = updateUserDto;
            return { firstName, lastName, email, mobileNumber };
        }
    }
    async editAvatar(accessToken, editAvatarDto) {
        const { avatar } = editAvatarDto;
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const updatedUser = await this.userRepo.update({ email: username }, { avatar });
        const user = await this.userRepo.findOne({
            where: { email: username },
            select: {
                active: true,
            },
        });
        if (!updatedUser) {
            throw new common_1.BadRequestException('Error avatar change request');
        }
        else if (!user.active) {
            throw new common_1.ForbiddenException('User is not available or diactivated');
        }
        else {
            const { avatar } = editAvatarDto;
            return { avatar };
        }
    }
    async updateToken(id, userData) {
        const updatedUser = await this.userRepo.update(id, userData);
        if (!updatedUser) {
            throw new common_1.BadRequestException('Error token change request');
        }
        else {
            return this.getUserById(id);
        }
    }
    async findByEmail(email) {
        const user = await this.userRepo.findOne({
            where: { email },
            select: {
                id: true,
                role: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with email: ${email} does not exist`);
        }
        else {
            return user;
        }
    }
    async findUserInfo({ query }) {
        const user = await this.userRepo.find({ where: { email: query } });
        if (!user) {
            throw new common_1.NotFoundException(`User ${query} does not exist`);
        }
        else {
            return user;
        }
    }
    async getUserById(id) {
        const user = await this.userRepo.findOne({
            where: { id },
            select: {
                id: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id: ${id} does not exist`);
        }
        else {
            return user;
        }
    }
    async getUserByEmail(email) {
        const user = await this.userRepo.findOne({
            where: { email },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with email: ${JSON.stringify(email)} does not exist`);
        }
        else {
            return user;
        }
    }
    async hasAdminRole(accessToken) {
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const user = await this.findByEmail(username);
        if (!user && user.role !== 'admin') {
            return false;
        }
        return true;
    }
    async manageAdmin(accessToken, assignAdminDto) {
        const currentUserIsAdmin = await this.hasAdminRole(accessToken);
        if (!currentUserIsAdmin) {
            throw new common_1.ForbiddenException('This action only available for admins');
        }
        const { role, id } = assignAdminDto;
        try {
            await this.userRepo.update({ id }, { role: role });
            return { role, id };
        }
        catch (error) {
            throw new common_1.BadRequestException('Error to assign admin');
        }
    }
    async manageAccount(accessToken, manageAccountDto) {
        const currentUserIsAdmin = await this.hasAdminRole(accessToken);
        if (!currentUserIsAdmin) {
            throw new common_1.ForbiddenException('This action only available for admins');
        }
        const { id, active } = manageAccountDto;
        try {
            await this.userRepo.update({ id }, { active: active });
            return { id, active };
        }
        catch (error) {
            throw new common_1.BadRequestException('Error to assign admin');
        }
    }
    async hideAccount(accessToken, hideProfileDto) {
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const user = await this.userRepo.findOne({
            where: { email: username },
            select: { id: true, active: true },
        });
        const updatedUser = await this.userRepo.update({ email: username }, hideProfileDto);
        if (!updatedUser) {
            throw new common_1.BadRequestException('Error profile change request');
        }
        else if (!user.active) {
            throw new common_1.ForbiddenException('User is not available or diactivated');
        }
        else {
            const { hideProfile } = hideProfileDto;
            return { hideProfile };
        }
    }
    async getShopStatisticsInfo(accessToken) {
        const currentUserIsAdmin = await this.hasAdminRole(accessToken);
        if (!currentUserIsAdmin) {
            throw new common_1.ForbiddenException('This action only available for admins');
        }
        const totalOrders = await this.orderRepo.count({
            select: {
                id: true,
            },
        });
        const totalBoughtProducts = await this.cartItemRepo
            .createQueryBuilder('cartItem')
            .innerJoin('cartItem.purchase', 'order')
            .select('SUM(cartItem.quantity)', 'total')
            .getRawOne();
        const totalRevenue = await this.cartItemRepo
            .createQueryBuilder('cartItem')
            .innerJoin('cartItem.product', 'product')
            .innerJoin('cartItem.purchase', 'order')
            .select('SUM(cartItem.quantity * product.price)', 'totalRevenue')
            .getRawOne();
        const formattedTotalRevenue = totalRevenue.totalRevenue
            ? +Number(totalRevenue.totalRevenue).toFixed(1)
            : 0;
        const averageOrderPrice = totalOrders > 0 ? formattedTotalRevenue / totalOrders : 0;
        const totalReviews = await this.reviewRepo.count({
            select: {
                id: true,
            },
        });
        const totalUsers = await this.userRepo.count({
            select: {
                id: true,
            },
        });
        const totalUsersActive = await this.userRepo.count({
            where: { active: true },
            select: {
                id: true,
            },
        });
        const totalProducts = await this.productRepo.count({
            select: {
                id: true,
            },
        });
        const totalCategories = await this.categoryRepo.count({
            select: {
                id: true,
            },
        });
        const productSalesData = await this.cartItemRepo
            .createQueryBuilder('cartItem')
            .innerJoinAndSelect('cartItem.product', 'product')
            .innerJoinAndSelect('cartItem.purchase', 'order')
            .select([
            'product.id AS id',
            'SUM(cartItem.quantity) AS bought',
            'SUM(cartItem.quantity * product.price) AS revenue',
        ])
            .groupBy('product.id')
            .getRawMany();
        const productStatistics = await this.productRepo
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.reviews', 'review')
            .select([
            'product.id AS id',
            'AVG(review.rate) AS averageRating',
            'COUNT(review.id) AS reviewCount',
        ])
            .groupBy('product.id')
            .getRawMany();
        return {
            totalOrders: totalOrders,
            totalBoughtProducts: totalBoughtProducts.total
                ? totalBoughtProducts.total
                : 0,
            totalRevenue: totalRevenue ? formattedTotalRevenue : 0,
            averageOrderPrice: averageOrderPrice ? averageOrderPrice.toFixed(1) : 0,
            totalReviews: totalReviews ? totalReviews : 0,
            totalUsers: totalUsers ? totalUsers : 0,
            totalUsersActive: totalUsersActive ? totalUsersActive : 0,
            totalProducts: totalProducts ? totalProducts : 0,
            totalCategories: totalCategories ? totalCategories : 0,
            productStatistics: productStatistics
                ? productStatistics.map((product) => {
                    const salesData = productSalesData
                        ? productSalesData.find((p) => p.id === product.id)
                        : {};
                    return {
                        id: product.id,
                        bought: (salesData === null || salesData === void 0 ? void 0 : salesData.bought) ? parseInt(salesData.bought, 10) : 0,
                        revenue: (salesData === null || salesData === void 0 ? void 0 : salesData.revenue)
                            ? parseFloat(salesData.revenue).toFixed(1)
                            : 0,
                        averageRating: +Number(product.averagerating).toFixed(2),
                        reviewCount: Number(product.reviewcount),
                    };
                })
                : [],
        };
    }
    async getShopStatisticsPeriodInfo(accessToken, getStatisticsPeriodDto) {
        const currentUserIsAdmin = await this.hasAdminRole(accessToken);
        if (!currentUserIsAdmin) {
            throw new common_1.ForbiddenException('This action only available for admins');
        }
        const { startDate, endDate } = getStatisticsPeriodDto;
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        const totalOrders = await this.orderRepo.count({
            where: {
                createdAt: (0, typeorm_2.Between)(start, end),
            },
        });
        const totalBoughtProducts = await this.cartItemRepo
            .createQueryBuilder('cartItem')
            .innerJoin('cartItem.purchase', 'order')
            .where('order.createdAt BETWEEN :start AND :end', { start, end })
            .select('SUM(cartItem.quantity)', 'total')
            .getRawOne();
        const totalRevenue = await this.cartItemRepo
            .createQueryBuilder('cartItem')
            .innerJoin('cartItem.product', 'product')
            .innerJoin('cartItem.purchase', 'order')
            .where('order.createdAt BETWEEN :start AND :end', { start, end })
            .select('SUM(cartItem.quantity * product.price)', 'totalRevenue')
            .getRawOne();
        const formattedTotalRevenue = totalRevenue.totalRevenue
            ? +Number(totalRevenue.totalRevenue).toFixed(1)
            : 0;
        const averageOrderPrice = totalOrders > 0 ? formattedTotalRevenue / totalOrders : 0;
        const totalReviews = await this.reviewRepo.count({
            where: {
                createdAt: (0, typeorm_2.Between)(start, end),
            },
        });
        const totalUsers = await this.userRepo.count();
        const totalUsersActive = await this.userRepo.count({
            where: { active: true },
        });
        const totalProducts = await this.productRepo.count();
        const totalCategories = await this.categoryRepo.count();
        const productSalesData = await this.cartItemRepo
            .createQueryBuilder('cartItem')
            .innerJoinAndSelect('cartItem.product', 'product')
            .innerJoinAndSelect('cartItem.purchase', 'order')
            .where('order.createdAt BETWEEN :start AND :end', { start, end })
            .select([
            'product.id AS id',
            'SUM(cartItem.quantity) AS bought',
            'SUM(cartItem.quantity * product.price) AS revenue',
        ])
            .groupBy('product.id')
            .getRawMany();
        const productStatistics = await this.productRepo
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.reviews', 'review')
            .select([
            'product.id AS id',
            'AVG(review.rate) AS averageRating',
            'COUNT(review.id) AS reviewCount',
        ])
            .groupBy('product.id')
            .getRawMany();
        return {
            totalOrders: totalOrders,
            totalBoughtProducts: totalBoughtProducts.total
                ? totalBoughtProducts.total
                : 0,
            totalRevenue: formattedTotalRevenue,
            averageOrderPrice: averageOrderPrice.toFixed(1),
            totalReviews: totalReviews,
            totalUsers: totalUsers,
            totalUsersActive: totalUsersActive,
            totalProducts: totalProducts,
            totalCategories: totalCategories,
            productStatistics: productStatistics.map((product) => {
                const salesData = productSalesData.find((p) => p.id === product.id) || {};
                return {
                    id: product.id,
                    bought: salesData.bought ? parseInt(salesData.bought, 10) : 0,
                    revenue: salesData.revenue
                        ? parseFloat(salesData.revenue).toFixed(1)
                        : 0,
                    averageRating: +Number(product.averagerating).toFixed(2),
                    reviewCount: Number(product.reviewcount),
                };
            }),
        };
    }
    async findByYandexID(yandexProfile) {
        return yandexProfile.email;
    }
    async createFromYandex(yandexProfile) {
        return yandexProfile;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(3, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(4, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __param(5, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(6, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(7, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map