export interface IServiceState {
  pathname: string;
  codeSent: boolean;
  resetEmail: string;
  resetPassword: boolean;
  shopStatisticsData: IShopStatisticsData;
  shopStatisticsRequest: boolean;
  chartsDataRequest: boolean;
}

export interface IShopStatisticsData {
  totalOrders: string;
  totalBoughtProducts: string;
  totalRevenue: string;
  averageOrderPrice: string;
  totalReviews: string;
  totalUsers: string;
  totalUsersActive: string;
  totalProducts: string;
  totalCategories: string;
  productStatistics: IProductStatistics[] | [];
}

export interface IProductStatistics {
  id: number;
  bought: number;
  revenue: number;
  averageRating: number;
  reviewCount: number;
  price: number;
  image: string;
  name: string;
}
