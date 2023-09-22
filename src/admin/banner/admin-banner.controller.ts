import { Controller, Get, Req, Res } from '@nestjs/common';
import { AdminBannerService } from './admin-banner.service';
import { ApiTags } from '@nestjs/swagger';
import { QueryResponseDto } from '../../shared/dto/query-response.dto';
import { HttpStatus } from "@nestjs/common";
import { MsgCode } from '../../shared/constants/message.constants';
import { Response } from 'express';

@ApiTags('Admin Banners')
@Controller('admin/banners')
export class AdminBannerController {
    constructor(private readonly bannerService: AdminBannerService){}

    @Get()
    async getAllBanners(
        @Req() request: any,
        @Res() response: Response,
    ): Promise<any> {
        const banners = await this.bannerService.getAll();
        response.status(HttpStatus.OK);
        return response.json(new QueryResponseDto(HttpStatus.OK, true, MsgCode.SUCCESS[0], MsgCode.SUCCESS[1], banners));
    }
}
