import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Review } from '../review/entities/review.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { Category } from '../category/entities/category.entity';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { UsersService } from '../user/users.service';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class ServiceService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly userService: UsersService,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async getChartsData(accessToken: string): Promise<any> {
    const currentUserIsAdmin = await this.userService.hasAdminRole(accessToken);

    if (!currentUserIsAdmin) {
      throw new ForbiddenException('This action only available for admins');
    }

    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;
    const user = await this.userRepo.findOne({
      where: { email: username },
    });

    const oldestOrder = await this.orderRepo.find({
      order: {
        createdAt: 'ASC',
      },
      take: 1,
    });

    const oldestOrderDate =
      oldestOrder.length > 0 ? oldestOrder[0].createdAt : null;

    const currentDate = new Date();

    const validOldestOrderDate = this.formatDate(oldestOrderDate);
    const validCurrentDate = this.formatDate(currentDate);
    const dateDifferenceInDays = this.calculateDateDifference(
      validCurrentDate,
      validOldestOrderDate,
    );

    if (dateDifferenceInDays > 10) {
      const datePeriodGap = Math.floor(dateDifferenceInDays / 10);
    }

    if (!user) {
      throw new NotFoundException('Error profile fetching');
    } else if (!user.active) {
      throw new ForbiddenException('User is not available or diactivated');
    } else {
      return {
        validOldestOrderDate,
        validCurrentDate,
        dateDifferenceInDays,
      };
    }
  }

  calculateAndGeneratePeriods(
    startDate: string,
    endDate: string,
    dateDiffence: number,
  ): any {}

  addDaysToDate(dateString: string, daysToAdd: number): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format. Please use "YYYY-MM-DD".');
    }

    date.setDate(date.getDate() + daysToAdd);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  formatDate(isoDate: Date): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  calculateDateDifference(
    startDateString: string,
    endDateString: string,
  ): number {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid date format. Please use "YYYY-MM-DD".');
    }

    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return Math.abs(Math.round(differenceInDays));
  }
}
