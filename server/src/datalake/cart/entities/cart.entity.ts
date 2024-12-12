import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/datalake/user/entities/user.entity';
import { CartItem } from './cart-item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @CreateDateColumn()
  @IsNotEmpty()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @IsNotEmpty()
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true,
  })
  @ApiProperty()
  cartItem: CartItem[];

  @OneToOne(() => User, (user) => user.cart)
  user: User;
}
