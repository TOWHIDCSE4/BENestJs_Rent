import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { UniqueWithSoftDelete } from '../../common/decorators/typeorm.decorator';
import { BaseEntityWithoutUpdate } from '../../common/entities/base.entity';
import { SupportFileType } from '../../common/enums/file.enum';

@Entity('file')
@Check(
  `
  (
    COALESCE((key IS NOT NULL)::INTEGER, 0)
    +
    COALESCE((url IS NOT NULL)::INTEGER, 0)
  ) = 1
  `,
)
export class File extends BaseEntityWithoutUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @UniqueWithSoftDelete()
  key: string;

  @Column({ nullable: true })
  url: string;

  @Column({ enum: SupportFileType })
  type: SupportFileType;

  @Column({ default: 0 })
  size: number;

  // Join user
  @Column({ name: 'uploader_id' })
  uploaderId: number;

  @ManyToOne(() => User, (user) => user.files)
  @JoinColumn({ name: 'uploader_id' })
  uploader: User;
  // End join user
}
