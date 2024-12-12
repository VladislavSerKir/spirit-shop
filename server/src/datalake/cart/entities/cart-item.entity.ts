import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from 'src/datalake/product/entities/product.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Order } from 'src/datalake/order/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
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

  @ManyToOne(() => Cart, (cart) => cart.cartItem)
  cart: Cart;

  @ManyToOne(() => Order, (order) => order.purchase, {
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  purchase: Order;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column()
  @IsNumber()
  @ApiProperty()
  quantity: number;
}
