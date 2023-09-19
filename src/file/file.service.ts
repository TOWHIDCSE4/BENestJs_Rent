import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../auth/entities/user.entity';
import { GlobalConfig } from '../common/config/global.config';
import { MapFilePathSupport } from '../common/constants/global.constant';
import { InternalServerErrorExc } from '../common/exceptions/custom.exception';
import { UuidService } from '../utils/services/uuid.service';
import { PresignedUrlReqDto } from './dtos/req/presigned-url.req.dto';
import { PresignedUrlResDto } from './dtos/res/presigned-url.res.dto';
import { FileRepository } from './repositories/file.repository';

@Injectable()
export class FileService {
  private s3Client: S3;
  constructor(
    private fileRepo: FileRepository,
    private configService: ConfigService<GlobalConfig>,
    private uuidService: UuidService,
  ) {
    this.s3Client = new S3({
      credentials: {
        accessKeyId: configService.getOrThrow('aws.accessKeyId'),
        secretAccessKey: configService.getOrThrow('aws.accessKeySecret'),
      },
      region: configService.getOrThrow('aws.region'),
    });
  }

  async createPresignUrl(
    dto: PresignedUrlReqDto,
    user: User,
  ): Promise<PresignedUrlResDto> {
    const { type } = dto;

    // Check if type is in name folder, We need to check type, to detect file from image/video/pdf
    const fileType = MapFilePathSupport.find((obj) => obj.types.includes(type));
    if (!fileType) throw new InternalServerErrorExc({ message: 'common' });

    const key = this.genFileKey(fileType.key, user.id, type);

    const file = this.fileRepo.create({
      key: key,
      size: 0,
      type,
      uploaderId: user.id,
    });
    await this.fileRepo.save(file);

    const bucket = this.configService.getOrThrow('aws.s3.bucketName');

    const command = new PutObjectCommand({ Bucket: bucket, Key: key });

    const presignedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 3600,
    });

    return PresignedUrlResDto.forMerchant({ file, presignedUrl });
  }

  private genFileKey(
    fileType: string,
    userId: number,
    type: string,
    fileName?: string,
  ) {
    const randomStr = this.uuidService.genRandomStr();
    if (fileName) {
      return `${fileType}/${userId}/${randomStr}/${fileName}.${type}`;
    }
    return `${fileType}/${userId}/${randomStr}.${type}`;
  }
}
