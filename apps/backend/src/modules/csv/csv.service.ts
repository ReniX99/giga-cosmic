import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { PrismaService } from '../prisma/prisma.service';
import { CsvBody } from './types';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class CsvService {
  private readonly logger = new Logger(CsvService.name);

  constructor(private readonly prismaService: PrismaService) {}

  private randFloat(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  private generateCsv(): CsvBody {
    const outDir = '/data/xlsx';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    const fileName = `telemetry_${timestamp}.xlsx`;
    const fullPath = path.join(outDir, fileName);

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const recordedAt = new Date().toISOString();
    const isRain = Math.random() > 0.5;
    const temperature = +this.randFloat(-50, 80).toFixed(2);

    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < 20; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const rows = [
      {
        recordedAt,
        is_rain: isRain,
        temperature,
        text,
        file_name: fileName,
      },
    ];

    const worksheet = xlsx.utils.json_to_sheet(rows);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Telemetry');
    xlsx.writeFile(workbook, fullPath);

    return {
      timestamp: recordedAt,
      isRain,
      temperature,
      text,
      fileName,
    };
  }

  private async copyToPostgres(body: CsvBody) {
    const { timestamp, isRain, temperature, text, fileName } = body;

    await this.prismaService.telemetry.create({
      data: {
        timestamp,
        isRain,
        temperature,
        text,
        fileName,
      },
    });
  }

  @Interval(10000)
  async runGeneratint() {
    try {
      const body = this.generateCsv();
      await this.copyToPostgres(body);

      this.logger.log('XLSX imported to Postgres');
    } catch (err) {
      this.logger.warn(err);
    }
  }
}
