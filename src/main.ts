import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { urlencoded } from 'express';
import * as express from 'express';
import { CustomExceptionFilter } from '../middleware/http/http-exception.filter';
import bodyParser from 'body-parser';
import { AuthMiddleware } from './apps/auth/auth.middleware';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import * as dotenv from 'dotenv';
dotenv.config();
import { createClient } from 'redis';

export const redisClient = createClient();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // cors
    app.use(
      cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
      }),
    );

    // cookie
    app.use(cookieParser());
    const maxPayloadSize = 1000 * 1024 * 1024; // 1 gigabyte in bytes

    // Increase the maximum payload size limit
    app.use(express.json({ limit: maxPayloadSize }));
    app.use(urlencoded({ extended: false }));

    // media
    app.use('/media', express.static('media'));

    // redis
    redisClient.on('error', (err) => console.log('Redis Client Error', err));

    // global middleware
    app.useGlobalFilters(
      new I18nValidationExceptionFilter({
        detailedErrors: false,
      }),
    );
    app.useGlobalFilters(new CustomExceptionFilter());
    await app.listen(5000);
  } catch (error) {
    console.log(error);
  }
}

bootstrap()
  .then(async () => {
    await redisClient.connect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
