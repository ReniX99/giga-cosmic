import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpaceCacheService } from './space-cache.service';

@Controller('space')
export class SpaceCacheController {
  constructor(private readonly spaceCacheService: SpaceCacheService) {}

  @Get(':src/latest')
  async getLast(@Param('src') source: string) {
    return this.spaceCacheService.getLast(source);
  }

  @Get('refresh')
  refresh(@Query('src') sourceString: string) {
    return this.spaceCacheService.refresh(sourceString);
  }
}
