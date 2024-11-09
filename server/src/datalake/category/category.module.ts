import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { UsersService } from '../user/users.service';
import { UsersModule } from '../user/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'access-secret',
      signOptions: { expiresIn: 60 },
    }),
    TypeOrmModule.forFeature([Category]),
    UsersModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService, UsersService],
  exports: [TypeOrmModule],
})
export class CategoryModule {}
