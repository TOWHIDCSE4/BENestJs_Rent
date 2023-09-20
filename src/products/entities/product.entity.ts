import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity({ name: 'product', schema: 'public' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  discountRate: number;

  @Column()
  price: number;

  @Column({ default: null })
  coverImage: string;
}
