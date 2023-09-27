import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AllAdsService } from './all-ads.service';
import { AllAdsController } from './all-ads.controller';
import { PrismaService } from 'src/apps/prisma/prisma.service';
import { CheckCookieMiddleware } from 'middleware/cookie/checkCookie';
import { TokenService } from 'src/apps/token/token.service';

@Module({
  providers: [AllAdsService, PrismaService, TokenService],
  controllers: [AllAdsController],
})
export class AllAdsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckCookieMiddleware).forRoutes({
      path: 'api/get-all-ads/:userId/:page/:limit/:categoryClicked',
      method: RequestMethod.GET,
    });
  }
}
