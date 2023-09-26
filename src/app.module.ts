import { Module } from '@nestjs/common';
import * as path from 'path';
import {
  I18nModule,
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';

// modules
import { AuthModule } from './apps/auth/auth.module';
import { ProfileModule } from './apps/profile/profile.module';
import { AllAdsModule } from './apps/ads/all-ads/all-ads.module';
import { CreateAdModule } from './apps/ads/create-ad/create-ad.module';
import { RemoveAdModule } from './apps/ads/remove-ad/remove-ad.module';
import { DetailAdModule } from './apps/ads/detail-ad/detail-ad.module';
// import { UpdateAdModule } from './update-ad/update-ad.module';
import { UpdateAdModule } from './apps/ads/update-ad/update-ad.module';

@Module({
  imports: [
    // i18n
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    AuthModule,
    ProfileModule,
    AllAdsModule,
    CreateAdModule,
    RemoveAdModule,
    DetailAdModule,
    UpdateAdModule,
  ],
})
export class AppModule {}
