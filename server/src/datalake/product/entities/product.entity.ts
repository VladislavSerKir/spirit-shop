import {
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

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
}
