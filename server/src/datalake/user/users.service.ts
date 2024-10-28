import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashService } from 'src/common/hash/hash.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getProfileInfo(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email },
      // relations: { cart: true },
    });

    if (!user) {
      throw new NotFoundException('Error profile fetching');
    } else {
      return user;
    }
  }

  async editProfile(
    accessToken,
    userData: Partial<User>,
  ): Promise<Partial<User>> {
    const { password, email } = userData;
    const userWithEmailExist = await this.findByEmail(email);

    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
    const username = decodedToken.username;

    if (userWithEmailExist && username !== email) {
      throw new BadRequestException('Email is not available');
    }

    if (password) {
      const hashedPassword = await HashService.generateHash(password);
      userData = { ...userData, password: hashedPassword };
    }

    const updatedUser = await this.userRepo.update(
      { email: username },
      userData,
    );

    if (!updatedUser) {
      throw new BadRequestException('Error profile change request');
    } else {
      const { firstName, lastName, email, mobileNumber } = userData;
      return { firstName, lastName, email, mobileNumber };
    }
  }

  async editAvatar(
    accessToken,
    userData: Partial<User>,
  ): Promise<Partial<User>> {
    const { avatar } = userData;
    const token = accessToken.split(' ')[1];
    const decodedToken = this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
    const username = decodedToken.username;

    const updatedUser = await this.userRepo.update(
      { email: username },
      { avatar },
    );

    if (!updatedUser) {
      throw new BadRequestException('Error avatar change request');
    } else {
      const { avatar } = userData;
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
    const user = await this.userRepo.findOne({ where: { email } });

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

  async validateUser(username: any, password: string): Promise<any> {
    // Находим пользователя по имени пользователя
    const user = await this.getUserByEmail(username.username);
    if (user && (await HashService.compareHash(password, user.password))) {
      // Если пользователь найден и пароль совпадает, возвращаем объект пользователя
      const { password, ...result } = user;
      return result;
    }
    // Если пользователь не найден или пароль неверен, возвращаем null
    return null;
  }
}
