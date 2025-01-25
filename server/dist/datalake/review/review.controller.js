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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const access_token_guard_1 = require("../../config/access-token.guard");
const review_service_1 = require("./review.service");
const give_rate_dto_1 = require("./dto/give-rate.dto");
const review_entity_1 = require("./entities/review.entity");
const give_comment_dto_1 = require("./dto/give-comment.dto");
const like_dislike_review_dto_1 = require("./dto/like-dislike-review.dto");
const interfaces_1 = require("../../common/types/interfaces");
const swagger_1 = require("@nestjs/swagger");
const delete_review_dto_1 = require("./dto/delete-review.dto");
const edit_review_dto_1 = require("./dto/edit-review.dto");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    getAllReviews() {
        return this.reviewService.getAllReviews();
    }
    rateProduct(request, giveRateDto) {
        const accessToken = request.headers.authorization;
        const { productId, rate } = giveRateDto;
        return this.reviewService.rateProduct(accessToken, productId, rate);
    }
    commentProduct(request, giveCommentDto) {
        const accessToken = request.headers.authorization;
        const { productId, comment } = giveCommentDto;
        return this.reviewService.commentProduct(accessToken, productId, comment);
    }
    editReview(request, editReviewDto) {
        const accessToken = request.headers.authorization;
        const { productId, comment, rate } = editReviewDto;
        return this.reviewService.editReview(accessToken, productId, comment, rate);
    }
    async likeProduct(request, likeDislikeReviewDto) {
        const accessToken = request.headers.authorization;
        return this.reviewService.likeReview(accessToken, likeDislikeReviewDto);
    }
    async dislikeProduct(request, likeDislikeReviewDto) {
        const accessToken = request.headers.authorization;
        return this.reviewService.dislikeReview(accessToken, likeDislikeReviewDto);
    }
    async deleteReview(request, deleteReviewDto) {
        const accessToken = request.headers.authorization;
        return this.reviewService.deleteReview(deleteReviewDto, accessToken);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение всех отзывов' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат всех отзывов',
        type: review_entity_1.Review,
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getAllReviews", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/rate'),
    (0, swagger_1.ApiOperation)({ summary: 'Оценить продукт' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат отзыва о продукте',
        type: review_entity_1.Review,
    }),
    (0, swagger_1.ApiBody)({
        type: give_rate_dto_1.GiveRateDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, give_rate_dto_1.GiveRateDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "rateProduct", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/comment'),
    (0, swagger_1.ApiOperation)({ summary: 'Оставить комментарий о продукте' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат отзыва о продукте',
        type: review_entity_1.Review,
    }),
    (0, swagger_1.ApiBody)({
        type: give_comment_dto_1.GiveCommentDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, give_comment_dto_1.GiveCommentDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "commentProduct", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/edit'),
    (0, swagger_1.ApiOperation)({ summary: 'Изменить комментарий о продукте' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат отзыва о продукте',
        type: review_entity_1.Review,
    }),
    (0, swagger_1.ApiBody)({
        type: edit_review_dto_1.EditReviewDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_review_dto_1.EditReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "editReview", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/like'),
    (0, swagger_1.ApiOperation)({ summary: 'Оставить оценку на отзыв' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат индентификатора продукта и email пользователя',
        type: interfaces_1.LikeDislikeReviewResponse,
    }),
    (0, swagger_1.ApiBody)({
        type: like_dislike_review_dto_1.LikeDislikeReviewDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, like_dislike_review_dto_1.LikeDislikeReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "likeProduct", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('/dislike'),
    (0, swagger_1.ApiOperation)({ summary: 'Убрать оценку на отзыв' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат индентификатора продукта и email пользователя',
        type: interfaces_1.LikeDislikeReviewResponse,
    }),
    (0, swagger_1.ApiBody)({
        type: like_dislike_review_dto_1.LikeDislikeReviewDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, like_dislike_review_dto_1.LikeDislikeReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "dislikeProduct", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Delete)('/delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить отзыв' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Возврат индентификатора удаленного отзыва',
        type: interfaces_1.RemoveReview,
    }),
    (0, swagger_1.ApiBody)({
        type: delete_review_dto_1.DeleteReviewDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiInternalServerErrorResponse)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, delete_review_dto_1.DeleteReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteReview", null);
exports.ReviewController = ReviewController = __decorate([
    (0, swagger_1.ApiTags)('review'),
    (0, common_1.Controller)('review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map