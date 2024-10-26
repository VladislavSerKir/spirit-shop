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

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @IsNotEmpty()
  createdAt: Date;

  @UpdateDateColumn()
  @IsNotEmpty()
  updatedAt: Date;

  @ManyToOne(() => Cart, (cart) => cart.cartItem)
  cart: Cart;

  @ManyToOne(() => Order, (order) => order.purchase, {
    onDelete: 'CASCADE',
  })
  purchase: Order;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column()
  @IsNumber()
  quantity: number;
}
