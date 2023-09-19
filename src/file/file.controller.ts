import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../auth/entities/user.entity';
import {
  AuthenticateUser,
  CurrentUser,
} from '../common/decorators/auth.decorator';
import { PresignedUrlReqDto } from './dtos/req/presigned-url.req.dto';
import { FileService } from './file.service';

@Controller(`file`)
@AuthenticateUser()
@ApiTags('File Controller')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('presigned-url')
  createPresignUrl(
    @Body() body: PresignedUrlReqDto,
    @CurrentUser() user: User,
  ) {
    return this.fileService.createPresignUrl(body, user);
  }
}
