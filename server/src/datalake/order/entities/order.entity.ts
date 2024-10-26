import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  Column,
  Generated,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/datalake/user/entities/user.entity';
import { CartItem } from 'src/datalake/cart/entities/cart-item.entity';

@Entity()
export class Order {
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
  @IsNumber()
  number: number;

  @BeforeInsert()
  generateRandomNumber() {
    this.number = Math.floor(Math.random() * 100000000); // Генерация случайного числа от 0 до 99999999
  }

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  @IsBoolean()
  isNeedPackage: boolean;

  @Column()
  @IsBoolean()
  isNeedDelivery: boolean;

  @Column()
  @IsString()
  comment: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.purchase, {
    onDelete: 'CASCADE',
  })
  purchase: CartItem[];
}
