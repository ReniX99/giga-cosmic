import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { firstValueFrom } from 'rxjs';
import { SpaceCacheService } from '../space-cache/space-cache.service';

@Injectable()
export class ApodService {
  APOD_URL: string;
  APOD_INTERVAL: number;
  NASA_API_KEY: string;

  logger = new Logger(ApodService.name);

  constructor(
    @Inject(forwardRef(() => SpaceCacheService))
    private readonly spaceCacheService: SpaceCacheService,
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {
    this.APOD_URL = configService.getOrThrow<string>('APOD_URL');
    this.APOD_INTERVAL = configService.getOrThrow<number>(
      'APOD_FETCH_INTERVAL',
    );
    this.NASA_API_KEY = configService.getOrThrow<string>('NASA_API_KEY');

    const apodInterval = setInterval(() => {
      this.fetchApi().catch((err) => this.logger.warn(err));
    }, this.APOD_INTERVAL);
    this.schedulerRegistry.addInterval('apod-interval', apodInterval);
  }

  async fetchApi(): Promise<void> {
    const obsResponse = this.httpService.get(this.APOD_URL, {
      params: {
        thumbs: true,
        api_key: this.NASA_API_KEY,
      },
    });
    const { data } = await firstValueFrom(obsResponse);

    this.logger.log(data);

    await this.spaceCacheService.writeCache('apod', data);
  }
}
