import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Cart } from 'src/datalake/cart/entities/cart.entity';
import { Order } from 'src/datalake/order/entities/order.entity';
import { Favourite } from 'src/datalake/product/entities/favourite.entity';
import { Product } from 'src/datalake/product/entities/product.entity';
import { User } from 'src/datalake/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @CreateDateColumn()
  @IsNotEmpty()
  createdAt: Date;

  @UpdateDateColumn()
  @IsNotEmpty()
  updatedAt: Date;

  @Column({ default: 0 })
  @IsInt()
  @Min(0, { message: 'Rate must be at least 0' })
  @Max(5, { message: 'Rate must not exceed 5' })
  rate: number;

  @Column()
  @IsString()
  @Length(2, 200)
  comment: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;
}
