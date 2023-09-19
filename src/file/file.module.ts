import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { UtilsModule } from '../utils/utils.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileRepository } from './repositories/file.repository';
import { FileSubscriber } from './subscribers/file.subscriber';

@Module({
  imports: [
    UtilsModule,
    forwardRef(() => AuthModule),
    TypeOrmCustomModule.forFeature([FileRepository]),
  ],
  controllers: [FileController],
  providers: [FileService, FileSubscriber],
  exports: [FileService],
})
export class FileModule {}
