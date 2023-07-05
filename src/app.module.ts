import { Module } from '@nestjs/common';

// modules
import { AuthModule } from './apps/auth/auth.module';
import { ProfileModule } from './apps/profile/profile.module';
import { ModuleController } from './service/module/module.controller';

@Module({
  imports: [AuthModule, ProfileModule],
  controllers: [ModuleController],
})
export class AppModule {}
