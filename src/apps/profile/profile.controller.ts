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
import { ProfileService } from './profile.service';
import { Request, Response, NextFunction } from 'express';

@Controller('api/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('countries')
  async getCountriesCodes(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const response = await this.profileService.getCountryCodes();
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(
        new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR),
      );
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
      const response = await this.profileService.userDtoUpdateService(
        body,
        files,
      );
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
      const data = await this.profileService.deletePhoneNumberService(id);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
