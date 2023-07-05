import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateAdService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createAd(
    id: any,
    carData: any,
    files: any,
    comunicationMethod: any,
    number: any,
  ) {
    const {
      brand,
      model,
      generation,
      modification,
      modelId,
      generationId,
      modificationId,
      registration,
      condition,
      description,
      region,
      price,
      currency,
      author,
      year,
      seats,
      steering,
      bodyType,
      doors,
      mileage,
      mileageType,
      engineVolume,
      enginePower,
      fuelType,
      transmission,
      drive,
      contacts,
    } = carData;

    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (user) {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          comunicationMethod,
        },
      });
    }

    const { countryCode } = carData;

    if (number) {
      const checkNumber = await this.prisma.number.findFirst({
        where: {
          number,
        },
      });
      if (checkNumber) {
        throw new BadRequestException('Number already exists');
      } else {
        await this.prisma.number.create({
          data: {
            number,
            User: {
              connect: {
                id,
              },
            },
          },
        });
        if (countryCode) {
          await this.prisma.user.update({
            where: {
              id,
            },
            data: {
              countryCode,
            },
          });
        }
      }
    }

    const photo = files.map((file: any) => {
      return file.filename;
    });

    if (photo.length && photo.length > 35) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    const createdCar = await this.prisma.car.create({
      data: {
        uuid: uuidv4(),
        brand: String(brand),
        model,
        registration,
        generation,
        modification,
        modelId,
        generationId,
        modificationId,
        condition,
        description,
        region,
        price,
        currency,
        author,
        year,
        seats,
        steering,
        bodyType,
        doors,
        mileage,
        mileageType,
        engineVolume,
        enginePower,
        fuelType,
        transmission,
        photo,
        drive,
        contacts,
        User: {
          connect: {
            id,
          },
        },
      },
    });

    return createdCar;
  }

  async createMotoAdService(
    id: any,
    carData: any,
    files: any,
    comunicationMethod: any,
    number: any,
  ) {
    const {
      brand,
      model,
      modelId,
      registration,
      condition,
      description,
      region,
      price,
      currency,
      motorcycleType,
      year,
      engineVolume,
      mileage,
      mileageType,
      enginePower,
      motorcycleTransmission,
      contacts,
    } = carData;

    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (user) {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          comunicationMethod,
        },
      });
    }

    const { countryCode } = carData;

    if (number) {
      const checkNumber = await this.prisma.number.findFirst({
        where: {
          number,
        },
      });
      if (checkNumber) {
        throw new BadRequestException('Number already exists');
      } else {
        await this.prisma.number.create({
          data: {
            number,
            User: {
              connect: {
                id,
              },
            },
          },
        });
        if (countryCode) {
          await this.prisma.user.update({
            where: {
              id,
            },
            data: {
              countryCode,
            },
          });
        }
      }
    }

    const photo = files.map((file: any) => {
      return file.filename;
    });

    if (photo.length && photo.length > 35) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    const createdCar = await this.prisma.moto.create({
      data: {
        uuid: uuidv4(),
        brand,
        model,
        modelId,
        registration,
        motorcycleType,
        condition,
        description,
        region,
        price,
        currency,
        year,
        mileage,
        mileageType,
        engineVolume,
        enginePower,
        motorcycleTransmission,
        photo,
        contacts,
        User: {
          connect: {
            id,
          },
        },
      },
    });
    return createdCar;
  }
}
