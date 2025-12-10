import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { CreateOsdrType } from './types';

@Injectable()
export class OsdrService {
  private OSDR_URL: string;
  private OSDR_INTERVAL: number;

  private logger = new Logger(OsdrService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {
    this.OSDR_URL = this.configService.getOrThrow<string>('OSDR_URL');
    this.OSDR_INTERVAL = this.configService.getOrThrow<number>(
      'OSDR_FETCH_INTERVAL',
    );

    const osdrInterval = setInterval(() => {
      this.fetchApi().catch((err) => this.logger.warn(err));
    }, this.OSDR_INTERVAL);

    this.schedulerRegistry.addInterval('osdr-interval', osdrInterval);
  }

  async fetchApi(): Promise<void> {
    const obsResponse = this.httpService.get(this.OSDR_URL);

    const { data } = await firstValueFrom(obsResponse);

    this.logger.log('Fetch Osdr Data');

    const osdrItems: CreateOsdrType[] = [];
    for (const [key, value] of Object.entries(data)) {
      osdrItems.push({
        datasetId: key,
        title: key,
        status: 'OK',
        updatedAt: new Date().toISOString(),
        raw: value,
      });
    }

    await this.prismaService.osdr_item.createMany({
      data: osdrItems,
    });
  }
}
