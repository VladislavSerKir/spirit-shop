import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { duplicateKeyStatusCode } from 'src/common/constants/constants';
import { HashService } from 'src/common/hash/hash.service';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../user/users.service';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { Cart } from '../cart/entities/cart.entity';
import { Favourite } from '../product/entities/favourite.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async signUp(signupDto: SignupDto): Promise<Partial<User>> {
    const { firstName, lastName, email, password, mobileNumber } = signupDto;

    const hashedPassword = await HashService.generateHash(password);
    const newUser = this.userRepo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobileNumber,
    });

    const cart = new Cart();
    const favourite = new Favourite();

    newUser.cart = cart;
    newUser.favourite = favourite;

    try {
      await this.userRepo.save(newUser);
      const { id, email } = newUser;

      const { accessToken, refreshToken } = await this.getTokens(id, email);
      await this.updateRefreshToken(id, refreshToken);

      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      if (e.code === duplicateKeyStatusCode) {
        throw new ConflictException('User with email already exist');
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }

  async signIn(signinDto: SigninDto): Promise<Partial<User>> {
    const { email, password } = signinDto;

    const user = await this.userRepo.findOne({
      where: { email },
      relations: [
        'purchase',
        'purchase.purchase.product',
        'purchase.purchase.product.categories',
        'cart',
        'cart.cartItem',
        'cart.cartItem.product',
        'cart.cartItem.product.categories',
        'favourite',
        'favourite.products',
        'favourite.products.categories',
      ],
    });

    if (!user) {
      throw new NotFoundException('Profile not found');
    }

    if (!user.active) {
      throw new ForbiddenException('User is not available or diactivated');
    }

    if (user && (await HashService.compareHash(password, user.password))) {
      const { id, email } = user;

      const { accessToken, refreshToken } = await this.getTokens(id, email);
      await this.updateRefreshToken(id, refreshToken);

      return {
        accessToken,
        refreshToken,
      };
    } else {
      throw new UnauthorizedException('Check login or password');
    }
  }

  async logOut(userData: any) {
    const { email } = userData;
    const user = await this.usersService.findByEmail(email);
    this.usersService.updateToken(user.id, { refreshToken: '' });
    return { success: true };
  }

  async getUserDataByAccessToken(accessToken: string) {
    try {
      const token = accessToken.split(' ')[1];
      const decodedToken = this.jwtService.verify(token, {
        secret: this.configService.get<string>('jwt.access'),
      });

      const username = decodedToken.username;
      const user = await this.userRepo.findOne({
        where: { email: username },
        relations: [
          'purchase',
          'purchase.purchase.product',
          'purchase.purchase.product.categories',
          'favourite',
          'favourite.products',
          'favourite.products.categories',
        ],
      });

      const {
        firstName,
        lastName,
        email,
        mobileNumber,
        role,
        cart,
        avatar,
        purchase,
        favourite,
      } = user;

      return {
        firstName,
        lastName,
        email,
        mobileNumber,
        role,
        avatar,
        cart,
        purchase,
        favourite,
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('jwt expired');
      }
      throw new InternalServerErrorException(`Internal server error: ${error}`);
    }
  }

  hashToken(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.usersService.updateToken(userId, {
      refreshToken: refreshToken,
    });
  }

  async refreshTokens(accessToken: string, refreshToken: string) {
    const token = accessToken.split(' ')[1];
    const decodedToken = jwt.decode(token);
    const username = decodedToken['username'];

    const user = await this.userRepo.findOne({
      where: { email: username },
    });

    if (!user) {
      throw new ForbiddenException(
        'Token updating unavailable, access forbidden',
      );
    }

    // const hashedRefreshToken = await argon2.hash(refreshToken);

    if (refreshToken !== user.refreshToken) {
      throw new ForbiddenException(
        'Token updating unavailable, access forbidden',
      );
    }

    const decodedRefreshToken = jwt.decode(refreshToken);
    const isRefreshTokenExpired = this.validateTokenExpired(
      decodedRefreshToken['exp'],
    );

    if (isRefreshTokenExpired) {
      const newRefreshToken = '';
      await this.userRepo.update(
        { email: username },
        { refreshToken: newRefreshToken },
      );
      throw new ForbiddenException('Refresh token expired');
    }

    const { id, email } = user;
    const { accessToken: updatedAccessToken } = await this.getTokens(id, email);
    return { updatedAccessToken };
  }

  validateTokenExpired(exp: number): boolean {
    const currentTime = Date.now() / 1000; // Получаем текущее время в секундах
    return currentTime > exp; // Сравниваем текущее время с exp
  }

  async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username: email,
        },
        {
          secret: this.configService.get<string>('jwt.access'),
          expiresIn: 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username: email,
        },
        {
          // secret: process.env.JWT_REFRESH_SECRET,
          secret: this.configService.get<string>('jwt.refresh'),
          expiresIn: 30,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
