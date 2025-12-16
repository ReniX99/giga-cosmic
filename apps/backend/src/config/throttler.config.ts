import { ConfigService } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export function getThrottlerConfig(
  configService: ConfigService,
): ThrottlerModuleOptions {
  return {
    throttlers: [
      {
        ttl: +configService.getOrThrow<string>('RATE_LIMIT_TTL'),
        limit: +configService.getOrThrow<string>('RATE_LIMIT'),
      },
    ],
    errorMessage:
      'Ваш лимит по количеству запросов в минуту истёк. Попробуйте позже',
  };
}
