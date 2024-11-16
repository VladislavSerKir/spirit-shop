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

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/')
  getAllReviews(): Promise<Review[]> {
    return this.reviewService.getAllReviews();
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/rate')
  addToCart(
    @Request() request: any,
    @Body() body: GiveRateDto,
  ): Promise<Partial<Review>> {
    const accessToken = request.headers.authorization;
    const { productId, rate } = body;
    return this.reviewService.rateProduct(accessToken, productId, rate);
  }
}
