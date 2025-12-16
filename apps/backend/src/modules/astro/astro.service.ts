import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AstroQuery } from './query';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AstroService {
  ASTRO_URL: string;
  ASTRO_APP_ID: string;
  ASTRO_API_KEY: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.ASTRO_URL = this.configService.getOrThrow<string>('ASTRO_URL');
    this.ASTRO_APP_ID = this.configService.getOrThrow<string>('ASTRO_APP_ID');
    this.ASTRO_API_KEY = this.configService.getOrThrow<string>('ASTRO_API_KEY');
  }

  async proxyAstro(query: AstroQuery) {
    const obsResponse = this.httpService.get(
      `${this.ASTRO_URL}/${query.body}`,
      {
        auth: {
          username: this.ASTRO_APP_ID,
          password: this.ASTRO_API_KEY,
        },
        params: {
          latitude: query.latitude,
          longitude: query.longitude,
          from_date: query.fromDate,
          to_date: query.toDate,
          time: '00:00:00',
          elevation: 0,
        },
      },
    );

    const response = await firstValueFrom(obsResponse);
    return response.data;
  }
}
