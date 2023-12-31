import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Response } from 'express';
import { AdminBannerEntity } from '../Entities/admin.bannerEntities'; 
import { AdminBannerService } from '../Service/admin.bannerService'; 
import { CreateBannerDto,UpdateBannerDto,DeleteBannerDto } from '../Dtos/dtos/admin.bannerDtos';
import { ApiResponse } from '@nestjs/swagger';

@Controller('api/admin/banners')
export class AdminBannerController {
  constructor(private readonly bannerService: AdminBannerService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all banners' })
  async getAll() {
    return this.bannerService.getAllBanners();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a banner by ID' })
  async getOne(@Param('id') id: number) {
    return this.bannerService.getBannerById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new banner' })
  async create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannerService.createBanner(createBannerDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update a banner by ID' })
  async update(
    @Param('id') id: number,
    @Body() data: UpdateBannerDto,
  ) {
    return this.bannerService.updateBanner(id, data);
  }

  @Delete()
  @ApiResponse({ status: 200, description: 'Delete one or more banners' })
  async delete(@Body() deleteBannerDto: DeleteBannerDto): Promise<any> {
    return this.bannerService.deleteBanners(deleteBannerDto);
  }
}
