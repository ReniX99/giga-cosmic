import KeyvRedis from '@keyv/redis';
import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

export function getCacheConfig(
  configService: ConfigService,
): CacheModuleOptions {
  const connectionString = configService.getOrThrow<string>('REDIS_URL');
  return {
    stores: [new KeyvRedis(connectionString)],
    ttl: +configService.getOrThrow<string>('CACHE_TTL'),
  };
}
