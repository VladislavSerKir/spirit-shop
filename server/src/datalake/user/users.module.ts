import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HashService } from 'src/common/hash/hash.service';
import { Favourite } from '../product/entities/favourite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Favourite])],
  controllers: [UsersController],
  providers: [UsersService, JwtService, HashService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
