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

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
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
    accessToken,
    userData: Partial<User>,
  ): Promise<Partial<User>> {
    const { password, email } = userData;
    const userWithEmailExist = await this.findByEmail(email);

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
      userData = { ...userData, password: hashedPassword };
    }

    const updatedUser = await this.userRepo.update(
      { email: username },
      userData,
    );

    const user = await this.userRepo.findOne({
      where: { email: username },
    });

    if (!updatedUser) {
      throw new BadRequestException('Error profile change request');
    } else if (!user.active) {
      throw new ForbiddenException('User is not available or diactivated');
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
      secret: this.configService.get<string>('jwt.access'),
    });
    const username = decodedToken.username;

    const updatedUser = await this.userRepo.update(
      { email: username },
      { avatar },
    );

    const user = await this.userRepo.findOne({
      where: { email: username },
    });

    if (!updatedUser) {
      throw new BadRequestException('Error avatar change request');
    } else if (!user.active) {
      throw new ForbiddenException('User is not available or diactivated');
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
    const user = await this.getUserByEmail(username.username);
    if (user && (await HashService.compareHash(password, user.password))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
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
    userData: Partial<User>,
  ): Promise<any> {
    const currentUserIsAdmin = await this.hasAdminRole(accessToken);

    if (!currentUserIsAdmin) {
      throw new ForbiddenException('This action only available for admins');
    }

    const { role, id } = userData;

    try {
      await this.userRepo.update({ id }, { role: role });
      return { role, id };
    } catch (error) {
      throw new BadRequestException('Error to assign admin');
    }
  }

  async manageAccount(
    accessToken: string,
    userData: Partial<User>,
  ): Promise<any> {
    const currentUserIsAdmin = await this.hasAdminRole(accessToken);

    if (!currentUserIsAdmin) {
      throw new ForbiddenException('This action only available for admins');
    }

    const { id, active } = userData;

    try {
      await this.userRepo.update({ id }, { active: active });
      return { id, active };
    } catch (error) {
      throw new BadRequestException('Error to assign admin');
    }
  }
}
