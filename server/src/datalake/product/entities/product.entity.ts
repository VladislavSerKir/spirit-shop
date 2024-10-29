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

@Entity()
export class Product {
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
  description: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  image: string;

  @Column({ default: 'Продукт' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'float', default: 0 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ManyToMany(() => Category, (category) => category.id)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  cartItems: CartItem[];

  @ManyToOne(() => Favourite, (item) => item.products)
  favourites: Favourite;
}
