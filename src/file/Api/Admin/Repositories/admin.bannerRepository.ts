import { EntityRepository, Repository } from 'typeorm';
import { AdminBannerEntity } from '../Entities/admin.bannerEntities';

@EntityRepository(AdminBannerEntity)
export class AdminBannerRepository extends Repository<AdminBannerEntity> {
  // You can add custom repository methods here if needed
}
