import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'GigaCosmic',
    }),
    cors: {
      origin: 'http://localhost:5173',
    },
  });

  await app.listen((process.env.PORT as string | number) ?? 3000);
}
bootstrap();
