import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HashService } from 'src/common/hash/hash.service';
import { Favourite } from '../product/entities/favourite.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'access-secret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User, Favourite]),
  ],
  controllers: [UsersController],
  providers: [UsersService, HashService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
