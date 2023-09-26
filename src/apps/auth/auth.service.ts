// nest
import {
  BadRequestException,
  HttpStatus,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
//  i18n
import { I18nService } from 'nestjs-i18n';
// bcrypt && uuid
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
//  services
import { TokenService } from 'src/apps/token/token.service';
import { PrismaService } from 'src/apps/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly i18n: I18nService,
  ) {}

  async reg(email: string, password: string | Buffer, lang: string) {
    // check if user already exists
    const candidate = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // if user exists
    if (candidate) {
      throw new HttpException(
        this.i18n.t('translation.userExistsError', {
          lang,
          args: { email },
        }),
        HttpStatus.BAD_REQUEST,
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
    //   `http://localhost:5000/api/activate/${activationLink}`,
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

  async login(email: string, password: string | Buffer, lang: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // throw error if user doesn't exist
    if (!user) {
      throw new HttpException(
        this.i18n.t('translation.userExistsError', {
          lang,
          args: { email },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    // check password
    const isPassEqual = await bcrypt.compare(password, user.password);

    // if password is not correct throw error
    if (!isPassEqual) {
      throw new HttpException(
        this.i18n.t('translation.incorrectPasswordError', {
          lang,
          args: { email },
        }),
        HttpStatus.BAD_REQUEST,
      );
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
    const userToken = await this.tokenService.findToken(refreshToken);

    // throw new UnauthorizedException if user already logged
    if (!userToken)
      throw new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED);

    // check if token  is valid
    const validateToken = await this.tokenService.validateRefreshToken(
      refreshToken,
    );

    // throw new UnauthorizedException if toke is not valid;
    if (!validateToken)
      throw new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED);

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
