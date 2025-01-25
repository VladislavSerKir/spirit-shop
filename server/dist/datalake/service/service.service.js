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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("../review/entities/review.entity");
const user_entity_1 = require("../user/entities/user.entity");
const users_service_1 = require("../user/users.service");
const order_entity_1 = require("../order/entities/order.entity");
let ServiceService = class ServiceService {
    constructor(userService, orderRepo, reviewRepo, userRepo) {
        this.userService = userService;
        this.orderRepo = orderRepo;
        this.reviewRepo = reviewRepo;
        this.userRepo = userRepo;
    }
    async getChartsData(accessToken) {
        const currentUserIsAdmin = await this.userService.hasAdminRole(accessToken);
        if (!currentUserIsAdmin) {
            throw new common_1.ForbiddenException('This action only available for admins');
        }
        const oldestOrder = await this.orderRepo.find({
            order: {
                createdAt: 'ASC',
            },
            take: 1,
        });
        const oldestOrderDate = oldestOrder.length > 0 ? oldestOrder[0].createdAt : null;
        const currentDate = new Date();
        const validOldestOrderDate = this.formatDate(oldestOrderDate);
        const validCurrentDate = this.formatDate(currentDate);
        try {
            return await this.getPeriodData(validOldestOrderDate, validCurrentDate);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Error data calculating');
        }
    }
    addDaysToDate(dateString, daysToAdd) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format. Please use "YYYY-MM-DD".');
        }
        date.setDate(date.getDate() + daysToAdd);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    formatDate(isoDate) {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    async getPeriodData(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new Error('Invalid date format. Please use "YYYY-MM-DD".');
        }
        const differenceInTime = end.getTime() - start.getTime();
        const totalDays = Math.round(differenceInTime / (1000 * 3600 * 24));
        const parts = totalDays < 10 ? totalDays : 10;
        const periodLength = Math.ceil(totalDays / parts);
        const restDays = totalDays % parts;
        const periods = [];
        for (let i = 0; i <= parts; i++) {
            let periodStart, periodEndIso;
            if (i === 0) {
                periodStart = this.formatDate(new Date(this.addDaysToDate(this.formatDate(start), 0 - periodLength)));
                periodEndIso = this.formatDate(start);
            }
            else {
                periodStart = this.formatDate(start);
                periodEndIso = new Date(this.addDaysToDate(periodStart, periodLength));
            }
            let periodEnd;
            if (i === parts - 1) {
                periodEnd = this.formatDate(end);
            }
            else {
                periodEnd = this.formatDate(periodEndIso);
            }
            if (new Date(periodEnd) > end) {
                break;
            }
            const [revenue, soldProducts, reviews, newUser] = await Promise.all([
                this.calculateRevenue(periodStart, periodEnd),
                this.calculateSoldProducts(periodStart, periodEnd),
                this.calculateReviews(periodStart, periodEnd),
                this.calculateNewUsers(periodStart, periodEnd),
            ]);
            periods.push({
                startDate: periodStart,
                endDate: periodEnd,
                revenue: Math.round(revenue * 10) / 10,
                soldProducts,
                reviews,
                newUser,
            });
            if (i === parts - 1) {
                start.setDate(start.getDate() + periodLength + restDays);
            }
            else if (i === 0) {
                start.setDate(start.getDate());
            }
            else {
                start.setDate(start.getDate() + periodLength);
            }
        }
        return periods;
    }
    async calculateRevenue(startDate, endDate) {
        const orders = await this.orderRepo.find({
            where: {
                createdAt: (0, typeorm_2.Between)(new Date(startDate), new Date(endDate)),
            },
            relations: ['purchase', 'purchase.product'],
            select: {
                createdAt: true,
                purchase: { product: { price: true }, quantity: true },
            },
        });
        return orders.reduce((acc, order) => acc +
            order.purchase.reduce((sum, item) => sum + item.product.price * item.quantity, 0), 0);
    }
    async calculateSoldProducts(startDate, endDate) {
        const orders = await this.orderRepo.find({
            where: {
                createdAt: (0, typeorm_2.Between)(new Date(startDate), new Date(endDate)),
            },
            relations: ['purchase'],
            select: {
                createdAt: true,
                purchase: { quantity: true },
            },
        });
        return orders.reduce((acc, order) => acc + order.purchase.reduce((sum, item) => sum + item.quantity, 0), 0);
    }
    async calculateReviews(startDate, endDate) {
        const reviews = await this.reviewRepo.find({
            where: {
                createdAt: (0, typeorm_2.Between)(new Date(startDate), new Date(endDate)),
            },
            select: {
                createdAt: true,
            },
        });
        return reviews.length;
    }
    async calculateNewUsers(startDate, endDate) {
        const users = await this.userRepo.find({
            where: {
                createdAt: (0, typeorm_2.Between)(new Date(startDate), new Date(endDate)),
            },
            select: {
                createdAt: true,
            },
        });
        return users.length;
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ServiceService);
//# sourceMappingURL=service.service.js.map