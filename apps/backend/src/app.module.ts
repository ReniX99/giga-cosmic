import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { IssModule } from './modules/iss/iss.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ApodModule } from './modules/apod/apod.module';
import { SpaceCacheModule } from './modules/space-cache/space-cache.module';
import { NeoModule } from './modules/neo/neo.module';
import { DonkiModule } from './modules/donki/donki.module';
import { SpacexModule } from './modules/spacex/spacex.module';
import { OsdrModule } from './modules/osdr/osdr.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { getThrottlerConfig } from './config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getThrottlerConfig,
      inject: [ConfigService],
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
