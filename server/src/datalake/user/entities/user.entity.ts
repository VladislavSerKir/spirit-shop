import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';
import { Cart } from 'src/datalake/cart/entities/cart.entity';
import { Order } from 'src/datalake/order/entities/order.entity';
import { Favourite } from 'src/datalake/product/entities/favourite.entity';
import { Review } from 'src/datalake/review/entities/review.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
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

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @ApiProperty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  @ApiProperty()
  lastName: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  avatar: string;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @Column()
  @IsString()
  @ApiProperty()
  mobileNumber: string;

  @Column({ default: '' })
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
  @ApiProperty()
  cart: Cart;

  @OneToOne(() => Favourite, { cascade: true })
  @JoinColumn()
  @ApiProperty()
  favourite: Favourite;

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  purchase: Order[];

  @OneToMany(() => Review, (review) => review.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  reviews: Review[];

  @ManyToMany(() => Review, (review) => review.helpful, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @ApiProperty()
  likedReviews: Review[];

  @Column({ default: '' })
  @IsString()
  resetCode?: string;

  @Column({ default: true })
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}
