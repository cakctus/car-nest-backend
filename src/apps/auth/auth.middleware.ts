import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from 'src/apps/token/token.service';

interface User {
  userId: number;
  email: string;
  isActivated: boolean;
  accessToken: string;
  refreshToken: string;
  dateJoined: string;
  userPhoto: string;
  userProfilePhoto: string;
  username: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  countryCode: string;
  number: string;
  numbers: { id: number; number: string; userId: number }[];
  seller: string;
  comunicationMethod: string;
  iat: number;
  exp: number;
}

export interface UserRequestInterface extends Request {
  user: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  async use(req: UserRequestInterface, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return next(new UnauthorizedException());
      }

      const accessToken = authHeader.split(' ')[1];

      if (accessToken === 'null') {
        return next(new UnauthorizedException());
      }

      const userData = await this.tokenService.validateAccessToken(accessToken);

      if (!userData) {
        return next(new UnauthorizedException());
      }

      let user: User;
      if (typeof userData === 'object' && 'userId' in userData) {
        // Create a new User object and map the properties from JwtPayload to User
        user = {
          userId: userData.userId,
          email: userData.email,
          isActivated: userData.isActivated,
          accessToken: userData.accessToken,
          refreshToken: userData.refreshToken,
          dateJoined: userData.dateJoined,
          userPhoto: userData.userPhoto,
          userProfilePhoto: userData.userProfilePhoto,
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          isStaff: userData.isStaff,
          countryCode: userData.countryCode,
          number: userData.number,
          numbers: userData.numbers,
          seller: userData.seller,
          comunicationMethod: userData.comunicationMethod,
          iat: userData.iat,
          exp: userData.exp,
        };
      }
      // else {
      //   // Handle the case where userData is not a JwtPayload object
      //   // You may want to throw an exception or handle this case based on your application logic
      //   throw new UnauthorizedException('Invalid user data');
      // }

      req.user = user;
      // console.log(req.user);

      // Optionally, you can attach the user data to the request for later use in your controllers.
      //   req.user = userData;

      next();
    } catch (error) {
      return next(error);
    }
  }
}
