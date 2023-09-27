// nest
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// i18n
import { I18nService } from 'nestjs-i18n';
// import { PrismaClient } from '@prisma/client';
import { unlink } from 'node:fs/promises';
import * as countries from 'country-data';
import checkFirstNumber from 'utils/phone-number/checkNumber';
// prisma
import { PrismaService } from 'src/apps/prisma/prisma.service';

// const prisma = new PrismaClient();

interface UserDto {
  [key: string]: any;
}

@Injectable()
export class ProfileService {
  constructor(
    private readonly i18n: I18nService,
    private readonly prisma: PrismaService,
  ) {}

  async getCountryCodes() {
    return countries.callingCodes.all;
  }

  async userDtoUpdateService(body: any, files: any, lang: string) {
    const {
      userId,
      accessToken,
      refreshToken,
      dateJoined,
      isActivated,
      userPhoto,
      userProfilePhoto,
      isStaff,
      numbers,
      ...userDto
    } = body;
    const id = Number(body.userId);

    const data: UserDto = Object.entries(userDto).reduce(
      (acc, [key, value]: [string, any]) => {
        if (value !== null) {
          acc[key] = String(value);
        }
        return acc;
      },
      {} as UserDto,
    );

    const { number, countryCode } = userDto;

    if (number) {
      try {
        checkFirstNumber.checkNumber(countryCode, number, lang);
      } catch (error) {
        throw new HttpException(
          this.i18n.t('translation.invalidNumber', {
            lang,
          }),
          HttpStatus.BAD_REQUEST,
        );
      }

      const n = await this.prisma.number.findFirst({
        where: {
          number: String(number.slice(1)),
        },
      });

      const numWithZeroStart = await this.prisma.number.findFirst({
        where: {
          number: String(number),
        },
      });

      if (n || numWithZeroStart) {
        throw new HttpException(
          this.i18n.t('translation.numberExistsError', {
            lang,
            args: { number },
          }),
          HttpStatus.BAD_REQUEST,
        );
      }

      if (String(number.at(0)) === '0' && String(countryCode) === '+373') {
        await this.prisma.number.create({
          data: {
            number: String(number.slice(1)),
            User: {
              connect: {
                id,
              },
            },
          },
        });
      } else {
        await this.prisma.number.create({
          data: {
            number: String(number),
            User: {
              connect: {
                id,
              },
            },
          },
        });
      }
    }

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });

    if (files['userPhoto'] && files['userPhoto'][0].fieldname === 'userPhoto') {
      const { filename, destination, path } = files['userPhoto'][0];
      const fName = filename?.replace(/\s+/g, '_');
      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      if (user!.userPhoto === '') {
        const userUpdate = await this.prisma.user.update({
          where: {
            id: user!.id,
          },
          data: {
            userPhoto: fName,
          },
        });
        return userUpdate;
      }

      if (user!.userPhoto.length > 0) {
        try {
          await unlink(destination + '\\' + `${user!.userPhoto}`);
          console.log('successfully deleted');
        } catch (error) {
          console.error('there was an error:', error);
        }
      }
      await this.prisma.user.update({
        where: {
          id: user!.id,
        },
        data: {
          userPhoto: fName,
        },
      });
    }
    if (
      files['userProfilePhoto'] &&
      files.userProfilePhoto[0].fieldname === 'userProfilePhoto'
    ) {
      const { filename } = files['userProfilePhoto'][0];
      const fName = filename?.replace(/\s+/g, '_');
      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      if (user!.userProfilePhoto === '') {
        const userUpdate = await this.prisma.user.update({
          where: {
            id: user!.id,
          },
          data: {
            userProfilePhoto: fName,
          },
        });
        return userUpdate;
      }

      const userUpdate = await this.prisma.user.update({
        where: {
          id: user!.id,
        },
        data: {
          userProfilePhoto: fName,
        },
      });
      return userUpdate;
    }
    return user;
  }

  async updateUserPhotoService(destination: any, filename: any, userId: any) {
    const fName = filename?.replace(/\s+/g, '_');
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (user!.userPhoto === '') {
      const userUpdate = await this.prisma.user.update({
        where: {
          id: user!.id,
        },
        data: {
          userPhoto: fName,
        },
      });
      return userUpdate;
    }

    if (user!.userPhoto.length > 0) {
      try {
        await unlink(destination + '\\' + `${user!.userPhoto}`);
        console.log('successfully deleted');
      } catch (error) {
        console.error('there was an error:', error);
      }
    }
    const userUpdate = await this.prisma.user.update({
      where: {
        id: user!.id,
      },
      data: {
        userPhoto: fName,
      },
    });
    return userUpdate;
  }

  async updateUserProfilePhotoService(
    destination: any,
    filename: any,
    userId: any,
  ) {
    const fName = filename?.replace(/\s+/g, '_');
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (user!.userProfilePhoto === '') {
      const userUpdate = await this.prisma.user.update({
        where: {
          id: user!.id,
        },
        data: {
          userProfilePhoto: fName,
        },
      });
      return userUpdate;
    }

    if (user!.userPhoto.length > 0) {
      try {
        await unlink(destination + '\\' + `${user!.userProfilePhoto}`);
        console.log('successfully deleted');
      } catch (error) {
        console.error('there was an error:', error);
      }
    }
    const userUpdate = await this.prisma.user.update({
      where: {
        id: user!.id,
      },
      data: {
        userProfilePhoto: fName,
      },
    });
    return userUpdate;
  }

  async updatecomunicationMethodService(
    userId: any,
    comunicationMethod: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user)
      throw new HttpException('BadRequestException', HttpStatus.BAD_REQUEST);

    if (user) {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          comunicationMethod,
        },
      });
      if (updatedUser) {
        return updatedUser;
      }
    }
  }

  async addPhoneService(userId: any, number: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user)
      throw new HttpException('BadRequestException', HttpStatus.BAD_REQUEST);

    if (user) {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          number,
        },
      });
      if (updatedUser) {
        return updatedUser;
      }
    }
  }

  async deletePhoneNumberService(id: any, lang: string) {
    const number = await this.prisma.number.findUnique({
      where: {
        id,
      },
      include: {
        User: {
          include: {
            cars: true,
            bus: true,
            trucks: true,
            tractor: true,
            construction: true,
            trailer: true,
            parts: true,
            truckParts: true,
            autoService: true,
            wheelTire: true,
          },
        },
      },
    });
    if (number) {
      const { User } = number;

      const isUsedInCar = User!.cars.some(
        (car) => car.contacts === number.number,
      );
      const isUsedInBus = User!.bus.some(
        (bus) => bus.contacts === number.number,
      );
      const isUsedInTruck = User!.trucks.some(
        (truck) => truck.contacts === number.number,
      );
      const isUsedInTractor = User!.tractor.some(
        (tractor) => tractor.contacts === number.number,
      );
      const isUsedInConstruction = User!.construction.some(
        (construction) => construction.contacts === number.number,
      );
      const isUsedInTrailer = User!.trailer.some(
        (trailer) => trailer.contacts === number.number,
      );
      const isUsedInParts = User!.parts.some(
        (parts) => parts.contacts === number.number,
      );
      const isUsedInTruckParts = User!.truckParts.some(
        (truckParts) => truckParts.contacts === number.number,
      );
      const isUsedInAutoService = User!.autoService.some(
        (autoService) => autoService.contacts === number.number,
      );
      const isUsedInWheelTire = User!.wheelTire.some(
        (wheelTire) => wheelTire.contacts === number.number,
      );

      if (
        isUsedInCar ||
        isUsedInBus ||
        isUsedInTruck ||
        isUsedInTractor ||
        isUsedInConstruction ||
        isUsedInTrailer ||
        isUsedInParts ||
        isUsedInTruckParts ||
        isUsedInAutoService ||
        isUsedInWheelTire
      ) {
        throw new HttpException(
          this.i18n.t('translation.deleteNumberError', {
            lang,
          }),
          HttpStatus.BAD_REQUEST,
        );
      }

      const deleted = await this.prisma.number.delete({
        where: {
          id,
        },
      });

      return deleted;
    } else
      throw new HttpException('BadRequestException', HttpStatus.BAD_REQUEST);
  }
}
