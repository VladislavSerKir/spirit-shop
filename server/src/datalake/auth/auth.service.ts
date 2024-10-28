import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
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

    newUser.cart = cart;

    try {
      await this.userRepo.save(newUser);
      const {
        id,
        firstName,
        lastName,
        email,
        mobileNumber,
        role,
        cart,
        avatar,
      } = newUser;

      const { accessToken, refreshToken } = await this.getTokens(id, email);
      await this.updateRefreshToken(id, refreshToken);

      return {
        firstName,
        lastName,
        email,
        mobileNumber,
        accessToken,
        refreshToken,
        role,
        cart,
        avatar,
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
    const user = await this.usersService.findByEmail(email);

    if (user && (await HashService.compareHash(password, user.password))) {
      const {
        id,
        firstName,
        lastName,
        email,
        mobileNumber,
        role,
        cart,
        avatar,
        purchase,
      } = user;

      const { accessToken, refreshToken } = await this.getTokens(id, email);
      await this.updateRefreshToken(id, refreshToken);

      return {
        firstName,
        lastName,
        email,
        mobileNumber,
        accessToken,
        refreshToken,
        role,
        cart,
        avatar,
        purchase,
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
        secret: process.env.JWT_ACCESS_SECRET,
      });

      const username = decodedToken.username;
      const user = await this.userRepo.findOne({
        where: { email: username },
        relations: [
          'purchase',
          'purchase.purchase.product',
          'purchase.purchase.product.categories',
          'cart',
          'cart.cartItem',
          'cart.cartItem.product',
          'cart.cartItem.product.categories',
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
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('jwt expired');
      }
      throw new InternalServerErrorException(`Internal server error: ${error}`);
    }
  }

  async verifyAccessToken(accessToken: string) {
    try {
      const decodedToken = this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      return decodedToken;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Access token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid access token');
      } else {
        throw error;
      }
    }
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      const decodedToken = this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      return decodedToken;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Refresh token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid refresh token');
      } else {
        throw error;
      }
    }
  }

  hashToken(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashToken(refreshToken);

    await this.usersService.updateToken(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async refreshTokens(token: string) {
    // const user = await this.usersService.getUserById(userId);

    const decodedToken = await this.verifyAccessToken(token);
    const userId = Number(decodedToken.sub);
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!user || !user.refreshToken)
      throw new ForbiddenException(
        'Token updating unavailable, access forbidden',
      );
    const refreshTokenMatches = await argon2.verify(user.refreshToken, token);

    if (!refreshTokenMatches)
      throw new ForbiddenException(
        'Token updating unavailable, access forbidden',
      );
    const { id, email } = user;

    const { accessToken, refreshToken } = await this.getTokens(id, email);
    await this.updateRefreshToken(id, refreshToken);
    return { accessToken, refreshToken };
  }

  async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username: email,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          // secret: this.configService.get<string>('jwt.access'),
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username: email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          // secret: this.configService.get<string>('jwt.refresh'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
