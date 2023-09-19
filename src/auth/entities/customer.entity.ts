import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PartialIndexWithSoftDelete } from '../../common/decorators/typeorm.decorator';
import { BaseEntity } from '../../common/entities/base.entity';
import { File } from '../../file/entities/file.entity';
import { CustomerGender, CustomerStatus } from '../enums/customer.enum';
import { User } from './user.entity';

@Entity('customer')
@PartialIndexWithSoftDelete(['email'], { unique: true })
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  email: string;

  @Column({ name: 'name', length: 50, nullable: true })
  name: string;

  @Column({ name: 'birth_date', type: 'timestamptz', nullable: true })
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: CustomerStatus,
    default: CustomerStatus.ACTIVE,
  })
  status: CustomerStatus;

  @Column({ length: 255 })
  password: string;

  // Join user
  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn({ name: 'user_id' })
  user: User;
  // End join user

  // Join merchant_user

  @Column({ type: 'enum', enum: CustomerGender, nullable: true })
  gender: CustomerGender;

  // join avatar
  @Column({ name: 'avatar_id', nullable: true })
  avatarId: number;

  @ManyToOne(() => File)
  @JoinColumn({ name: 'avatar_id' })
  avatar: File;
  // end join avatar
}
