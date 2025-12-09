import { forwardRef, Module } from '@nestjs/common';
import { NeoService } from './neo.service';
import { HttpModule } from '@nestjs/axios';
import { SpaceCacheModule } from '../space-cache/space-cache.module';

@Module({
  imports: [forwardRef(() => SpaceCacheModule), HttpModule],
  providers: [NeoService],
  exports: [NeoService],
})
export class NeoModule {}
