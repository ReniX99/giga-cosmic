import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshedSpaceCacheDto } from './dto';
import { ApodService } from '../apod/apod.service';
import { NeoService } from '../neo/neo.service';
import { DonkiService } from '../donki/donki.service';
import { SpacexService } from '../spacex/spacex.service';

@Injectable()
export class SpaceCacheService {
  constructor(
    @Inject(forwardRef(() => ApodService))
    private readonly apodService: ApodService,
    @Inject(forwardRef(() => NeoService))
    private readonly neoService: NeoService,
    @Inject(forwardRef(() => DonkiService))
    private readonly donkiService: DonkiService,
    @Inject(forwardRef(() => SpacexService))
    private readonly spaceXService: SpacexService,
    private readonly prismaService: PrismaService,
  ) {}

  async writeCache(source: string, payload: any): Promise<void> {
    await this.prismaService.space_cache.create({
      data: {
        source,
        payload,
      },
    });
  }

  async getLast(source: string) {
    const data = await this.prismaService.space_cache.findFirst({
      where: {
        source,
      },
      orderBy: {
        fetchedAt: 'desc',
      },
      take: 1,
    });

    if (!data) {
      return {
        source,
        message: 'No data',
      };
    }
    return data;
  }

  async refresh(sourceString: string): Promise<RefreshedSpaceCacheDto> {
    const sources = sourceString
      ? sourceString.split(',')
      : ['apod', 'neo', 'flr', 'cme', 'spacex'];

    const refreshedList: string[] = [];
    for (const source of sources) {
      switch (source) {
        case 'apod':
          await this.apodService.fetchApi();
          refreshedList.push('apod');
          break;

        case 'neo':
          await this.neoService.fetchApi();
          refreshedList.push('neo');
          break;

        case 'flr':
          await this.donkiService.fetchFlr();
          refreshedList.push('flr');
          break;

        case 'cme':
          await this.donkiService.fetchCme();
          refreshedList.push('cme');
          break;

        case 'spacex':
          await this.spaceXService.fetchApi();
          refreshedList.push('spacex');
          break;
      }
    }

    return {
      refreshed: refreshedList,
    };
  }
}
