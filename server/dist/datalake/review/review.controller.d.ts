import { ReviewService } from './review.service';
import { GiveRateDto } from './dto/give-rate.dto';
import { Review } from './entities/review.entity';
import { GiveCommentDto } from './dto/give-comment.dto';
import { LikeDislikeReviewDto } from './dto/like-dislike-review.dto';
import { IHeadersAuthorizationRequest, LikeDislikeReviewResponse, RemoveReview } from 'src/common/types/interfaces';
import { DeleteReviewDto } from './dto/delete-review.dto';
import { EditReviewDto } from './dto/edit-review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getAllReviews(): Promise<Review[]>;
    rateProduct(request: IHeadersAuthorizationRequest, giveRateDto: GiveRateDto): Promise<Partial<Review>>;
    commentProduct(request: IHeadersAuthorizationRequest, giveCommentDto: GiveCommentDto): Promise<Partial<Review>>;
    editReview(request: IHeadersAuthorizationRequest, editReviewDto: EditReviewDto): Promise<Partial<Review>>;
    likeProduct(request: IHeadersAuthorizationRequest, likeDislikeReviewDto: LikeDislikeReviewDto): Promise<LikeDislikeReviewResponse>;
    dislikeProduct(request: IHeadersAuthorizationRequest, likeDislikeReviewDto: LikeDislikeReviewDto): Promise<LikeDislikeReviewResponse>;
    deleteReview(request: IHeadersAuthorizationRequest, deleteReviewDto: DeleteReviewDto): Promise<RemoveReview>;
}
