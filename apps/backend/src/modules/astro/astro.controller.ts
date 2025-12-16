import { Controller, Get, Query } from '@nestjs/common';
import { AstroService } from './astro.service';
import { AstroQuery } from './query';

@Controller('astro')
export class AstroController {
  constructor(private readonly astroService: AstroService) {}

  @Get()
  async proxyAstro(@Query() query: AstroQuery) {
    return this.astroService.proxyAstro(query);
  }
}
