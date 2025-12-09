import { Module } from '@nestjs/common';
import { SpacexService } from './spacex.service';
import { HttpModule } from '@nestjs/axios';
import { SpaceCacheModule } from '../space-cache/space-cache.module';

@Module({
  imports: [HttpModule, SpaceCacheModule],
  providers: [SpacexService],
})
export class SpacexModule {}
