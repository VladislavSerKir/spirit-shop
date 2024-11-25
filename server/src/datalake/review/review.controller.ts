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
    @Request() request: any,
    @Body() body: GiveRateDto,
  ): Promise<Partial<Review>> {
    const accessToken = request.headers.authorization;
    const { productId, rate } = body;
    return this.reviewService.rateProduct(accessToken, productId, rate);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/comment')
  commentProduct(
    @Request() request: any,
    @Body() body: GiveCommentDto,
  ): Promise<Partial<Review>> {
    const accessToken = request.headers.authorization;
    const { productId, comment } = body;
    return this.reviewService.commentProduct(accessToken, productId, comment);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/like')
  async likeProduct(
    @Request() request: any,
    @Body() body: LikeDislikeReviewDto,
  ): Promise<{ id: number; email: string }> {
    const accessToken = request.headers.authorization;
    return this.reviewService.likeReview(accessToken, body);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/dislike')
  async dislikeProduct(
    @Request() request: any,
    @Body() body: LikeDislikeReviewDto,
  ): Promise<{ id: number; email: string }> {
    const accessToken = request.headers.authorization;
    return this.reviewService.dislikeReview(accessToken, body);
  }
}
