import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { SpaceCacheService } from '../space-cache/space-cache.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NeoService {
  NEO_URL: string;
  NEO_INTERVAL: number;
  NASA_API_KEY: string;

  logger = new Logger(NeoService.name);

  constructor(
    @Inject(forwardRef(() => SpaceCacheService))
    private readonly spaceCacheService: SpaceCacheService,
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {
    this.NEO_URL = configService.getOrThrow<string>('NEO_URL');
    this.NEO_INTERVAL = configService.getOrThrow<number>('NEO_FETCH_INTERVAL');
    this.NASA_API_KEY = configService.getOrThrow<string>('NASA_API_KEY');

    const apodInterval = setInterval(() => {
      this.fetchApi().catch((err) => this.logger.warn(err));
    }, this.NEO_INTERVAL);
    this.schedulerRegistry.addInterval('neo-interval', apodInterval);
  }

  async fetchApi(): Promise<void> {
    const today = new Date();
    const todayIsoDate = today.toISOString().split('T')[0];

    const beforeYesterday = new Date();
    beforeYesterday.setDate(today.getDate() - 2);
    const beforeYesterdayIsoDate = beforeYesterday.toISOString().split('T'[0]);

    const obsResponse = this.httpService.get(this.NEO_URL, {
      params: {
        start_date: beforeYesterdayIsoDate,
        end_date: todayIsoDate,
        api_key: this.NASA_API_KEY,
      },
    });
    const { data } = await firstValueFrom(obsResponse);

    this.logger.log('Fetch Neo Data');

    await this.spaceCacheService.writeCache('neo', data);
  }
}
