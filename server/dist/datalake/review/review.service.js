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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const review_entity_1 = require("./entities/review.entity");
const user_entity_1 = require("../user/entities/user.entity");
const product_entity_1 = require("../product/entities/product.entity");
const order_entity_1 = require("../order/entities/order.entity");
let ReviewService = class ReviewService {
    constructor(jwtService, configService, reviewRepo, userRepo, productRepo, orderRepo) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.reviewRepo = reviewRepo;
        this.userRepo = userRepo;
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
    }
    async getAllReviews() {
        const reviews = await this.reviewRepo.find({
            relations: ['user', 'product', 'helpful'],
            select: {
                id: true,
                createdAt: true,
                rate: true,
                comment: true,
                user: {
                    id: true,
                    email: true,
                    avatar: true,
                    firstName: true,
                    lastName: true,
                },
                product: {
                    id: true,
                },
                helpful: {
                    email: true,
                },
            },
        });
        if (!reviews) {
            throw new common_1.NotFoundException('Error fetch reviews');
        }
        else {
            return reviews;
        }
    }
    async editReview(accessToken, productId, comment, rate) {
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
        const existingProduct = await this.productRepo.findOne({
            where: {
                id: productId,
            },
            select: { id: true },
        });
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        const existingUserReview = await this.reviewRepo.findOne({
            where: {
                product: existingProduct,
                user: user,
            },
            relations: ['user', 'product'],
            select: {
                id: true,
                comment: true,
                rate: true,
                user: {
                    id: true,
                },
            },
        });
        if (!existingUserReview) {
            throw new common_1.NotFoundException('Review on this product does not exist');
        }
        try {
            await this.reviewRepo.update({
                product: existingProduct,
                user: user,
            }, { comment, rate });
            const { id } = existingUserReview;
            return { comment, rate, id };
        }
        catch (_a) {
            throw new common_1.BadRequestException(`Error to update review`);
        }
    }
    async rateProduct(accessToken, productId, rate) {
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
        const userBoughtProduct = await this.orderRepo.find({
            where: {
                user: user,
                purchase: {
                    product: {
                        id: productId,
                    },
                },
            },
            relations: ['purchase', 'purchase.product'],
            select: {
                id: true,
                purchase: {
                    product: {
                        id: true,
                    },
                },
            },
        });
        if (!userBoughtProduct.length) {
            throw new common_1.ForbiddenException('You cannot rate have not bought product yet');
        }
        const existingProduct = await this.productRepo.findOne({
            where: {
                id: productId,
            },
            select: { id: true },
        });
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        const existingUserReview = await this.reviewRepo.findOne({
            where: {
                product: existingProduct,
                user: user,
            },
            relations: ['user', 'product'],
            select: {
                id: true,
                user: {
                    id: true,
                },
            },
        });
        if (!existingUserReview) {
            const newReview = this.reviewRepo.create({
                user: user,
                product: existingProduct,
                rate,
            });
            try {
                const savedReview = await this.reviewRepo.save(newReview);
                const { id } = savedReview;
                const review = await this.reviewRepo.findOne({
                    where: {
                        id,
                    },
                    relations: ['user', 'product'],
                    select: {
                        id: true,
                        createdAt: true,
                        rate: true,
                        comment: true,
                        user: {
                            email: true,
                            firstName: true,
                            lastName: true,
                            avatar: true,
                        },
                        product: {
                            id: true,
                        },
                    },
                });
                return review;
            }
            catch (_a) {
                throw new common_1.BadRequestException(`Error to rate product`);
            }
        }
        try {
            await this.reviewRepo.update({
                product: existingProduct,
                user: user,
            }, { rate });
            const { id } = existingUserReview;
            return { rate, id };
        }
        catch (_b) {
            throw new common_1.BadRequestException(`Error to update rate`);
        }
    }
    async commentProduct(accessToken, productId, comment) {
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
        const userBoughtProduct = await this.orderRepo.find({
            where: {
                user: user,
                purchase: {
                    product: {
                        id: productId,
                    },
                },
            },
            relations: ['purchase', 'purchase.product'],
            select: {
                id: true,
                purchase: {
                    product: {
                        id: true,
                    },
                },
            },
        });
        if (!userBoughtProduct.length) {
            throw new common_1.ForbiddenException('You cannot comment have not bought product yet');
        }
        const existingProduct = await this.productRepo.findOne({
            where: {
                id: productId,
            },
            select: { id: true },
        });
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        const existingUserReview = await this.reviewRepo.findOne({
            where: {
                product: existingProduct,
                user: user,
            },
            relations: ['user', 'product'],
            select: {
                id: true,
                user: {
                    id: true,
                },
            },
        });
        if (!existingUserReview) {
            const newReview = this.reviewRepo.create({
                user: user,
                product: existingProduct,
                comment,
            });
            try {
                const savedReview = await this.reviewRepo.save(newReview);
                const { id } = savedReview;
                const review = await this.reviewRepo.findOne({
                    where: {
                        id,
                    },
                    relations: ['user', 'product'],
                    select: {
                        id: true,
                        createdAt: true,
                        rate: true,
                        comment: true,
                        user: {
                            email: true,
                        },
                        product: {
                            id: true,
                        },
                    },
                });
                return review;
            }
            catch (_a) {
                throw new common_1.BadRequestException(`Error to comment product`);
            }
        }
        try {
            await this.reviewRepo.update({
                product: existingProduct,
                user: user,
            }, { comment });
            const { id } = existingUserReview;
            return { comment, id };
        }
        catch (_b) {
            throw new common_1.BadRequestException(`Error to update comment`);
        }
    }
    async likeReview(accessToken, likeDislikeReviewDto) {
        const { id } = likeDislikeReviewDto;
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const user = await this.userRepo.findOne({
            where: { email: username },
            relations: ['likedReviews'],
            select: {
                id: true,
                email: true,
                likedReviews: {
                    helpful: true,
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User does not exist');
        }
        const existingReview = await this.reviewRepo.findOne({
            where: {
                id,
            },
            relations: ['helpful', 'user'],
            select: {
                id: true,
                user: {
                    email: true,
                },
                helpful: {
                    id: true,
                    email: true,
                },
            },
        });
        if (existingReview.helpful.some((u) => u.email === existingReview.user.email)) {
            throw new common_1.BadRequestException('You have already liked this review');
        }
        if (existingReview.user.email === user.email) {
            throw new common_1.BadRequestException('You can not like your own review');
        }
        existingReview.helpful.push(user);
        try {
            await this.reviewRepo.save(existingReview);
            return { id, email: user.email };
        }
        catch (e) {
            throw new common_1.NotFoundException(`Server error: ${e}`);
        }
    }
    async dislikeReview(accessToken, likeDislikeReviewDto) {
        const { id } = likeDislikeReviewDto;
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const user = await this.userRepo.findOne({
            where: { email: username },
            relations: ['likedReviews'],
            select: {
                id: true,
                email: true,
                likedReviews: {
                    helpful: true,
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User does not exist');
        }
        const existingReview = await this.reviewRepo.findOne({
            where: {
                id,
            },
            relations: ['helpful', 'user'],
            select: {
                id: true,
                user: {
                    email: true,
                },
                helpful: {
                    id: true,
                    email: true,
                },
            },
        });
        const userIndex = existingReview.helpful.findIndex((u) => u.id === user.id);
        if (userIndex === -1) {
            throw new common_1.BadRequestException('You have not liked this review yet');
        }
        if (existingReview.user.email === user.email) {
            throw new common_1.BadRequestException('You can not dislike your own review');
        }
        existingReview.helpful.splice(userIndex, 1);
        try {
            await this.reviewRepo.save(existingReview);
            return { id, email: user.email };
        }
        catch (e) {
            throw new common_1.NotFoundException(`Server error: ${e}`);
        }
    }
    async deleteReview(deleteReviewDto, accessToken) {
        const { id } = deleteReviewDto;
        const token = accessToken.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get('jwt.access'),
        });
        const username = decodedToken.username;
        const existingReview = await this.reviewRepo.findOne({
            where: {
                id,
            },
            relations: ['helpful', 'user'],
        });
        if (!existingReview) {
            throw new common_1.NotFoundException('Error review fetching');
        }
        const user = await this.userRepo.findOne({
            where: { email: username },
            select: {
                id: true,
                active: true,
                email: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Error profile fetching');
        }
        else if (!user.active) {
            throw new common_1.ForbiddenException('User is not available or diactivated');
        }
        else if (existingReview.user.email !== user.email) {
            throw new common_1.ForbiddenException('You can not delete other user review');
        }
        else {
            try {
                await this.reviewRepo.delete(String(id));
                return { id };
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(`Server error: ${e}`);
            }
        }
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(5, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewService);
//# sourceMappingURL=review.service.js.map