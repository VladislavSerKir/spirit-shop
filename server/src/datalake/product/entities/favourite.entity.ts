import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
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
    onDelete: 'CASCADE',
  })
  products: Product[];
}
