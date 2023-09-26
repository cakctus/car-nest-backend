import { Module } from '@nestjs/common';
import { DetailAdController } from './detail-ad.controller';
import { DetailAdService } from './detail-ad.service';

@Module({
  controllers: [DetailAdController],
  providers: [DetailAdService],
})
export class DetailAdModule {}
