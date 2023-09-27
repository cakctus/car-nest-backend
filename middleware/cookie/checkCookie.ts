import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../../src/apps/token/token.service';

@Injectable()
export class CheckCookieMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;

      // Check if refreshToken in request header
      if (!refreshToken) {
        return next(
          new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED),
        );
      }

      // Validate access token
      const validateToken =
        this.tokenService.validateRefreshToken(refreshToken);

      if (!validateToken) {
        return next(
          new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED),
        );
      }

      console.log('middleware  get car');

      next();
    } catch (error) {
      return next(error);
    }
  }
}
