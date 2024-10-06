import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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
import { IAccessToken } from 'src/common/types/interfaces';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async signUp(signupDto: SignupDto): Promise<User> {
    const { firstName, lastName, email, password, phone } = signupDto;
    const hashedPassword = await HashService.generateHash(password);
    const newUser = this.userRepo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    try {
      await this.userRepo.save(newUser);
      return newUser;
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

  async signIn(signinDto: SigninDto): Promise<IAccessToken> {
    const { email, password } = signinDto;
    const user = await this.usersService.getUser(email);

    if (user && (await HashService.compareHash(password, user.password))) {
      const access_token: string = await this.jwtService.sign(
        { userId: user.id },
        { secret: `${this.configService.get<string>('jwt.key')}` },
      );

      return { access_token };
    } else {
      throw new UnauthorizedException('Проверьте логин или пароль');
    }
  }
}
