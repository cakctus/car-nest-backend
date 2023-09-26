import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Res,
  Req,
  Next,
} from '@nestjs/common';
import { CreateAdService } from './create-ad.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response, Request, NextFunction } from 'express';

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
} from './multer.config';

@Controller('api/create')
export class CreateAdController {
  constructor(private readonly adsService: CreateAdService) {}

  @Post('create-ad')
  @UseInterceptors(FilesInterceptor('files', null, carsMulterConfig))
  async createAd(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
    @Next() next: NextFunction,
  ) {
    try {
      const data = JSON.parse(req.body.data);
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
      console.log(response);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  @Post('create-ad-moto')
  @UseInterceptors(FilesInterceptor('files', null, motosMulterConfig))
  async createMotoAd(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = JSON.parse(req.body.data);
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

  @Post('create-bus')
  @UseInterceptors(FilesInterceptor('files', null, busMulterConfig))
  async createBus(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = JSON.parse(req.body.data);
      const communicationMethod = JSON.parse(req.body.communicationMethod);
      const number = JSON.parse(req.body.number);
      const id = JSON.parse(req.body.id);
      const response = await this.adsService.createBusAd(
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

  @Post('create-truck')
  @UseInterceptors(FilesInterceptor('files', null, truckMulterConfig))
  async createTruck(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = JSON.parse(req.body.data);
      const communicationMethod = JSON.parse(req.body.communicationMethod);
      const number = JSON.parse(req.body.number);
      const id = JSON.parse(req.body.id);
      const response = await this.adsService.createTruckAd(
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

  @Post('create-tractor')
  @UseInterceptors(FilesInterceptor('files', null, tractorMulterConfig))
  async createTractor(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = JSON.parse(req.body.data);
      const communicationMethod = JSON.parse(req.body.communicationMethod);
      const number = JSON.parse(req.body.number);
      const id = JSON.parse(req.body.id);
      const response = await this.adsService.createTractorAd(
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

  @Post('create-construction')
  @UseInterceptors(FilesInterceptor('files', null, constructionMulterConfig))
  async createConstruction(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = JSON.parse(req.body.data);
      const communicationMethod = JSON.parse(req.body.communicationMethod);
      const number = JSON.parse(req.body.number);
      const id = JSON.parse(req.body.id);
      const response = await this.adsService.createConstructionAd(
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

  @Post('create-trailer')
  @UseInterceptors(FilesInterceptor('files', null, trailerMulterConfig))
  async createTrailer(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = JSON.parse(req.body.data);
      const communicationMethod = JSON.parse(req.body.communicationMethod);
      const number = JSON.parse(req.body.number);
      const id = JSON.parse(req.body.id);
      const response = await this.adsService.createTrailerAd(
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

  @Post('create-wheeltire')
  @UseInterceptors(FilesInterceptor('files', null, tireMulterConfig))
  async createTireWheel(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = JSON.parse(req.body.data);
      const communicationMethod = JSON.parse(req.body.communicationMethod);
      const number = JSON.parse(req.body.number);
      const id = JSON.parse(req.body.id);
      const response = await this.adsService.createWheelTireAd(
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

  @Post('create-parts')
  @UseInterceptors(FilesInterceptor('files', null, partsMulterConfig))
  async createParts(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = JSON.parse(req.body.data);
      const communicationMethod = JSON.parse(req.body.communicationMethod);
      const number = JSON.parse(req.body.number);
      const id = JSON.parse(req.body.id);
      const response = await this.adsService.createPartsAd(
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

  @Post('create-truck-parts')
  @UseInterceptors(FilesInterceptor('files', null, truckPartsMulterConfig))
  async createTruckParts(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = JSON.parse(req.body.data);
      const communicationMethod = JSON.parse(req.body.communicationMethod);
      const number = JSON.parse(req.body.number);
      const id = JSON.parse(req.body.id);
      const response = await this.adsService.createTruckPartsAd(
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

  @Post('create-battery')
  @UseInterceptors(FilesInterceptor('files', null, batteryMulterConfig))
  async createBattery(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = JSON.parse(req.body.data);
      const communicationMethod = JSON.parse(req.body.communicationMethod);
      const number = JSON.parse(req.body.number);
      const id = JSON.parse(req.body.id);
      const response = await this.adsService.createBatteryAd(
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

  @Post('create-service')
  @UseInterceptors(FilesInterceptor('files', null, serviceMulterConfig))
  async createService(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = JSON.parse(req.body.data);
      const communicationMethod = JSON.parse(req.body.communicationMethod);
      const number = JSON.parse(req.body.number);
      const id = JSON.parse(req.body.id);
      const response = await this.adsService.createServiceAd(
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
