import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IssService {
  ISS_URL: string;
  ISS_INTERVAL: number;

  logger = new Logger(IssService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
  ) {
    this.ISS_URL = configService.getOrThrow<string>('ISS_URL');
    this.ISS_INTERVAL = configService.getOrThrow<number>('ISS_FETCH_INTERVAL');

    const issInterval = setInterval(() => {
      this.fetchApi().catch((err) => this.logger.warn(err));
    }, this.ISS_INTERVAL);
    this.schedulerRegistry.addInterval('iss-interval', issInterval);
  }

  private async fetchApi() {
    const obsResponse = this.httpService.get(this.ISS_URL);

    const { data } = await firstValueFrom(obsResponse);
    this.logger.log(data);
  }
}
