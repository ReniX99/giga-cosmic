import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { SpaceCacheService } from '../space-cache/space-cache.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DonkiService {
  DONKI_CME_URL: string;
  DONKI_FLR_URL: string;
  DONKI_INTERVAL: number;
  NASA_API_KEY: string;

  logger = new Logger(DonkiService.name);

  constructor(
    @Inject(forwardRef(() => SpaceCacheService))
    private readonly spaceCacheService: SpaceCacheService,
    private readonly configService: ConfigService,
    private readonly schedularRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
  ) {
    this.DONKI_CME_URL = configService.getOrThrow<string>('DONKI_CME_URL');
    this.DONKI_FLR_URL = configService.getOrThrow<string>('DONKI_FLR_URL');
    this.DONKI_INTERVAL = configService.getOrThrow<number>(
      'DONKI_FETCH_INTERVAL',
    );
    this.NASA_API_KEY = configService.getOrThrow<string>('NASA_API_KEY');

    const donkiInterval = setInterval(() => {
      this.fetchApi().catch((err) => this.logger.warn(err));
    }, this.DONKI_INTERVAL);
    this.schedularRegistry.addInterval('donki-interval', donkiInterval);
  }

  async fetchApi(): Promise<void> {
    await this.fetchCme();
    await this.fetchFlr();

    this.logger.log('Fetch Donki data');
  }

  async fetchCme(): Promise<void> {
    const today = new Date();
    const todayIsoDate = today.toISOString().split('T')[0];

    const longAgo = new Date();
    longAgo.setDate(today.getDate() - 5);
    const longAgoIsoDate = longAgo.toISOString().split('T')[0];

    const obsResponse = this.httpService.get(this.DONKI_CME_URL, {
      params: {
        start_date: longAgoIsoDate,
        end_date: todayIsoDate,
        api_key: this.NASA_API_KEY,
      },
    });
    const { data } = await firstValueFrom(obsResponse);

    await this.spaceCacheService.writeCache('donki cme', data);
  }

  async fetchFlr(): Promise<void> {
    const today = new Date();
    const todayIsoDate = today.toISOString().split('T')[0];

    const longAgo = new Date();
    longAgo.setDate(today.getDate() - 5);
    const longAgoIsoDate = longAgo.toISOString().split('T')[0];

    const obsResponse = this.httpService.get(this.DONKI_FLR_URL, {
      params: {
        start_date: longAgoIsoDate,
        end_date: todayIsoDate,
        api_key: this.NASA_API_KEY,
      },
    });
    const { data } = await firstValueFrom(obsResponse);

    await this.spaceCacheService.writeCache('donki flr', data);
  }
}
