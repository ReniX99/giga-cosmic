import { Module } from '@nestjs/common';
import { DonkiService } from './donki.service';
import { HttpModule } from '@nestjs/axios';
import { SpaceCacheModule } from '../space-cache/space-cache.module';

@Module({
  imports: [HttpModule, SpaceCacheModule],
  providers: [DonkiService],
})
export class DonkiModule {}
