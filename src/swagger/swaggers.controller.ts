// src/swaggers/swaggers.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('swaggers')
@ApiTags('swaggers')
export class SwaggersController {
  @Get()
  @ApiOperation({ summary: 'Get all swaggers' })
  @ApiResponse({ status: 200, description: 'Return all swaggers.' })
  findAll(): string[] {
    return ['swaggers 1', 'swaggers 2', 'swaggers 3'];
  }
}
