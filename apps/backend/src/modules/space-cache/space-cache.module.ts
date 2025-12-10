import { forwardRef, Module } from '@nestjs/common';
import { SpaceCacheService } from './space-cache.service';
import { SpaceCacheController } from './space-cache.controller';
import { ApodModule } from '../apod/apod.module';
import { NeoModule } from '../neo/neo.module';
import { DonkiModule } from '../donki/donki.module';
import { SpacexModule } from '../spacex/spacex.module';
import { IssModule } from '../iss/iss.module';

@Module({
  imports: [
    forwardRef(() => ApodModule),
    forwardRef(() => NeoModule),
    forwardRef(() => DonkiModule),
    forwardRef(() => SpacexModule),
    IssModule,
  ],
  controllers: [SpaceCacheController],
  providers: [SpaceCacheService],
  exports: [SpaceCacheService],
})
export class SpaceCacheModule {}
