import { Module } from '@nestjs/common';
import { AllAdsService } from './all-ads.service';
import { AllAdsController } from './all-ads.controller';

@Module({
  providers: [AllAdsService],
  controllers: [AllAdsController],
})
export class AllAdsModule {}
