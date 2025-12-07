import { Controller, Get } from '@nestjs/common';
import { IssService } from './iss.service';
import { TrendIssDto } from './dto';

@Controller('')
export class IssController {
  constructor(private readonly issService: IssService) {}

  @Get('last')
  async getLastIss() {
    return this.issService.getLast();
  }

  @Get('fetch')
  async triggerIss() {
    return this.issService.triggerIss();
  }

  @Get('iss/trend')
  async getIssTrend(): Promise<TrendIssDto> {
    return this.issService.getIssTrend();
  }
}
