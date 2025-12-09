import { forwardRef, Module } from '@nestjs/common';
import { SpacexService } from './spacex.service';
import { HttpModule } from '@nestjs/axios';
import { SpaceCacheModule } from '../space-cache/space-cache.module';

@Module({
  imports: [forwardRef(() => SpaceCacheModule), HttpModule],
  providers: [SpacexService],
  exports: [SpacexService],
})
export class SpacexModule {}
