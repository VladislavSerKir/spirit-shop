import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashService } from 'src/common/hash/hash.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EditAvatarDto } from './dto/edit-avatar.dto';
import { AssignAdminDto } from './dto/assign-admin.dto';
import { ManageAccountDto } from './dto/manage-account.dto';
import {
  BasicUserInfoHiddenResponse,
  BasicUserInfoResponse,
  YandexUserResponseOKInterface,
} from 'src/common/types/interfaces';
import { Order } from '../order/entities/order.entity';
import { Review } from '../review/entities/review.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { HideProfileDto } from './dto/hide-profile.dto';
import { Category } from '../category/entities/category.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async getProfileInfo(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Error profile fetching');
    } else if (!user.active) {
      throw new ForbiddenException('User is not available or diactivated');
    } else {
      return user;
    }
  }

  async getBasicUserInfo(
    id: number,
    accessToken: string,
  ): Promise<BasicUserInfoResponse | BasicUserInfoHiddenResponse> {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    const currentUser = await this.userRepo.findOne({
      where: { email: username },
      select: {
        id: true,
        email: true,
      },
    });

    const user = await this.userRepo.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
        createdAt: true,
        firstName: true,
        lastName: true,
        avatar: true,
        hideProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Error profile fetching');
    }

    const firstOrder = await this.orderRepo.findOne({
      where: { user: { id } },
      order: { createdAt: 'ASC' },
    });

    const orderCount = await this.orderRepo.count({
      where: { user: { id } },
    });

    const reviewCount = await this.reviewRepo.count({
      where: { user: { id } },
    });

    const reviews = await this.reviewRepo.find({
      where: { user: { id } },
      relations: ['helpful'],
    });

    const reviewHelpfulCount = reviews.filter(
      (review) => review.helpful.length > 0,
    ).length;

    const boughtProductCount = await this.cartItemRepo
      .createQueryBuilder('cartItem')
      .innerJoin('cartItem.purchase', 'order')
      .where('order.userId = :id', { id })
      .select('SUM(cartItem.quantity)', 'total')
      .getRawOne();

    const buyableProduct = await this.cartItemRepo
      .createQueryBuilder('cartItem')
      .innerJoin('cartItem.purchase', 'order')
      .innerJoin('cartItem.product', 'product')
      .where('order.userId = :id', { id })
      .select('product.name', 'name')
      .addSelect('product.image', 'image')
      .addSelect('SUM(cartItem.quantity)', 'times')
      .groupBy('product.id')
      .orderBy('times', 'DESC')
      .limit(1)
      .getRawOne();

    const userReviews = await this.reviewRepo.find({
      where: { user: { id } },
      relations: ['user', 'product', 'helpful'],
      select: {
        id: true,
        createdAt: true,
        rate: true,
        comment: true,
        user: {
          id: true,
        },
        product: {
          id: true,
          name: true,
          image: true,
        },
        helpful: {
          email: true,
        },
      },
    });

    const userOrders = await this.cartItemRepo
      .createQueryBuilder('cartItem')
      .innerJoin('cartItem.purchase', 'order')
      .innerJoin('cartItem.product', 'product')
      .where('order.userId = :id', { id })
      .select([
        'product.id AS id',
        'product.name AS name',
        'product.image AS image',
        'product.price AS price',
        'SUM(cartItem.quantity) AS quantity',
      ])
      .groupBy('product.id')
      .orderBy('quantity', 'DESC')
      .getRawMany();

    if (user.hideProfile && currentUser.email !== user.email) {
      return {
        id: user.id,
        hideProfile: user.hideProfile,
      };
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      hideProfile: user.hideProfile,
      whenRegistered: user?.createdAt ? user.createdAt : '',
      firstOrderDate: firstOrder?.createdAt ? firstOrder.createdAt : '',
      totalOrders: orderCount,
      totalReviews: reviewCount,
      helpfulReviews: reviewHelpfulCount,
      totalBoughtProducts: boughtProductCount?.total
        ? parseInt(boughtProductCount.total, 10)
        : 0,
      mostBuyableProduct: buyableProduct
        ? {
            name: buyableProduct.name,
            image: buyableProduct.image,
            times: parseInt(buyableProduct.times, 10),
          }
        : null,
      userReviews,
      userOrders: userOrders.map((product) => ({
        id: product.id,
        quantity: parseInt(product.quantity, 10),
      })),
    };
  }

  async getUsers(accessToken: string): Promise<User[]> {
    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;
    let users = await this.userRepo.find({
      select: [
        'id',
        'createdAt',
        'firstName',
        'lastName',
        'avatar',
        'email',
        'role',
        'active',
        'mobileNumber',
      ],
    });
    const currentUser = users.find((user) => user.email === username);

    if (currentUser.role !== 'admin' && currentUser.active) {
      throw new ForbiddenException('Show users only available for admins');
    }

    users = users.filter((user) => user.email !== username);
    return users;
  }

  async editProfile(
    accessToken: string,
    updateUserDto: Partial<User>,
  ): Promise<Partial<User>> {
    const { password, email } = updateUserDto;
    // const userWithEmailExist = await this.findByEmail(email);

    const userWithEmailExist = await this.userRepo.findOne({
      where: { email },
      select: {
        id: true,
        role: true,
      },
    });

    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    if (userWithEmailExist && username !== email) {
      throw new BadRequestException('Email is not available');
    }

    if (password) {
      const hashedPassword = await HashService.generateHash(password);
      updateUserDto = { ...updateUserDto, password: hashedPassword };
    }

    const updatedUser = await this.userRepo.update(
      { email: username },
      updateUserDto,
    );

    const user = await this.userRepo.findOne({
      where: { email: username },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        mobileNumber: true,
        active: true,
      },
    });

    if (!updatedUser) {
      throw new BadRequestException('Error profile change request');
    } else if (!user.active) {
      throw new ForbiddenException('User is not available or diactivated');
    } else {
      const { firstName, lastName, email, mobileNumber } = updateUserDto;
      return { firstName, lastName, email, mobileNumber };
    }
  }

  async editAvatar(
    accessToken: string,
    editAvatarDto: EditAvatarDto,
  ): Promise<Partial<User>> {
    const { avatar } = editAvatarDto;
    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    const updatedUser = await this.userRepo.update(
      { email: username },
      { avatar },
    );

    const user = await this.userRepo.findOne({
      where: { email: username },
      select: {
        active: true,
      },
    });

    if (!updatedUser) {
      throw new BadRequestException('Error avatar change request');
    } else if (!user.active) {
      throw new ForbiddenException('User is not available or diactivated');
    } else {
      const { avatar } = editAvatarDto;
      return { avatar };
    }
  }

  async updateToken(id: number, userData: Partial<User>): Promise<User> {
    const updatedUser = await this.userRepo.update(id, userData);

    if (!updatedUser) {
      throw new BadRequestException('Error token change request');
    } else {
      return this.getUserById(id);
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with email: ${email} does not exist`);
    } else {
      return user;
    }
  }

  async findUserInfo({ query }: { query: string }): Promise<User[]> {
    const user = await this.userRepo.find({ where: { email: query } });

    if (!user) {
      throw new NotFoundException(`User ${query} does not exist`);
    } else {
      return user;
    }
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} does not exist`);
    } else {
      return user;
    }
  }

  async getUserByEmail(email: string): Promise<Partial<User>> {
    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(
        `User with email: ${JSON.stringify(email)} does not exist`,
      );
    } else {
      return user;
    }
  }

  async hasAdminRole(accessToken: string): Promise<boolean> {
    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });

    const username = decodedToken.username;

    const user = await this.findByEmail(username);

    if (!user && user.role !== 'admin') {
      return false;
    }

    return true;
  }

  async manageAdmin(
    accessToken: string,
    assignAdminDto: AssignAdminDto,
  ): Promise<AssignAdminDto> {
    const currentUserIsAdmin = await this.hasAdminRole(accessToken);

    if (!currentUserIsAdmin) {
      throw new ForbiddenException('This action only available for admins');
    }

    const { role, id } = assignAdminDto;

    try {
      await this.userRepo.update({ id }, { role: role });
      return { role, id };
    } catch (error) {
      throw new BadRequestException('Error to assign admin');
    }
  }

  async manageAccount(
    accessToken: string,
    manageAccountDto: ManageAccountDto,
  ): Promise<ManageAccountDto> {
    const currentUserIsAdmin = await this.hasAdminRole(accessToken);

    if (!currentUserIsAdmin) {
      throw new ForbiddenException('This action only available for admins');
    }

    const { id, active } = manageAccountDto;

    try {
      await this.userRepo.update({ id }, { active: active });
      return { id, active };
    } catch (error) {
      throw new BadRequestException('Error to assign admin');
    }
  }

  async hideAccount(
    accessToken: string,
    hideProfileDto: HideProfileDto,
  ): Promise<HideProfileDto> {
    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    const user = await this.userRepo.findOne({
      where: { email: username },
      select: { id: true, active: true },
    });

    const updatedUser = await this.userRepo.update(
      { email: username },
      hideProfileDto,
    );

    if (!updatedUser) {
      throw new BadRequestException('Error profile change request');
    } else if (!user.active) {
      throw new ForbiddenException('User is not available or diactivated');
    } else {
      const { hideProfile } = hideProfileDto;
      return { hideProfile };
    }
  }

  async getShopStatisticsInfo(accessToken: string): Promise<any> {
    const currentUserIsAdmin = await this.hasAdminRole(accessToken);

    if (!currentUserIsAdmin) {
      throw new ForbiddenException('This action only available for admins');
    }

    const totalOrders = await this.orderRepo.count({
      select: {
        id: true,
      },
    });

    const totalBoughtProducts = await this.cartItemRepo
      .createQueryBuilder('cartItem')
      .innerJoin('cartItem.purchase', 'order')
      .select('SUM(cartItem.quantity)', 'total')
      .getRawOne();

    const totalRevenue = await this.cartItemRepo
      .createQueryBuilder('cartItem')
      .innerJoin('cartItem.product', 'product')
      .innerJoin('cartItem.purchase', 'order')
      .select('SUM(cartItem.quantity * product.price)', 'totalRevenue')
      .getRawOne();

    const formattedTotalRevenue = totalRevenue.totalRevenue
      ? +Number(totalRevenue.totalRevenue).toFixed(1)
      : 0;

    const averageOrderPrice =
      totalOrders > 0 ? formattedTotalRevenue / totalOrders : 0;

    const totalReviews = await this.reviewRepo.count({
      select: {
        id: true,
      },
    });

    const totalUsers = await this.userRepo.count({
      select: {
        id: true,
      },
    });

    const totalUsersActive = await this.userRepo.count({
      where: { active: true },
      select: {
        id: true,
      },
    });

    const totalProducts = await this.productRepo.count({
      select: {
        id: true,
      },
    });

    const totalCategories = await this.categoryRepo.count({
      select: {
        id: true,
      },
    });

    const productSalesData = await this.cartItemRepo
      .createQueryBuilder('cartItem')
      .innerJoinAndSelect('cartItem.product', 'product')
      .innerJoinAndSelect('cartItem.purchase', 'order')
      .select([
        'product.id AS id',
        'SUM(cartItem.quantity) AS bought',
        'SUM(cartItem.quantity * product.price) AS revenue',
      ])
      .groupBy('product.id')
      .getRawMany();

    const productStatistics = await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.reviews', 'review')
      .select([
        'product.id AS id',
        'AVG(review.rate) AS averageRating',
        'COUNT(review.id) AS reviewCount',
      ])
      .groupBy('product.id')
      .getRawMany();

    return {
      totalOrders: totalOrders,
      totalBoughtProducts: totalBoughtProducts.total
        ? totalBoughtProducts.total
        : 0,
      totalRevenue: totalRevenue ? formattedTotalRevenue : 0,
      averageOrderPrice: averageOrderPrice ? averageOrderPrice.toFixed(1) : 0,
      totalReviews: totalReviews ? totalReviews : 0,
      totalUsers: totalUsers ? totalUsers : 0,
      totalUsersActive: totalUsersActive ? totalUsersActive : 0,
      totalProducts: totalProducts ? totalProducts : 0,
      totalCategories: totalCategories ? totalCategories : 0,
      productStatistics: productStatistics
        ? productStatistics.map((product) => {
            const salesData = productSalesData
              ? productSalesData.find((p) => p.id === product.id)
              : [];
            return {
              id: product.id,
              bought: salesData?.bought ? parseInt(salesData.bought, 10) : 0,
              revenue: salesData?.revenue
                ? parseFloat(salesData.revenue).toFixed(1)
                : 0,
              averageRating: +Number(product.averagerating).toFixed(2),
              reviewCount: Number(product.reviewcount),
            };
          })
        : [],
    };
  }

  async findByYandexID(yandexProfile): Promise<string> {
    return yandexProfile.email;
  }

  async createFromYandex(
    yandexProfile,
  ): Promise<YandexUserResponseOKInterface> {
    return yandexProfile;
  }
}
