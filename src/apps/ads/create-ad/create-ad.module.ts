import { Module } from '@nestjs/common';
import { CreateAdController } from './create-ad.controller';
import { CreateAdService } from './create-ad.service';

@Module({
  providers: [CreateAdService],
  controllers: [CreateAdController],
})
export class CreateAdModule {}
