import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpaceCacheService {
  constructor(private readonly prismaService: PrismaService) {}

  async writeCache(source: string, payload: any): Promise<void> {
    await this.prismaService.space_cache.create({
      data: {
        source,
        payload,
      },
    });
  }
}
