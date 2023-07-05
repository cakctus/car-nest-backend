import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { urlencoded } from 'express';
import * as express from 'express';
import { ErrorFilter } from './http-exception.filter';
import { AuthMiddleware } from './apps/auth/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
    }),
  );
  app.use(cookieParser());
  app.use(urlencoded({ extended: false }));
  app.use('/media', express.static('media'));
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(5000);
}
bootstrap();
