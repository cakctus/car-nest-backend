import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Specify the destination folder where files will be saved.
          cb(null, 'media/pics/users'); // Change './uploads' to your desired folder path.
        },
        filename: (req, file, cb) => {
          // Customize the file name if needed (optional).
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
          );
        },
      }),
    }),
  ],
  exports: [MulterModule],
})
export class FileUploadModule {}
