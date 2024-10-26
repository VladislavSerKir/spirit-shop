import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';
import { Cart } from 'src/datalake/cart/entities/cart.entity';
import { Order } from 'src/datalake/order/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @CreateDateColumn()
  @IsNotEmpty()
  createdAt: Date;

  @UpdateDateColumn()
  @IsNotEmpty()
  updatedAt: Date;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  firstName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  lastName: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  @IsString()
  @IsNotEmpty()
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsString()
  @IsPhoneNumber('RU')
  mobileNumber: string;

  @Column({ default: 'user' })
  @IsString()
  refreshToken: string;

  @Column({ default: 'user' })
  @IsString()
  accessToken?: string;

  @Column({ default: 'user' })
  @IsString()
  @IsNotEmpty()
  role: string;

  @OneToOne(() => Cart, { cascade: true })
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  purchase: Order[];
}
