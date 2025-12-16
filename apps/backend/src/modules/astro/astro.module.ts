import { Module } from '@nestjs/common';
import { AstroService } from './astro.service';
import { AstroController } from './astro.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AstroController],
  providers: [AstroService],
})
export class AstroModule {}
