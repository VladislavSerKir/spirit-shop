import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Review } from './entities/review.entity';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { Order } from '../order/entities/order.entity';
import { LikeDislikeReviewDto } from './dto/like-dislike-review.dto';
import { LikeDislikeReviewResponse, RemoveReview } from 'src/common/types/interfaces';
import { DeleteReviewDto } from './dto/delete-review.dto';
export declare class ReviewService {
    private jwtService;
    private configService;
    private reviewRepo;
    private userRepo;
    private productRepo;
    private orderRepo;
    constructor(jwtService: JwtService, configService: ConfigService, reviewRepo: Repository<Review>, userRepo: Repository<User>, productRepo: Repository<Product>, orderRepo: Repository<Order>);
    getAllReviews(): Promise<Review[]>;
    editReview(accessToken: string, productId: number, comment: string, rate: number): Promise<Partial<Review>>;
    rateProduct(accessToken: string, productId: number, rate: number): Promise<Partial<Review>>;
    commentProduct(accessToken: string, productId: number, comment: string): Promise<Partial<Review>>;
    likeReview(accessToken: string, likeDislikeReviewDto: LikeDislikeReviewDto): Promise<LikeDislikeReviewResponse>;
    dislikeReview(accessToken: string, likeDislikeReviewDto: LikeDislikeReviewDto): Promise<LikeDislikeReviewResponse>;
    deleteReview(deleteReviewDto: DeleteReviewDto, accessToken: string): Promise<RemoveReview>;
}
