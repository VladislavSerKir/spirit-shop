import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from 'src/datalake/user/entities/user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  cartItem: CartItem[];

  @OneToOne(() => User, (user) => user.cart)
  user: User;
}
