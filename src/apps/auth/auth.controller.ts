// nest
import {
  Controller,
  Next,
  Get,
  Post,
  Req,
  Res,
  Body,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// express
import { Request, Response, NextFunction } from 'express';
// services
import { AuthService } from './auth.service';
// middleware
import { UserRequestInterface } from './auth.middleware';

@Controller('api')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('reg')
  async register(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { email, password } = req.body;
      const lang = req.cookies.lang || req.cookies.i18next;

      const data: any = await this.authService.reg(email, password, lang);

      res.cookie('refreshToken', data.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true, // https
      });

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Req() req: Request,
    @Body() body: any,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { email, password } = body;
      const lang = req.cookies.lang || req.cookies.i18next;

      const data = await this.authService.login(email, password, lang);

      res.cookie('refreshToken', data.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true, // https
      });

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { refreshToken } = req.cookies;
      const { userId } = req.body.userId;

      const data = await this.authService.logout(refreshToken, userId);

      res.clearCookie('refreshToken');

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  @Get('activate/:link')
  async activate(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const activationLink = req.params.link;
      const clientUrl = this.configService.get('CLIENT_URL');

      await this.authService.activate(activationLink);

      return res.redirect(clientUrl);
    } catch (error) {
      next(error);
    }
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { refreshToken } = req.cookies;

      const data = await this.authService.refresh(refreshToken);

      res.cookie('refreshToken', data!.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.cookie('i18next', req.cookies.lang || 'en', {
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });

      return res.json(data);
    } catch (error) {
      res.clearCookie('refreshToken');
      next(error);
    }
  }

  @Get('users')
  async getUsers(
    @Req() req: UserRequestInterface,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      console.log(req.user.username);
      const data = await this.authService.getUsers();
      return res.status(200).json(data);
    } catch (error) {
      next(new HttpException(`${error.message}`, 401));
    }
  }
}
