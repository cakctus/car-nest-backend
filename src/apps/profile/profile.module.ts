import { Module } from '@nestjs/common';
import { FileUploadModule } from '../../../middleware/files/profile-photo.module';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [FileUploadModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
