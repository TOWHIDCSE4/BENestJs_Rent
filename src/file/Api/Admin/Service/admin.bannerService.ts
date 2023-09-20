import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminBannerEntity} from '../Entities/admin.bannerEntities';
import { AdminBannerRepository } from '../Repositories/admin.bannerRepository';
import { from } from 'rxjs';
import { DeleteBannerDto, UpdateBannerDto } from '../Dtos/dtos/admin.bannerDtos';

@Injectable()
export class AdminBannerService {
  constructor(
    @InjectRepository(AdminBannerRepository)
    private readonly bannerRepository: AdminBannerRepository,
  ) {}

  async createBanner(createBannerDto) {
    // Your logic to create a banner here using this.bannerRepository
  }

  async getBannerById(id: number) {
    // Your logic to retrieve all banners here using this.bannerRepository
  }
  async updateBanner(id: number, data: UpdateBannerDto) {
    // Your logic to retrieve all banners here using this.bannerRepository
  }
  async deleteBanners(deleteBannerDto: DeleteBannerDto) {
    // Your logic to retrieve all banners here using this.bannerRepository
  }

  async getAllBanners() {
    return "all banners";
  }

  // Other methods for updating and deleting banners using this.bannerRepository
}
