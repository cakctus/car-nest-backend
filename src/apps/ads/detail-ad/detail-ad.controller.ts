import { Controller, Get, Param, Res } from '@nestjs/common';
import { DetailAdService } from './detail-ad.service';
import { Response } from 'express';

@Controller('api/detail')
export class DetailAdController {
  constructor(private readonly detailService: DetailAdService) {}

  @Get('car/:id')
  async getCar(@Param('id') id: any, @Res() res: Response) {
    try {
      const response = await this.detailService.getCar(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('bus/:id')
  async getBus(@Param('id') id: any, @Res() res: Response) {
    try {
      const response = await this.detailService.getBus(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('truck/:id')
  async getTruck(@Param('id') id: any, @Res() res: Response) {
    try {
      const response = await this.detailService.getTruck(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('moto/:id')
  async getMoto(@Param('id') id: any, @Res() res: Response) {
    try {
      const response = await this.detailService.getMoto(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('tractor/:id')
  async getTractor(@Param('id') id: any, @Res() res: Response) {
    try {
      const response = await this.detailService.getTractor(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('trailer/:id')
  async getTrailer(@Param('id') id: any, @Res() res: Response) {
    try {
      const response = await this.detailService.getTrailer(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('construction/:id')
  async getConstruction(@Param('id') id: any, @Res() res: Response) {
    try {
      const response = await this.detailService.getConstruction(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('disc-tire/:id')
  async getDiscTire(@Param('id') id: any, @Res() res: Response) {
    try {
      const response = await this.detailService.getDiscTire(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('part/:id')
  async getPart(@Param('id') id: any, @Res() res: Response) {
    try {
      const response = await this.detailService.getPart(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('truck-part/:id')
  async getTruckPart(@Param('id') id: any, @Res() res: Response) {
    try {
      const response = await this.detailService.getTruckPart(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('battery/:id')
  async getBattery(@Param('id') id: any, @Res() res: Response) {
    try {
      const response = await this.detailService.getBattery(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('service/:id')
  async getService(@Param('id') id: any, @Res() res: Response) {
    try {
      const response = await this.detailService.getService(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }
}
