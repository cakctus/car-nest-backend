import {
  Controller,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateAdService } from './update-ad.service';
import { Request, Response } from 'express';

import {
  carsMulterConfig,
  motosMulterConfig,
  busMulterConfig,
  truckMulterConfig,
  tractorMulterConfig,
  constructionMulterConfig,
  trailerMulterConfig,
  tireMulterConfig,
  partsMulterConfig,
  truckPartsMulterConfig,
  batteryMulterConfig,
  serviceMulterConfig,
} from '../create-ad/multer.config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/update')
export class UpdateAdController {
  limits: any = {
    fieldSize: 30 * 1024 * 1024, // 30MB
  };
  constructor(private readonly updateService: UpdateAdService) {}

  @Post('car')
  async getCarToUpdate(@Req() req: Request, @Res() res: Response) {
    try {
      const { id, userId } = req.body;
      const response = await this.updateService.getCarToUpdate(
        Number(id),
        Number(userId),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Post('update-car')
  @UseInterceptors(FilesInterceptor('files', null, carsMulterConfig))
  async updateCar(@Req() req: Request, @Res() res: Response) {
    try {
      const data = JSON.parse(req.body.data);
      const { countryCode, photos, ...dataToUpdate } = data;
      const { id, userId } = req.body;
      const files = req.files;
      const response = await this.updateService.updateCar(
        Number(id),
        Number(userId),
        dataToUpdate,
        files,
      );

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post('bus')
  async getBusToUpdate(@Req() req: Request, @Res() res: Response) {
    try {
      const { id, userId } = req.body;
      const response = await this.updateService.getBusToUpdate(
        Number(id),
        Number(userId),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Post('update-bus')
  @UseInterceptors(FilesInterceptor('files', null, busMulterConfig))
  async updateBus(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = JSON.parse(req.body.data);
      const { countryCode, photos, ...dataToUpdate } = data;
      const { id, userId } = req.body;
      const response = await this.updateService.updateBus(
        Number(id),
        Number(userId),
        dataToUpdate,
        files,
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Post('truck')
  async getTruckToUpdate(@Req() req: Request, @Res() res: Response) {
    try {
      const { id, userId } = req.body;
      const response = await this.updateService.getTruckToUpdate(
        Number(id),
        Number(userId),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Post('update-truck')
  @UseInterceptors(FilesInterceptor('files', null, truckMulterConfig))
  async updateTruck(
    @Req() req: Request,
    @Res() res: Response,
    // @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      // console.log(files);
      const data = JSON.parse(req.body.data);
      const { countryCode, photos, ...dataToUpdate } = data;
      const { id, userId } = req.body;
      const files = req.files;
      console.log(files);
      const response = await this.updateService.updateTruck(
        Number(id),
        Number(userId),
        dataToUpdate,
        files,
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}
