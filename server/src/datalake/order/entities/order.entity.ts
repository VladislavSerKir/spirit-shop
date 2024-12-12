import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/datalake/user/entities/user.entity';
import { CartItem } from 'src/datalake/cart/entities/cart-item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
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
  @IsNumber()
  @ApiProperty()
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
  @ApiProperty()
  isNeedPackage: boolean;

  @Column()
  @IsBoolean()
  @ApiProperty()
  isNeedDelivery: boolean;

  @Column()
  @IsString()
  @ApiProperty()
  comment: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.purchase, {
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  purchase: CartItem[];
}
