import { Module } from '@nestjs/common';
import { UpdateAdController } from './update-ad.controller';
import { UpdateAdService } from './update-ad.service';

@Module({
  providers: [UpdateAdService],
  controllers: [UpdateAdController],
})
export class UpdateAdModule {}
