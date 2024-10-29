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
  OneToOne,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { CartItem } from 'src/datalake/cart/entities/cart-item.entity';
import { User } from 'src/datalake/user/entities/user.entity';
import { Product } from './product.entity';

@Entity()
export class Favourite {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @CreateDateColumn()
  @IsNotEmpty()
  createdAt: Date;

  @UpdateDateColumn()
  @IsNotEmpty()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.favourite)
  user: User;

  @OneToMany(() => Product, (product) => product.favourites, {
    cascade: true,
    // onDelete: 'CASCADE',
  })
  products: Product[];
}
