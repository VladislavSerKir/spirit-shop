import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';
import { Product } from 'src/datalake/product/entities/product.entity';
import { User } from 'src/datalake/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ default: '' })
  @IsString()
  @Length(0, 200)
  comment: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  // @OneToMany(() => User, (user) => user.id)
  // helpful: User[];
}
