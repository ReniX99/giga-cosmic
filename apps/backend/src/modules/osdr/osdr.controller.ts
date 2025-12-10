import { Controller } from '@nestjs/common';
import { OsdrService } from './osdr.service';

@Controller('osdr')
export class OsdrController {
  constructor(private readonly osdrService: OsdrService) {}
}
