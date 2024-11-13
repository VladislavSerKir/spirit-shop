import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Param,
  Request,
  Put,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/config/access-token.guard';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
}
