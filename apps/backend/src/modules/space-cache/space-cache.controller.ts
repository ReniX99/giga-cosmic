import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpaceCacheService } from './space-cache.service';
import { SpaceSummaryDto } from './dto';

@Controller('space')
export class SpaceCacheController {
  constructor(private readonly spaceCacheService: SpaceCacheService) {}

  @Get(':src/latest')
  async getLast(@Param('src') source: string) {
    return this.spaceCacheService.getLast(source);
  }

  @Get('refresh')
  async refresh(@Query('src') sourceString: string) {
    return await this.spaceCacheService.refresh(sourceString);
  }

  @Get('summary')
  async getSpaceSummary(): Promise<SpaceSummaryDto> {
    return await this.spaceCacheService.getSpaceSummary();
  }
}
