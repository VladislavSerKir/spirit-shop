import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from 'src/common/hash/hash.service';
import { UsersService } from '../user/users.service';
import { JwtStrategy } from 'src/config/jwt-strategy';
import { AccessTokenGuard } from 'src/config/access-token.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'access-secret',
      signOptions: { expiresIn: 60 },
    }),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get<string>('jwt.key'),
    //     signOptions: { expiresIn: configService.get<string>('jwt.ttl') },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    HashService,
    AccessTokenGuard,
  ],
  exports: [AuthService, AccessTokenGuard],
})
export class AuthModule {}
