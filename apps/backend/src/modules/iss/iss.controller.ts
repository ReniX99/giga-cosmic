import { Controller } from '@nestjs/common';
import { IssService } from './iss.service';

@Controller('iss')
export class IssController {
  constructor(private readonly issService: IssService) {}
}
