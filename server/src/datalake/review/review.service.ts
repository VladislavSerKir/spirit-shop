import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Review } from './entities/review.entity';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { Order } from '../order/entities/order.entity';
import { LikeDislikeReviewDto } from './dto/like-dislike-review.dto';
import { ILikeDislikeReviewResponse } from 'src/common/types/interfaces';

@Injectable()
export class ReviewService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}

  async getAllReviews(): Promise<Review[]> {
    const reviews = await this.reviewRepo.find({
      relations: ['user', 'product', 'helpful'],
      select: {
        id: true,
        createdAt: true,
        rate: true,
        comment: true,
        user: {
          email: true,
          avatar: true,
          firstName: true,
          lastName: true,
        },
        product: {
          id: true,
        },
        helpful: {
          email: true,
        },
      },
    });

    if (!reviews) {
      throw new NotFoundException('Error fetch reviews');
    } else {
      return reviews;
    }
  }

  async rateProduct(
    accessToken: string,
    productId: number,
    rate: number,
  ): Promise<Partial<Review>> {
    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      select: { id: true },
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const userBoughtProduct = await this.orderRepo.find({
      where: {
        user: user as User,
        purchase: {
          product: {
            id: productId,
          },
        },
      },
      relations: ['purchase', 'purchase.product'],
      select: {
        id: true,
        purchase: {
          product: {
            id: true,
          },
        },
      },
    });

    if (!userBoughtProduct.length) {
      throw new ForbiddenException(
        'You cannot rate have not bought product yet',
      );
    }

    const existingProduct = await this.productRepo.findOne({
      where: {
        id: productId,
      },
      select: { id: true },
    });

    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const existingUserReview = await this.reviewRepo.findOne({
      where: {
        product: existingProduct as Product,
        user: user as User,
      },
      relations: ['user', 'product'],
      select: {
        id: true,
        user: {
          id: true,
        },
      },
    });

    if (!existingUserReview) {
      const newReview = this.reviewRepo.create({
        user: user as User,
        product: existingProduct as Product,
        rate,
      });

      try {
        const savedReview = await this.reviewRepo.save(newReview);
        const { id } = savedReview;

        const review = await this.reviewRepo.findOne({
          where: {
            id,
          },
          relations: ['user', 'product'],
          select: {
            id: true,
            createdAt: true,
            rate: true,
            comment: true,
            user: {
              email: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
            product: {
              id: true,
            },
          },
        });

        return review;
      } catch {
        throw new BadRequestException(`Error to rate product`);
      }
    }

    try {
      await this.reviewRepo.update(
        {
          product: existingProduct,
          user: user,
        },
        { rate },
      );
      const { id } = existingUserReview;

      return { rate, id };
    } catch {
      throw new BadRequestException(`Error to update rate`);
    }
  }

  async commentProduct(
    accessToken: string,
    productId: number,
    comment: string,
  ): Promise<Partial<Review>> {
    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      select: { id: true },
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const userBoughtProduct = await this.orderRepo.find({
      where: {
        user: user as User,
        purchase: {
          product: {
            id: productId,
          },
        },
      },
      relations: ['purchase', 'purchase.product'],
      select: {
        id: true,
        purchase: {
          product: {
            id: true,
          },
        },
      },
    });

    if (!userBoughtProduct.length) {
      throw new ForbiddenException(
        'You cannot comment have not bought product yet',
      );
    }

    const existingProduct = await this.productRepo.findOne({
      where: {
        id: productId,
      },
      select: { id: true },
    });

    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const existingUserReview = await this.reviewRepo.findOne({
      where: {
        product: existingProduct as Product,
        user: user as User,
      },
      relations: ['user', 'product'],
      select: {
        id: true,
        user: {
          id: true,
        },
      },
    });

    if (!existingUserReview) {
      const newReview = this.reviewRepo.create({
        user: user as User,
        product: existingProduct as Product,
        comment,
      });

      try {
        const savedReview = await this.reviewRepo.save(newReview);
        const { id } = savedReview;

        const review = await this.reviewRepo.findOne({
          where: {
            id,
          },
          relations: ['user', 'product'],
          select: {
            id: true,
            createdAt: true,
            rate: true,
            comment: true,
            user: {
              email: true,
            },
            product: {
              id: true,
            },
          },
        });

        return review;
      } catch {
        throw new BadRequestException(`Error to comment product`);
      }
    }

    try {
      await this.reviewRepo.update(
        {
          product: existingProduct,
          user: user,
        },
        { comment },
      );
      const { id } = existingUserReview;

      return { comment, id };
    } catch {
      throw new BadRequestException(`Error to update comment`);
    }
  }

  async likeReview(
    accessToken: string,
    likeDislikeReviewDto: LikeDislikeReviewDto,
  ): Promise<ILikeDislikeReviewResponse> {
    const { id } = likeDislikeReviewDto;

    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      relations: ['likedReviews'],
      select: {
        id: true,
        email: true,
        likedReviews: {
          helpful: true,
        },
      },
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const existingReview = await this.reviewRepo.findOne({
      where: {
        id,
      },
      relations: ['helpful', 'user'],
      select: {
        id: true,
        user: {
          email: true,
        },
        helpful: {
          id: true,
          email: true,
        },
      },
    });

    if (
      existingReview.helpful.some((u) => u.email === existingReview.user.email)
    ) {
      throw new BadRequestException('You have already liked this review');
    }

    if (existingReview.user.email === user.email) {
      throw new BadRequestException('You can not like your own review');
    }

    existingReview.helpful.push(user);

    try {
      await this.reviewRepo.save(existingReview);
      return { id, email: user.email };
    } catch (e) {
      throw new NotFoundException(`Server error: ${e}`);
    }
  }

  async dislikeReview(
    accessToken: string,
    likeDislikeReviewDto: LikeDislikeReviewDto,
  ): Promise<ILikeDislikeReviewResponse> {
    const { id } = likeDislikeReviewDto;

    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      relations: ['likedReviews'],
      select: {
        id: true,
        email: true,
        likedReviews: {
          helpful: true,
        },
      },
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const existingReview = await this.reviewRepo.findOne({
      where: {
        id,
      },
      relations: ['helpful', 'user'],
      select: {
        id: true,
        user: {
          email: true,
        },
        helpful: {
          id: true,
          email: true,
        },
      },
    });

    const userIndex = existingReview.helpful.findIndex((u) => u.id === user.id);
    if (userIndex === -1) {
      throw new BadRequestException('You have not liked this review yet');
    }

    if (existingReview.user.email === user.email) {
      throw new BadRequestException('You can not dislike your own review');
    }

    existingReview.helpful.splice(userIndex, 1);

    try {
      await this.reviewRepo.save(existingReview);
      return { id, email: user.email };
    } catch (e) {
      throw new NotFoundException(`Server error: ${e}`);
    }
  }
}
