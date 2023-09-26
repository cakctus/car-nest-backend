import { Controller, Get, Param, Res } from '@nestjs/common';
import { AllAdsService } from './all-ads.service';

import { Request, Response, NextFunction } from 'express';

@Controller('api')
export class AllAdsController {
  constructor(private readonly allAdsService: AllAdsService) {}

  @Get('get-all-ads/:userId/:page/:limit/:categoryClicked')
  async getAllCars(
    @Res() res: Response,
    @Param('userId') userId: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    try {
      const response = await this.allAdsService.getAllCars(
        Number(userId),
        Number(page),
        Number(limit),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all-motos/:userId/:page/:limit/:categoryClicked')
  async getAllMotos(
    @Param('userId') userId: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Res() res: Response,
  ) {
    try {
      const response = await this.allAdsService.getAllMotos(
        Number(userId),
        Number(page),
        Number(limit),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all-bus/:userId/:page/:limit/:categoryClicked')
  async getAllBuses(
    @Param('userId') userId: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Res() res: Response,
  ) {
    try {
      const response = await this.allAdsService.getAllBus(
        userId,
        Number(page),
        Number(limit),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all-truck/:userId/:page/:limit/:categoryClicked')
  async getAllTrucks(
    @Param('userId') userId: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Res() res: Response,
  ) {
    try {
      const response = await this.allAdsService.getAllTruck(
        userId,
        Number(page),
        Number(limit),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all-tractor/:userId/:page/:limit/:categoryClicked')
  async getAllTractors(
    @Param('userId') userId: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Res() res: Response,
  ) {
    try {
      const response = await this.allAdsService.getAllTractor(
        userId,
        Number(page),
        Number(limit),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all-construction/:userId/:page/:limit/:categoryClicked')
  async getAllConstructions(
    @Param('userId') userId: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Res() res: Response,
  ) {
    try {
      const response = await this.allAdsService.getAllConstruction(
        userId,
        Number(page),
        Number(limit),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all-trailer/:userId/:page/:limit/:categoryClicked')
  async getAllTrailers(
    @Param('userId') userId: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Res() res: Response,
  ) {
    try {
      const response = await this.allAdsService.getAllTrailer(
        userId,
        Number(page),
        Number(limit),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all-parts/:userId/:page/:limit/:categoryClicked')
  async getAllParts(
    @Param('userId') userId: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Res() res: Response,
  ) {
    try {
      const response = await this.allAdsService.getAllParts(
        userId,
        Number(page),
        Number(limit),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all-truck-parts/:userId/:page/:limit/:categoryClicked')
  async getAllTruckParts(
    @Param('userId') userId: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Res() res: Response,
  ) {
    try {
      const response = await this.allAdsService.getAllTruckParts(
        userId,
        Number(page),
        Number(limit),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all-battery/:userId/:page/:limit/:categoryClicked')
  async getAllBattery(
    @Param('userId') userId: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Res() res: Response,
  ) {
    try {
      const response = await this.allAdsService.getAllBattery(
        userId,
        Number(page),
        Number(limit),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all-wheel-tire/:userId/:page/:limit/:categoryClicked')
  async getAllWheelTire(
    @Param('userId') userId: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Res() res: Response,
  ) {
    try {
      const response = await this.allAdsService.getAllWheelTire(
        userId,
        Number(page),
        Number(limit),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all-service/:userId/:page/:limit/:categoryClicked')
  async getAllService(
    @Param('userId') userId: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
    @Res() res: Response,
  ) {
    try {
      const response = await this.allAdsService.getAllService(
        userId,
        Number(page),
        Number(limit),
      );
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }
}
