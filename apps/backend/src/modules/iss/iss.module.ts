import { Module } from '@nestjs/common';
import { IssService } from './iss.service';
import { IssController } from './iss.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getCacheConfig } from 'src/config';

@Module({
  imports: [
    HttpModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getCacheConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [IssController],
  providers: [IssService],
  exports: [IssService],
})
export class IssModule {}
