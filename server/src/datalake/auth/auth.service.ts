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

    try {
      await this.userRepo.save(newUser);
      const { id, firstName, lastName, email, mobileNumber, role } = newUser;

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
      };
    } catch (e) {
      if (e.code === duplicateKeyStatusCode) {
        throw new ConflictException(
          'Пользователь с указанным email уже существует',
        );
      } else {
        throw new InternalServerErrorException('Внутренняя ошибка сервера');
      }
    }
  }

  async signIn(signinDto: SigninDto): Promise<Partial<User>> {
    const { email, password } = signinDto;
    const user = await this.usersService.findByEmail(email);

    if (user && (await HashService.compareHash(password, user.password))) {
      const { id, firstName, lastName, email, mobileNumber, role } = user;

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
      };
    } else {
      throw new UnauthorizedException('Проверьте логин или пароль');
    }
  }

  async logOut(userData: any) {
    const { email } = userData;
    const user = await this.usersService.findByEmail(email);
    return this.usersService.updateToken(user.id, { refreshToken: '' });
  }

  async getUserDataByAccessToken(accessToken: string) {
    try {
      const decodedToken = await this.verifyAccessToken(accessToken);
      const userId = Number(decodedToken.sub);
      const user = await this.userRepo.findOne({
        where: { id: userId },
      });
      const { firstName, lastName, email, mobileNumber, role } = user;

      return { firstName, lastName, email, mobileNumber, role };
    } catch (error) {
      throw new InternalServerErrorException(
        `Внутренняя ошибка сервера: ${error}`,
      );
    }
  }

  async verifyAccessToken(accessToken: string) {
    try {
      const decodedToken = jwt.verify(
        accessToken,
        this.configService.get<string>('jwt.access'),
      );

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
      const decodedToken = jwt.verify(
        refreshToken,
        this.configService.get<string>('jwt.refresh'),
      );

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
        'Обновление токена невозможно, доступ запрещен',
      );
    const refreshTokenMatches = await argon2.verify(user.refreshToken, token);

    if (!refreshTokenMatches)
      throw new ForbiddenException(
        'Обновление токена невозможно, доступ запрещен',
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
          email,
        },
        {
          secret: this.configService.get<string>('jwt.access'),
          expiresIn: '2m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('jwt.refresh'),
          expiresIn: '5m',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
