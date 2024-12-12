import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { CartItem } from 'src/datalake/cart/entities/cart-item.entity';
import { Favourite } from './favourite.entity';
import { Review } from 'src/datalake/review/entities/review.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
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
  @ApiProperty()
  description: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  image: string;

  @Column({ default: 'Продукт' })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Column({ type: 'float', default: 0 })
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @ManyToMany(() => Category, (category) => category.id)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  cartItems: CartItem[];

  @ManyToOne(() => Favourite, (item) => item.products)
  @ApiProperty()
  favourites: Favourite;

  @OneToMany(() => Review, (review) => review.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  reviews: Review[];
}
