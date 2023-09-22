import { Module } from '@nestjs/common';
import { AdminBannerController } from './admin-banner.controller';
import { AdminBannerService } from './admin-banner.service';
import { DBAdminBanner } from './entity/admin-banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      DBAdminBanner
    ]),
  ],
  controllers: [AdminBannerController],
  providers: [AdminBannerService]
})
export class AdminBannerModule { }
