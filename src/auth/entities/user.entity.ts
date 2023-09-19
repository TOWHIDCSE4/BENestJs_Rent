import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from '../../file/entities/file.entity';
import { UserType } from '../enums/user.enum';
import { Customer } from './customer.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserType, default: UserType.CUSTOMER })
  type: UserType;

  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer;

  @OneToMany(() => File, (file) => file.uploader)
  files: File[];
}
