import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
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
import { GetCodeDto } from './dto/get-code.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginYandexDto } from './dto/login-yandex.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  AccessRefreshTokenResponse,
  GoogleUserResponseOKInterface,
  IAccessRefreshTokenResponse,
  IYandexAuthConfig,
  SuccessResponse,
  UpdatedAccessTokenResponse,
  YandexResponseOKInterface,
  YandexUserResponseOKInterface,
} from 'src/common/types/interfaces';
import { firstValueFrom } from 'rxjs';
import { LogoutDto } from './dto/logout.dto';
import { LoginGoogleDto } from './dto/login-google.dto';
import { SendCodeDto } from './dto/send-code.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
    // private mailerService: MailerService,
    private readonly httpService: HttpService,
  ) {}

  async signUp(signupDto: SignupDto): Promise<IAccessRefreshTokenResponse> {
    const { firstName, lastName, email, password, mobileNumber } = signupDto;

    const hashedPassword = await HashService.generateHash(password);
    const newUser = this.userRepo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobileNumber,
      role:
        email === 'kireev.vladislav@yandex.ru' ||
        email === 'kireew.vladislaw@gmail.com'
          ? 'admin'
          : 'user',
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

  async signIn(signinDto: SigninDto): Promise<IAccessRefreshTokenResponse> {
    const { email, password } = signinDto;

    const user = await this.userRepo.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        active: true,
      },
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

  async logOut(logoutDto: LogoutDto) {
    const { email } = logoutDto;
    const user = await this.usersService.findByEmail(email);
    this.usersService.updateToken(user.id, { refreshToken: '' });
    return { success: true };
  }

  async getUserDataByAccessToken(accessToken: string): Promise<Partial<User>> {
    try {
      const token = accessToken.split(' ')[1];
      const decodedToken = this.jwtService.verify(token, {
        secret: this.configService.get<string>('jwt.access'),
      });

      const username = decodedToken.username;
      const user = await this.userRepo.findOne({
        where: { email: username },
        relations: [
          'favourite',
          'favourite.products',
          'favourite.products.categories',
        ],
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          mobileNumber: true,
          role: true,
          avatar: true,
          favourite: {
            id: true,
            products: {
              id: true,
              name: true,
              price: true,
              image: true,
              description: true,
              categories: {
                id: true,
                name: true,
              },
            },
          },
        },
      });

      const {
        firstName,
        lastName,
        email,
        mobileNumber,
        role,
        cart,
        avatar,
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

  async refreshTokens(
    accessToken: string,
    refreshToken: string,
  ): Promise<UpdatedAccessTokenResponse> {
    const token = accessToken.split(' ')[1];
    const decodedToken = jwt.decode(token);
    const username = decodedToken['username'];

    const user = await this.userRepo.findOne({
      where: { email: username },
      select: {
        id: true,
        email: true,
        refreshToken: true,
      },
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
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username: email,
        },
        {
          secret: this.configService.get<string>('jwt.refresh'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async getResetCode(resetPasswordDto: GetCodeDto): Promise<SuccessResponse> {
    const { email } = resetPasswordDto;

    const user = await this.userRepo.findOne({
      where: { email },
      select: {
        email: true,
        active: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    if (!user.active) {
      throw new ForbiddenException('User is not available or diactivated');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // const generatedCodeHash = await HashService.generateHash(code);

    const updatedUser = await this.userRepo.update(
      { email },
      { resetCode: code }, //generatedCodeHash
    );

    if (!updatedUser) {
      throw new InternalServerErrorException('Error to update reset code');
    }

    setTimeout(async () => {
      await this.userRepo.update({ email }, { resetCode: '' });
    }, 60000);

    return { success: true };

    // await this.mailerService.sendMail({
    //   to: email,
    //   subject: 'Сброс пароля',
    //   template: `Ваш код для сброса пароля: ${code}`,
    //   text: 'welcome',
    // });
  }

  async sendResetCode(validateCodeDto: SendCodeDto): Promise<SuccessResponse> {
    const { email, code } = validateCodeDto;

    const user = await this.userRepo.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        resetCode: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Error profile fetching');
    }

    // const validCode = await HashService.compareHash(code, user.resetCode);

    // if (validCode) {
    if (code === user.resetCode) {
      return { success: true };
    } else {
      throw new ForbiddenException('Invalid code');
    }
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<{ success: boolean }> {
    const { newPassword, email } = resetPasswordDto;

    const user = await this.userRepo.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Error profile fetching');
    }

    const hashedPassword = await HashService.generateHash(newPassword);

    const updatedUser = await this.userRepo.update(
      { email },
      { password: hashedPassword },
    );

    if (updatedUser) {
      return { success: true };
    } else {
      throw new InternalServerErrorException('Error to update password');
    }
  }

  async loginYandex(
    loginYandexDto: LoginYandexDto,
  ): Promise<AccessRefreshTokenResponse> {
    const { code } = loginYandexDto;

    const clientID = this.configService.get<string>('yandex.client_id');
    const clientSecret = this.configService.get<string>('yandex.client_secret');

    const yandexAuthUrl = `https://oauth.yandex.ru/token`;
    const yandexAuthConfig = {
      'Content-type': 'application/x-www-form-urlencoded',
    };

    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('code', code);
    body.append('client_id', clientID);
    body.append('client_secret', clientSecret);

    let access_token: string;

    try {
      const { data, status }: AxiosResponse<YandexResponseOKInterface> =
        await firstValueFrom(
          this.httpService.post<YandexResponseOKInterface>(
            yandexAuthUrl,
            body.toString(),
            yandexAuthConfig as AxiosRequestConfig<IYandexAuthConfig>,
          ),
        );

      if (status === 200) {
        ({ access_token } = data);
      } else {
        throw new InternalServerErrorException();
      }
    } catch (err) {
      const {
        response: { status, statusText },
      } = err as AxiosError;
      switch (status) {
        case 401:
          throw new UnauthorizedException(statusText);
        default:
          throw new InternalServerErrorException({
            message: 'Unexpected error occured',
          });
      }
    }

    const yandexUserUrl = `https://login.yandex.ru/info?format=json`;
    const yandexUserConfig = {
      headers: {
        Authorization: `OAuth ${access_token}`,
      },
    };

    let yandexUserData: YandexUserResponseOKInterface;

    try {
      const { data, status }: AxiosResponse<YandexUserResponseOKInterface> =
        await firstValueFrom(
          this.httpService.get<YandexUserResponseOKInterface>(
            yandexUserUrl,
            yandexUserConfig,
          ),
        );

      if (status === 200) {
        yandexUserData = data;
      } else {
        throw new InternalServerErrorException();
      }
    } catch (err) {
      const {
        response: { status, statusText },
      } = err as AxiosError;
      switch (status) {
        case 401:
          throw new UnauthorizedException(statusText);
        default:
          throw new InternalServerErrorException({
            message: 'Unexpected error occured',
          });
      }
    }

    const { default_email, first_name, last_name } = yandexUserData;

    const user = await this.userRepo.findOne({
      where: { email: default_email },
      select: {
        id: true,
        email: true,
        password: true,
        active: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      const hashedPassword = await HashService.generateHash('password');
      const newUser = this.userRepo.create({
        firstName: first_name,
        lastName: last_name,
        email: default_email,
        password: hashedPassword,
        mobileNumber: '',
        role: default_email === 'kireev.vladislav@yandex.ru' ? 'admin' : 'user',
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

    if (!user.active) {
      throw new ForbiddenException('User is not available or diactivated');
    }

    const { id, email } = user;
    const { accessToken, refreshToken } = await this.getTokens(id, email);
    await this.updateRefreshToken(id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async loginGoogle(
    loginGoogleDto: LoginGoogleDto,
  ): Promise<AccessRefreshTokenResponse> {
    const { access_token } = loginGoogleDto;

    const googleUserUrl = `https://www.googleapis.com/oauth2/v2/userinfo`;
    const googleUserConfig = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    let googleUserData: GoogleUserResponseOKInterface;

    try {
      const { data, status }: AxiosResponse<GoogleUserResponseOKInterface> =
        await firstValueFrom(
          this.httpService.get<GoogleUserResponseOKInterface>(
            googleUserUrl,
            googleUserConfig,
          ),
        );

      if (status === 200) {
        googleUserData = data;
      } else {
        throw new InternalServerErrorException();
      }
    } catch (err) {
      const {
        response: { status, statusText },
      } = err as AxiosError;
      switch (status) {
        case 401:
          throw new UnauthorizedException(statusText);
        default:
          throw new InternalServerErrorException({
            message: 'Unexpected error occured',
          });
      }
    }

    const { email, given_name, family_name, picture } = googleUserData;

    const user = await this.userRepo.findOne({
      where: { email: email },
      select: {
        id: true,
        email: true,
        password: true,
        active: true,
        firstName: true,
        lastName: true,
        avatar: true,
      },
    });

    if (!user) {
      const hashedPassword = await HashService.generateHash('password');
      const newUser = this.userRepo.create({
        firstName: given_name,
        lastName: family_name,
        email,
        password: hashedPassword,
        avatar: picture,
        mobileNumber: '',
        role: email === 'kireew.vladislaw@gmail.com' ? 'admin' : 'user',
      });

      const cart = new Cart();
      const favourite = new Favourite();

      newUser.cart = cart;
      newUser.favourite = favourite;

      try {
        await this.userRepo.save(newUser);
        const { id } = newUser;

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

    if (!user.active) {
      throw new ForbiddenException('User is not available or diactivated');
    }

    const { id } = user;
    const { accessToken, refreshToken } = await this.getTokens(id, email);
    await this.updateRefreshToken(id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }
}
