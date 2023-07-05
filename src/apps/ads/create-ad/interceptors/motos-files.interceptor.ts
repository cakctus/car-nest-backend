import { Injectable } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class MotosFilesInterceptor extends MulterModule {
  createMulterOptions() {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'media/pics/motos');
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
          );
        },
      }),
    };
  }
}
