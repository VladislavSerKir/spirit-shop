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
  LikeDislikeReviewResponse,
} from 'src/common/types/interfaces';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/')
  @ApiOperation({ summary: 'Получение всех отзывов' })
  @ApiResponse({
    status: 200,
    description: 'Возврат всех отзывов',
    type: Review,
  })
  @ApiNotFoundResponse()
  getAllReviews(): Promise<Review[]> {
    return this.reviewService.getAllReviews();
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/rate')
  @ApiOperation({ summary: 'Оценить продукт' })
  @ApiResponse({
    status: 200,
    description: 'Возврат отзыва о продукте',
    type: Review,
  })
  @ApiBody({
    type: GiveRateDto,
  })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
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
  @ApiOperation({ summary: 'Оставить комментарий о продукте' })
  @ApiResponse({
    status: 200,
    description: 'Возврат отзыва о продукте',
    type: Review,
  })
  @ApiBody({
    type: GiveCommentDto,
  })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
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
  @ApiOperation({ summary: 'Оставить оценку на отзыв' })
  @ApiResponse({
    status: 200,
    description: 'Возврат индентификатора продукта и email пользователя',
    type: LikeDislikeReviewResponse,
  })
  @ApiBody({
    type: LikeDislikeReviewDto,
  })
  @ApiBadRequestResponse()
  async likeProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() likeDislikeReviewDto: LikeDislikeReviewDto,
  ): Promise<LikeDislikeReviewResponse> {
    const accessToken = request.headers.authorization;
    return this.reviewService.likeReview(accessToken, likeDislikeReviewDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/dislike')
  @ApiOperation({ summary: 'Убрать оценку на отзыв' })
  @ApiResponse({
    status: 200,
    description: 'Возврат индентификатора продукта и email пользователя',
    type: LikeDislikeReviewResponse,
  })
  @ApiBody({
    type: LikeDislikeReviewDto,
  })
  @ApiBadRequestResponse()
  async dislikeProduct(
    @Request() request: IHeadersAuthorizationRequest,
    @Body() likeDislikeReviewDto: LikeDislikeReviewDto,
  ): Promise<LikeDislikeReviewResponse> {
    const accessToken = request.headers.authorization;
    return this.reviewService.dislikeReview(accessToken, likeDislikeReviewDto);
  }
}
