import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { SpaceCacheService } from '../space-cache/space-cache.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SpacexService {
  SPACEX_URL: string;
  SPACEX_INTERVAL: number;

  logger = new Logger(SpacexService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
    private readonly spaceCacheService: SpaceCacheService,
  ) {
    this.SPACEX_URL = configService.getOrThrow<string>('SPACEX_URL');
    this.SPACEX_INTERVAL = configService.getOrThrow<number>(
      'SPACEX_FETCH_INTERVAL',
    );

    const spaceXInterval = setInterval(() => {
      this.fetchApi().catch((err) => this.logger.warn(err));
    }, this.SPACEX_INTERVAL);
    this.schedulerRegistry.addInterval('spacex-interval', spaceXInterval);
  }

  async fetchApi(): Promise<void> {
    const obsResponse = this.httpService.get(this.SPACEX_URL);
    const { data } = await firstValueFrom(obsResponse);

    this.logger.log('Fetch SpaceX Data');

    await this.spaceCacheService.writeCache('spacex', data);
  }
}
