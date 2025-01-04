import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../user/users.service';
import { JwtStrategy } from 'src/config/jwt-strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { PassportModule } from '@nestjs/passport';
import { YandexAuthStrategy } from 'src/config/yandex.strategy';
import { HttpModule } from '@nestjs/axios';
import { GoogleStrategy } from 'src/config/google.strategy';
import { HashModule } from 'src/common/hash/hash.module';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    // MailerModule,
    PassportModule,
    HttpModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'access-secret',
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    HashModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    YandexAuthStrategy,
    GoogleStrategy,
  ],
  exports: [TypeOrmModule],
})
export class AuthModule {}
