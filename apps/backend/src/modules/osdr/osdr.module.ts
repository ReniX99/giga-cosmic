import { Module } from '@nestjs/common';
import { OsdrService } from './osdr.service';
import { OsdrController } from './osdr.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [OsdrController],
  providers: [OsdrService],
})
export class OsdrModule {}
