// nest
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Req,
  Res,
  Next,
  UploadedFiles,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
// express
import { Request, Response, NextFunction } from 'express';
// services
import { ProfileService } from './profile.service';
// utils
import { deleteKeysByPattern } from 'utils/redis/deleteRedisKeys';

@Controller('api/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('countries')
  async getCountriesCodes(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const response = await this.profileService.getCountryCodes();

      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Post('user-dto')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'userPhoto', maxCount: 1 },
      { name: 'userProfilePhoto', maxCount: 1 },
    ]),
  )
  async userDtoUpdate(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    @UploadedFiles()
    files: {
      userPhoto?: Express.Multer.File[];
      userProfilePhoto?: Express.Multer.File[];
    },
  ) {
    try {
      const body = JSON.parse(req.body.body);
      const lang = req.cookies.lang || req.cookies.i18next;

      const response = await this.profileService.userDtoUpdateService(
        body,
        files,
        lang,
      );

      const cookieId = req?.cookies?.sessionID;
      await deleteKeysByPattern(`*:${cookieId}:*`);
      await deleteKeysByPattern(`recomendation:car:${cookieId}:*`);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Post('update-user-contacts')
  async updateUserContacts(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { userId, comunicationMethod } = req.body;

      const response =
        await this.profileService.updatecomunicationMethodService(
          userId,
          comunicationMethod,
        );

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Post('add-phone')
  async addPhone(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { userId, number } = req.body;

      const response =
        await this.profileService.updatecomunicationMethodService(
          userId,
          number,
        );

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Post('delete-phone')
  async deletePhone(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { id } = req.body;
      const lang = req.cookies.lang || req.cookies.i18next;

      const data = await this.profileService.deletePhoneNumberService(id, lang);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
