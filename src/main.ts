import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { urlencoded } from 'express';
import * as express from 'express';
import { CustomExceptionFilter } from './http-exception.filter';
import bodyParser from 'body-parser';
import { AuthMiddleware } from './apps/auth/auth.middleware';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
    }),
  );

  app.use(cookieParser());
  const maxPayloadSize = 1000 * 1024 * 1024; // 1 gigabyte in bytes

  // Increase the maximum payload size limit
  app.use(express.json({ limit: maxPayloadSize }));
  app.use(urlencoded({ extended: false }));
  app.use('/media', express.static('media'));

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(5000);
}

bootstrap();
