import { Module } from '@nestjs/common';
import { IssService } from './iss.service';
import { IssController } from './iss.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [IssController],
  providers: [IssService],
  exports: [IssService],
})
export class IssModule {}
