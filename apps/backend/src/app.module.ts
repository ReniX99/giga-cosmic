import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { IssModule } from './modules/iss/iss.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ApodModule } from './modules/apod/apod.module';
import { SpaceCacheModule } from './modules/space-cache/space-cache.module';
import { NeoModule } from './modules/neo/neo.module';
import { DonkiModule } from './modules/donki/donki.module';
import { SpacexModule } from './modules/spacex/spacex.module';
import { OsdrModule } from './modules/osdr/osdr.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    IssModule,
    SpaceCacheModule,
    PrismaModule,
    ApodModule,
    NeoModule,
    DonkiModule,
    SpacexModule,
    OsdrModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
