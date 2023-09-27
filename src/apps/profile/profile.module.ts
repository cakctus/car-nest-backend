import { Module } from '@nestjs/common';
import { FileUploadModule } from '../../../middleware/files/profile-photo.module';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PrismaService } from 'src/apps/prisma/prisma.service';

@Module({
  imports: [FileUploadModule],
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
})
export class ProfileModule {}
