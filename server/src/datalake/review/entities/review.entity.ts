import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';
import { Product } from 'src/datalake/product/entities/product.entity';
import { User } from 'src/datalake/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Review {
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

  @Column({ default: 0 })
  @IsInt()
  @ApiProperty()
  @Min(0, { message: 'Rate must be at least 0' })
  @Max(5, { message: 'Rate must not exceed 5' })
  rate: number;

  @Column({ default: '' })
  @IsString()
  @Length(0, 200)
  @ApiProperty()
  comment: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToMany(() => User, (user) => user.likedReviews, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  helpful: User[];
}
