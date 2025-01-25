import { Repository } from 'typeorm';
import { Review } from '../review/entities/review.entity';
import { User } from '../user/entities/user.entity';
import { UsersService } from '../user/users.service';
import { Order } from '../order/entities/order.entity';
import { IChartDataPeriodResponse } from 'src/common/types/interfaces';
export declare class ServiceService {
    private readonly userService;
    private orderRepo;
    private reviewRepo;
    private userRepo;
    constructor(userService: UsersService, orderRepo: Repository<Order>, reviewRepo: Repository<Review>, userRepo: Repository<User>);
    getChartsData(accessToken: string): Promise<IChartDataPeriodResponse[]>;
    addDaysToDate(dateString: string, daysToAdd: number): string;
    formatDate(isoDate: Date): string;
    getPeriodData(startDate: string, endDate: string): Promise<IChartDataPeriodResponse[]>;
    private calculateRevenue;
    private calculateSoldProducts;
    private calculateReviews;
    private calculateNewUsers;
}
