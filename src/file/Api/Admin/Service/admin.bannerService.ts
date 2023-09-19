import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminBannerEntity} from '../Entities/admin.bannerEntities';
import { AdminBannerRepository } from '../Repositories/admin.bannerRepository';
import { from } from 'rxjs';

@Injectable()
export class AdminBannerService {
  constructor(
    @InjectRepository(AdminBannerRepository)
    private readonly bannerRepository: AdminBannerRepository,
  ) {}

  async createBanner(createBannerDto: CreateBannerDto): Promise<AdminBannerEntity> {
    // Your logic to create a banner here using this.bannerRepository
  }

  async getBannerById(): Promise<AdminBannerEntity[]> {
    // Your logic to retrieve all banners here using this.bannerRepository
  }
  async updateBanner(): Promise<AdminBannerEntity[]> {
    // Your logic to retrieve all banners here using this.bannerRepository
  }
  async deleteBanners(): Promise<AdminBannerEntity[]> {
    // Your logic to retrieve all banners here using this.bannerRepository
  }

  // Other methods for updating and deleting banners using this.bannerRepository
}
