import { Module } from '@nestjs/common';
import { SpaceCacheService } from './space-cache.service';
import { SpaceCacheController } from './space-cache.controller';

@Module({
  controllers: [SpaceCacheController],
  providers: [SpaceCacheService],
  exports: [SpaceCacheService],
})
export class SpaceCacheModule {}
