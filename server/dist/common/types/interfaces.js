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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicUserInfoResponse = exports.BasicUserInfoHiddenResponse = exports.RemoveReview = exports.RemoveCategory = exports.RemoveProduct = exports.LikeDislikeReviewResponse = exports.LikeDislikeProductResponse = exports.SuccessResponse = exports.AccessRefreshTokenResponse = exports.UpdatedAccessTokenResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdatedAccessTokenResponse {
}
exports.UpdatedAccessTokenResponse = UpdatedAccessTokenResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdatedAccessTokenResponse.prototype, "updatedAccessToken", void 0);
class AccessRefreshTokenResponse {
}
exports.AccessRefreshTokenResponse = AccessRefreshTokenResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AccessRefreshTokenResponse.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AccessRefreshTokenResponse.prototype, "refreshToken", void 0);
class SuccessResponse {
}
exports.SuccessResponse = SuccessResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], SuccessResponse.prototype, "success", void 0);
class LikeDislikeProductResponse {
}
exports.LikeDislikeProductResponse = LikeDislikeProductResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], LikeDislikeProductResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LikeDislikeProductResponse.prototype, "email", void 0);
class LikeDislikeReviewResponse extends LikeDislikeProductResponse {
}
exports.LikeDislikeReviewResponse = LikeDislikeReviewResponse;
class RemoveProduct {
}
exports.RemoveProduct = RemoveProduct;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RemoveProduct.prototype, "id", void 0);
class RemoveCategory extends RemoveProduct {
}
exports.RemoveCategory = RemoveCategory;
class RemoveReview extends RemoveProduct {
}
exports.RemoveReview = RemoveReview;
var ContentType;
(function (ContentType) {
    ContentType["FORM_URLENCODED"] = "application/x-www-form-urlencoded";
    ContentType["JSON"] = "application/json";
    ContentType["TEXT"] = "text/plain";
})(ContentType || (ContentType = {}));
class BasicUserInfoHiddenResponse {
}
exports.BasicUserInfoHiddenResponse = BasicUserInfoHiddenResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BasicUserInfoHiddenResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], BasicUserInfoHiddenResponse.prototype, "hideProfile", void 0);
class BasicUserInfoResponse {
}
exports.BasicUserInfoResponse = BasicUserInfoResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BasicUserInfoResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BasicUserInfoResponse.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BasicUserInfoResponse.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BasicUserInfoResponse.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], BasicUserInfoResponse.prototype, "whenRegistered", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], BasicUserInfoResponse.prototype, "firstOrderDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BasicUserInfoResponse.prototype, "totalOrders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BasicUserInfoResponse.prototype, "totalReviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BasicUserInfoResponse.prototype, "helpfulReviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BasicUserInfoResponse.prototype, "totalBoughtProducts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], BasicUserInfoResponse.prototype, "mostBuyableProduct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], BasicUserInfoResponse.prototype, "userReviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], BasicUserInfoResponse.prototype, "userOrders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], BasicUserInfoResponse.prototype, "hideProfile", void 0);
//# sourceMappingURL=interfaces.js.map