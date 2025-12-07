import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { TrendIssDto } from './dto';
import { Prisma } from '../prisma/generated/client';

@Injectable()
export class IssService {
  ISS_URL: string;
  ISS_INTERVAL: number;

  logger = new Logger(IssService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
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

    await this.prismaService.iss_log.create({
      data: {
        sourceUrl: this.ISS_URL,
        payload: data,
      },
    });
  }

  async getLast() {
    const iss_log = await this.prismaService.iss_log.findMany({
      orderBy: {
        fetchedAt: 'desc',
      },
      take: 1,
    });

    return iss_log[0];
  }

  async triggerIss() {
    await this.fetchApi();

    return this.getLast();
  }

  async getIssTrend(): Promise<TrendIssDto> {
    const iss_logs = await this.prismaService.iss_log.findMany({
      orderBy: {
        fetchedAt: 'desc',
      },
      take: 2,
    });

    if (iss_logs.length < 2) {
      return {
        movement: false,
        deltaKm: 0,
        deltaSec: 0,
      };
    }

    const time1 = iss_logs[1].fetchedAt;
    const time2 = iss_logs[0].fetchedAt;
    const payload1 = iss_logs[1].payload;
    const payload2 = iss_logs[0].payload;

    const latitude1 = (payload1 as Prisma.JsonObject)['latitude'] as number;
    const longitude1 = (payload1 as Prisma.JsonObject)['longitude'] as number;
    const latitude2 = (payload2 as Prisma.JsonObject)['latitude'] as number;
    const longitude2 = (payload2 as Prisma.JsonObject)['longitude'] as number;
    const velocity2 = (payload2 as Prisma.JsonObject)['velocity'] as number;

    const deltaKm = this.haversineKm(
      latitude1,
      longitude1,
      latitude2,
      longitude2,
    );
    const movement = deltaKm > 0.1;
    const deltaSec = (time2.getTime() - time1.getTime()) / 1000;

    return {
      movement,
      deltaKm,
      deltaSec,
      velocityKmH: velocity2,
      fromTime: time1,
      toTime: time2,
      fromLatitude: latitude1,
      fromLongitude: longitude1,
      toLatitude: latitude2,
      toLongitude: longitude2,
    };
  }

  private haversineKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const rlat1 = (lat1 * Math.PI) / 180;
    const rlat2 = (lat2 * Math.PI) / 180;
    const dlat = ((lat2 - lat1) * Math.PI) / 180;
    const dlon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(dlon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return 6371 * c;
  }
}
