import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from 'src/common/hash/hash.service';
import { UsersService } from '../user/users.service';
import { JwtStrategy } from 'src/config/jwt-strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { PassportModule } from '@nestjs/passport';
import { YandexAuthStrategy } from 'src/config/yandex.strategy';

@Module({
  imports: [
    MailerModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'access-secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    HashService,
    YandexAuthStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
