import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Res,
  Req,
} from '@nestjs/common';
import { CreateAdService } from './create-ad.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';

import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/create')
export class CreateAdController {
  constructor(private readonly adsService: CreateAdService) {}

  @Post('create-ad')
  @UseInterceptors(
    FilesInterceptor('files', 35, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'media/pics/cars');
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
    }),
  )
  async createAd(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = JSON.parse(req.body.data);
      //   const files = req.files;
      const communicationMethod = JSON.parse(req.body.communicationMethod);
      const number = JSON.parse(req.body.number);
      const id = JSON.parse(req.body.id);
      const response = await this.adsService.createAd(
        id,
        data,
        files,
        communicationMethod,
        number,
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post('create-ad-moto')
  @UseInterceptors(
    FilesInterceptor('files', 35, {
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
    }),
  )
  async createMotoAd(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      //   console.log(files);
      const data = JSON.parse(req.body.data);
      //   const files = req.files;
      const communicationMethod = JSON.parse(req.body.communicationMethod);
      const number = JSON.parse(req.body.number);
      const id = JSON.parse(req.body.id);
      const response = await this.adsService.createMotoAdService(
        id,
        data,
        files,
        communicationMethod,
        number,
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }
}
