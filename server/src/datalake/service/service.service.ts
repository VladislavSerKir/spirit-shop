import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { Review } from '../review/entities/review.entity';
import { User } from '../user/entities/user.entity';
import { UsersService } from '../user/users.service';
import { Order } from '../order/entities/order.entity';
import { IChartDataPeriodResponse } from 'src/common/types/interfaces';

@Injectable()
export class ServiceService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getChartsData(
    accessToken: string,
  ): Promise<IChartDataPeriodResponse[]> {
    const currentUserIsAdmin = await this.userService.hasAdminRole(accessToken);

    if (!currentUserIsAdmin) {
      throw new ForbiddenException('This action only available for admins');
    }

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

    try {
      return await this.getPeriodData(validOldestOrderDate, validCurrentDate);
    } catch (e) {
      throw new InternalServerErrorException('Error data calculating');
    }
  }

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

  async getPeriodData(
    startDate: string,
    endDate: string,
  ): Promise<IChartDataPeriodResponse[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error('Invalid date format. Please use "YYYY-MM-DD".');
    }

    const differenceInTime = end.getTime() - start.getTime();
    const totalDays = Math.round(differenceInTime / (1000 * 3600 * 24));

    const parts = totalDays < 10 ? totalDays : 10;
    const periodLength = Math.ceil(totalDays / parts);
    const restDays = totalDays % parts;
    const periods = [];

    for (let i = 0; i <= parts; i++) {
      let periodStart, periodEndIso;
      if (i === 0) {
        // для входной даты начала рассчитываем показатели с учетом предыдущих дат ( показатели на входную дату начала не будут = 0), и в общий расчет не берем при сложении значений по точкам)
        periodStart = this.formatDate(
          new Date(
            this.addDaysToDate(this.formatDate(start), 0 - periodLength),
          ),
        );
        periodEndIso = this.formatDate(start);
      } else {
        periodStart = this.formatDate(start);
        periodEndIso = new Date(this.addDaysToDate(periodStart, periodLength));
      }

      let periodEnd;
      if (i === parts - 1) {
        periodEnd = this.formatDate(end);
      } else {
        periodEnd = this.formatDate(periodEndIso);
      }

      if (new Date(periodEnd) > end) {
        // если конечная дата периода больше входной конечной даты прекращаем рассчет
        break;
      }

      const [revenue, soldProducts, reviews, newUser] = await Promise.all([
        this.calculateRevenue(periodStart, periodEnd),
        this.calculateSoldProducts(periodStart, periodEnd),
        this.calculateReviews(periodStart, periodEnd),
        this.calculateNewUsers(periodStart, periodEnd),
      ]);

      periods.push({
        startDate: periodStart,
        endDate: periodEnd,
        revenue: Math.round(revenue * 10) / 10, // Округление до 1 знака после запятой
        soldProducts,
        reviews,
        newUser,
      });

      if (i === parts - 1) {
        // для последнего периода (количество дней != количеству дням остальных периодов) добавляем остатки дней
        start.setDate(start.getDate() + periodLength + restDays);
      } else if (i === 0) {
        // для самого первого периода, когда мы берем в учет статистику предыдущих дней, не охватывающих диапазон входных дат задаем начальную дату
        start.setDate(start.getDate());
      } else {
        // для всех остальных периодов добавляем количество дней в периоде для расчета показателей последующего периода
        start.setDate(start.getDate() + periodLength);
      }
    }

    return periods;
  }

  private async calculateRevenue(
    startDate: string,
    endDate: string,
  ): Promise<number> {
    const orders = await this.orderRepo.find({
      where: {
        createdAt: Between(new Date(startDate), new Date(endDate)),
      },
      relations: ['purchase', 'purchase.product'],
      select: {
        createdAt: true,
        purchase: { product: { price: true }, quantity: true },
      },
    });

    return orders.reduce(
      (acc, order) =>
        acc +
        order.purchase.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        ),
      0,
    );
  }

  private async calculateSoldProducts(
    startDate: string,
    endDate: string,
  ): Promise<number> {
    const orders = await this.orderRepo.find({
      where: {
        createdAt: Between(new Date(startDate), new Date(endDate)),
      },
      relations: ['purchase'],
      select: {
        createdAt: true,
        purchase: { quantity: true },
      },
    });

    return orders.reduce(
      (acc, order) =>
        acc + order.purchase.reduce((sum, item) => sum + item.quantity, 0),
      0,
    );
  }

  private async calculateReviews(
    startDate: string,
    endDate: string,
  ): Promise<number> {
    const reviews = await this.reviewRepo.find({
      where: {
        createdAt: Between(new Date(startDate), new Date(endDate)),
      },
      select: {
        createdAt: true,
      },
    });

    return reviews.length;
  }

  private async calculateNewUsers(
    startDate: string,
    endDate: string,
  ): Promise<number> {
    const users = await this.userRepo.find({
      where: {
        createdAt: Between(new Date(startDate), new Date(endDate)),
      },
      select: {
        createdAt: true,
      },
    });

    return users.length;
  }
}
