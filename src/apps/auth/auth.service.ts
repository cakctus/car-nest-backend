import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { TokenService } from 'src/apps/token/token.service';

@Injectable()
export class AuthService {
  private readonly prisma: PrismaClient;

  constructor(private readonly tokenService: TokenService) {
    this.prisma = new PrismaClient();
  }

  async reg(email: string, seller: string, password: string | Buffer) {
    // check if user already exists
    const candidate = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // if user exists
    if (candidate) {
      throw new BadRequestException(
        `A user with email: ${email} already exists.`,
      );
    }

    // create user
    const hash = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        activationLink,
        dateJoined: new Date(),
        // seller: seller,
      },
    });

    const obj = {
      userId: user.id,
      email: user.email,
      isActivated: user.isActivated,
      accessToken: '',
      refreshToken: '',
      dateJoined: user.dateJoined,
      userPhoto: user.userPhoto,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      isStaff: user.isStaff,

      set setAccessToken(value: string) {
        this.accessToken = value;
      },

      set setRefreshToken(value: string) {
        this.refreshToken = value;
      },
    };

    // generate token
    const tokens = await this.tokenService.generateToken({ ...obj });
    obj.setAccessToken = tokens.accessToken;
    obj.setRefreshToken = tokens.refreshToken;
    await this.tokenService.saveToken(obj.userId, obj.refreshToken);

    // send an email with verify
    // await mailService.mailService(
    //   email,
    //   `http://localhost:5000/api/activate/${activationLink}`
    // );

    return {
      ...obj,
    };
  }

  async activate(link: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        activationLink: link,
      },
    });

    // check link
    if (!user) {
      throw new BadRequestException('This user does not exist');
    }

    // update isActivated
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isActivated: true,
      },
    });
  }

  async login(email: string, password: string | Buffer) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // check if user exists
    if (!user) {
      throw new BadRequestException(`User with ${email} email does not exist.`);
    }

    // check password
    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      throw new BadRequestException('Password is not correct.');
    }

    // user numbers
    const numbers = await this.prisma.number.findMany({
      where: { userId: user?.id },
    });

    const obj = {
      userId: user!.id,
      email: user!.email,
      isActivated: user!.isActivated,
      accessToken: '',
      refreshToken: '',
      dateJoined: user!.dateJoined,
      userPhoto: user!.userPhoto,
      userProfilePhoto: user!.userProfilePhoto,
      username: user!.username,
      firstName: user!.firstName,
      lastName: user!.lastName,
      isStaff: user!.isStaff,
      countryCode: user!.countryCode,
      number: user!.number,
      numbers,
      seller: user!.seller,
      comunicationMethod: user!.comunicationMethod,
      set setAccessToken(value: string) {
        this.accessToken = value;
      },

      set setRefreshToken(value: string) {
        this.refreshToken = value;
      },
    };

    // generate token
    const tokens = await this.tokenService.generateToken({ ...obj });
    obj.setAccessToken = tokens.accessToken;
    obj.setRefreshToken = tokens.refreshToken;

    // save new token
    await this.tokenService.saveToken(obj.userId, obj.refreshToken);

    return {
      ...obj,
    };
  }

  async logout(refreshToken: string, userId: number) {
    const token = await this.tokenService.removeToken(refreshToken, userId);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException();

    // check if token in db
    // const userToken = await this.tokenService.findToken(refreshToken);
    // if (!userToken) throw new UnauthorizedException()

    // check if token  is valid
    const validateToken = await this.tokenService.validateRefreshToken(
      refreshToken,
    );
    if (!validateToken) throw new UnauthorizedException();

    const user = await this.prisma.user.findUnique({
      where: {
        id: validateToken.userId,
      },
    });

    const numbers = await this.prisma.number.findMany({
      where: { userId: user?.id },
    });

    const obj = {
      userId: user!.id,
      email: user!.email,
      isActivated: user!.isActivated,
      accessToken: '',
      refreshToken: '',
      dateJoined: user!.dateJoined,
      userPhoto: user!.userPhoto,
      userProfilePhoto: user!.userProfilePhoto,
      username: user!.username,
      firstName: user!.firstName,
      lastName: user!.lastName,
      isStaff: user!.isStaff,
      countryCode: user!.countryCode,
      number: user!.number,
      numbers,
      seller: user!.seller,
      comunicationMethod: user!.comunicationMethod,

      set setAccessToken(value: string) {
        this.accessToken = value;
      },

      set setRefreshToken(value: string) {
        this.refreshToken = value;
      },
    };

    // generate token
    const tokens = await this.tokenService.generateToken({ ...obj });
    obj.setAccessToken = tokens.accessToken;
    obj.setRefreshToken = tokens.refreshToken;

    // save new token
    await this.tokenService.saveToken(obj.userId, obj.refreshToken);

    return {
      ...obj,
    };
  }

  async getUsers() {
    const users = await this.prisma.user.findMany();

    if (users) {
      return users;
    }

    return [];
  }
}
