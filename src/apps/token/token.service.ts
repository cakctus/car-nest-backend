import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

const prisma = new PrismaClient();

interface Payload {
  userId?: number;
  email?: string;
  isActivated?: boolean;
  accessToken?: string;
  refreshToken?: string;
  dateJoined?: any;
  userPhoto?: string;
  username?: any;
  firstName?: any;
  lastName?: any;
  isStaff?: any;
}

interface JwtPayload {
  userId: number;
}

@Injectable()
export class TokenService {
  async generateToken(payload: Payload) {
    const accessToken = jwt.sign(payload, 'secret', {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(payload, 'secret', {
      expiresIn: '15d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, 'secret') as JwtPayload;
      return userData;
    } catch (error) {
      return null;
    }
  }

  async validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, 'secret');
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(id: number, refreshToken: string) {
    const existingToken = await prisma.token.findFirst({
      where: {
        userId: id,
      },
    });

    if (existingToken) {
      // If the user already has a refresh token, update it
      const token = await prisma.token.update({
        where: {
          id: existingToken.id,
        },
        data: {
          refreshToken: refreshToken,
        },
      });
      return token;
    } else {
      // If the user does not have a refresh token, create a new one
      const token = await prisma.token.create({
        data: {
          userId: id,
          refreshToken: refreshToken,
        },
      });
      return token;
    }
  }

  async removeToken(refreshToken: string, userId: number) {
    const token = await prisma.token.findFirst({
      where: {
        refreshToken: refreshToken,
        userId: userId,
      },
    });

    if (token) {
      await prisma.token.delete({
        where: {
          id: token.id,
        },
      });
    }
  }

  async findToken(refreshToken: string) {
    const token = await prisma.token.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
    return token;
  }
}
