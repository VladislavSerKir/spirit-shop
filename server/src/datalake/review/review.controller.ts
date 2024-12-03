import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { ReviewService } from './review.service';
import { GiveRateDto } from './dto/give-rate.dto';
import { Review } from './entities/review.entity';
import { GiveCommentDto } from './dto/give-comment.dto';
import { LikeDislikeReviewDto } from './dto/like-dislike-review.dto';
import {
  IHeadersAuthorizationRequest,
  ILikeDislikeProductResponse,
  ILikeDislikeReviewResponse,
} from 'src/common/types/interfaces';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/')
  getAllReviews(): Promise<Review[]> {
    return this.reviewService.getAllReviews();
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/rate')
  rateProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() giveRateDto: GiveRateDto,
  ): Promise<Partial<Review>> {
    const accessToken = request.headers.authorization;
    const { productId, rate } = giveRateDto;
    return this.reviewService.rateProduct(accessToken, productId, rate);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/comment')
  commentProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() giveCommentDto: GiveCommentDto,
  ): Promise<Partial<Review>> {
    const accessToken = request.headers.authorization;
    const { productId, comment } = giveCommentDto;
    return this.reviewService.commentProduct(accessToken, productId, comment);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/like')
  async likeProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() likeDislikeReviewDto: LikeDislikeReviewDto,
  ): Promise<ILikeDislikeReviewResponse> {
    const accessToken = request.headers.authorization;
    return this.reviewService.likeReview(accessToken, likeDislikeReviewDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/dislike')
  async dislikeProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() likeDislikeReviewDto: LikeDislikeReviewDto,
  ): Promise<ILikeDislikeReviewResponse> {
    const accessToken = request.headers.authorization;
    return this.reviewService.dislikeReview(accessToken, likeDislikeReviewDto);
  }
}
