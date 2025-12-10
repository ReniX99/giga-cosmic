import { Controller, Get } from '@nestjs/common';
import { OsdrService } from './osdr.service';
import { OsdrDto, SyncOsdrDataCountDto } from './dto';

@Controller('osdr')
export class OsdrController {
  constructor(private readonly osdrService: OsdrService) {}

  @Get('sync')
  async syncOsdr(): Promise<SyncOsdrDataCountDto> {
    return this.osdrService.syncOsdr();
  }

  @Get('list')
  async getOsdrList(): Promise<OsdrDto[]> {
    return this.osdrService.getOsdrList();
  }
}
