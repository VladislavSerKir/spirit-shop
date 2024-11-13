import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
  ) {}
}
