import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashService } from 'src/common/hash/hash.service';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getProfileInfo(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Ошибка загрузки профиля');
    } else {
      return user;
    }
  }

  async editProfile(user: User, userData: Partial<User>): Promise<User> {
    const { password, email } = userData;
    const userWithEmailExist = await this.findByEmail(email);

    if (userWithEmailExist) {
      throw new BadRequestException('Email занят');
    }

    if (password) {
      const hashedPassword = await HashService.generateHash(password);
      userData = { ...userData, password: hashedPassword };
    }

    const updatedUser = await this.userRepo.update(user.id, userData);

    if (!updatedUser) {
      throw new BadRequestException('Ошибка запроса на изменение профиля');
    } else {
      return this.getUserById(user.id);
    }
  }

  async updateToken(id: number, userData: Partial<User>): Promise<User> {
    const updatedUser = await this.userRepo.update(id, userData);

    if (!updatedUser) {
      throw new BadRequestException('Ошибка запроса на изменение токена');
    } else {
      return this.getUserById(id);
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(
        `Пользователь с email: ${email} не существует`,
      );
    } else {
      return user;
    }
  }

  async findUserInfo({ query }: { query: string }): Promise<User[]> {
    const user = await this.userRepo.find({ where: { email: query } });

    if (!user) {
      throw new NotFoundException(`Пользователя ${query} не существует`);
    } else {
      return user;
    }
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с id: ${id} не существует`);
    } else {
      return user;
    }
  }

  // async deleteUser(id: number): Promise<User> {
  //   await this.userRepo.delete({ id });
  // }
}
