import { Module } from '@nestjs/common';
import { ApodService } from './apod.service';
import { SpaceCacheModule } from '../space-cache/space-cache.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, SpaceCacheModule],
  providers: [ApodService],
})
export class ApodModule {}
