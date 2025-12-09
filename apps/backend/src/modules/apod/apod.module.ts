import { forwardRef, Module } from '@nestjs/common';
import { ApodService } from './apod.service';
import { SpaceCacheModule } from '../space-cache/space-cache.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [forwardRef(() => SpaceCacheModule), HttpModule],
  providers: [ApodService],
  exports: [ApodService],
})
export class ApodModule {}
