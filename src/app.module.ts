import { Module } from '@nestjs/common';

// modules
import { AuthModule } from './apps/auth/auth.module';
import { ProfileModule } from './apps/profile/profile.module';
import { AllAdsModule } from './apps/ads/all-ads/all-ads.module';
import { CreateAdModule } from './apps/ads/create-ad/create-ad.module';
import { UpdateAdModule } from './apps/ads/update-ad/update-ad.module';
import { RemoveAdModule } from './apps/ads/remove-ad/remove-ad.module';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    AllAdsModule,
    CreateAdModule,
    UpdateAdModule,
    RemoveAdModule,
  ],
})
export class AppModule {}
