import { forwardRef, Module } from '@nestjs/common';
import { DonkiService } from './donki.service';
import { HttpModule } from '@nestjs/axios';
import { SpaceCacheModule } from '../space-cache/space-cache.module';

@Module({
  imports: [forwardRef(() => SpaceCacheModule), HttpModule],
  providers: [DonkiService],
  exports: [DonkiService],
})
export class DonkiModule {}
