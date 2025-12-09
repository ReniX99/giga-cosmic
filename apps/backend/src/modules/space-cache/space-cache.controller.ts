import { Controller } from '@nestjs/common';
import { SpaceCacheService } from './space-cache.service';

@Controller('space-cache')
export class SpaceCacheController {
  constructor(private readonly spaceCacheService: SpaceCacheService) {}
}
