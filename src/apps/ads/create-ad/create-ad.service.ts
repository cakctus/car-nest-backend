import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateAdService {
  private readonly prisma: PrismaClient;
  private readonly photoLenght: number = 35;

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

    if (photo.length && photo.length > this.photoLenght) {
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

    if (photo.length && photo.length > this.photoLenght) {
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

  async createBusAd(
    id: any,
    carData: any,
    files: any,
    comunicationMethod: any,
    number: any,
  ) {
    const {
      brand,
      model,
      registration,
      condition,
      description,
      region,
      price,
      currency,
      fuelType,
      steering,
      transmission,
      busBodyType,
      busCategory,
      year,
      engineVolume,
      seats,
      mileage,
      mileageType,
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

    if (photo.length && photo.length > this.photoLenght) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    const createdBus = await this.prisma.busMicrobus.create({
      data: {
        uuid: uuidv4(),
        brand,
        model,
        registration,
        condition,
        description,
        region,
        price,
        currency,
        fuelType,
        steering,
        transmission,
        busBodyType,
        busCategory,
        year,
        engineVolume,
        seats,
        mileage,
        mileageType,
        drive,
        contacts,
        photo,
        User: {
          connect: {
            id,
          },
        },
      },
    });
    return createdBus;
  }

  async createTruckAd(
    id: any,
    carData: any,
    files: any,
    comunicationMethod: any,
    number: any,
  ) {
    const {
      brand,
      model,
      registration,
      condition,
      description,
      region,
      price,
      currency,
      steering,
      fuelType,
      truckBodyType,
      cabinType,
      drive,
      year,
      engineVolume,
      enginPower,
      truckTransmissionsType,
      mileage,
      mileageType,
      loadCapacity,
      loadCapacityType,
      totalWeighTitle,
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

    if (photo.length && photo.length > this.photoLenght) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    const createdTruck = await this.prisma.truck.create({
      data: {
        uuid: uuidv4(),
        brand,
        model,
        registration,
        condition,
        description,
        region,
        price,
        currency,
        steering,
        fuelType,
        truckBodyType,
        cabinType,
        drive,
        year,
        engineVolume,
        enginPower,
        truckTransmissionsType,
        mileage,
        mileageType,
        loadCapacity,
        loadCapacityType,
        totalWeighTitle,
        contacts,
        photo,
        User: {
          connect: {
            id,
          },
        },
      },
    });
    return createdTruck;
  }

  async createTractorAd(
    id: any,
    carData: any,
    files: any,
    comunicationMethod: any,
    number: any,
  ) {
    const {
      title,
      region,
      price,
      currency,
      manufacturer,
      tractorType,
      condition,
      contacts,
      description,
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

    if (photo.length && photo.length > this.photoLenght) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    const createdTractor = await this.prisma.agriculture.create({
      data: {
        uuid: uuidv4(),
        title,
        region,
        price,
        condition,
        currency,
        manufacturer,
        tractorType,
        description,
        contacts,
        photo,
        User: {
          connect: {
            id,
          },
        },
      },
    });

    return createdTractor;
  }

  async createConstructionAd(
    id: any,
    carData: any,
    files: any,
    comunicationMethod: any,
    number: any,
  ) {
    const {
      title,
      description,
      region,
      price,
      currency,
      constructionTypes,
      condition,
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

    if (photo.length && photo.length > this.photoLenght) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    const createdConstruction = await this.prisma.construction.create({
      data: {
        uuid: uuidv4(),
        title,
        description,
        region,
        price,
        currency,
        constructionTypes,
        condition,
        contacts,
        photo,
        User: {
          connect: {
            id,
          },
        },
      },
    });
    return createdConstruction;
  }

  async createTrailerAd(
    id: any,
    carData: any,
    files: any,
    comunicationMethod: any,
    number: any,
  ) {
    const {
      title,
      description,
      region,
      price,
      currency,
      trailerTypes,
      year,
      trailerCondition,
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

    if (photo.length && photo.length > this.photoLenght) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    const createdConstruction = await this.prisma.trailer.create({
      data: {
        uuid: uuidv4(),
        title,
        description,
        region,
        price,
        currency,
        trailerTypes,
        year,
        trailerCondition,
        contacts,
        photo,
        User: {
          connect: {
            id,
          },
        },
      },
    });
    return createdConstruction;
  }

  async createWheelTireAd(
    id: any,
    carData: any,
    files: any,
    comunicationMethod: any,
    number: any,
  ) {
    const {
      wheelTireTypes,
      purpose,
      title,
      description,
      region,
      price,
      currency,
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

    if (photo.length && photo.length > this.photoLenght) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    const disc = await this.prisma.disc.create({
      data: {
        discType: carData.disc.discType,
        diameter: carData.disc.diameter,
        holeCount: carData.disc.holeCount,
        brand: carData.disc.brand,
      },
    });

    const tire = await this.prisma.tire.create({
      data: {
        diameter: carData.tire.diameter,
        profileHeight: carData.tire.profileHeight,
        profileWidth: carData.tire.profileWidth,
        season: carData.tire.season,
        condition: carData.tire.condition,
        brand: carData.tire.brand,
      },
    });

    const created = await this.prisma.wheelsTire.create({
      data: {
        uuid: uuidv4(),
        wheelTireTypes,
        purpose,
        title,
        description,
        region,
        price,
        currency,
        contacts,
        photo,
        disc: {
          connect: {
            id: disc.id,
          },
        },
        tire: {
          connect: {
            id: tire.id,
          },
        },
        User: {
          connect: {
            id,
          },
        },
      },
    });
    return created;
  }

  async createPartsAd(
    id: any,
    carData: any,
    files: any,
    comunicationMethod: any,
    number: any,
  ) {
    const {
      title,
      description,
      region,
      price,
      currency,
      partsCategory,
      brand,
      model,
      generation,
      modification,
      modelId,
      generationId,
      modificationId,
      partsCondition,
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

    if (photo.length && photo.length > this.photoLenght) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    const created = await this.prisma.carParts.create({
      data: {
        uuid: uuidv4(),
        title,
        description,
        region,
        price,
        currency,
        partsCategory,
        brand,
        model,
        generation,
        modification,
        modelId: String(modelId),
        generationId: String(generationId),
        modificationId: String(modificationId),
        partsCondition,
        contacts,
        photo,
        User: {
          connect: {
            id,
          },
        },
      },
    });
    return created;
  }

  async createTruckPartsAd(
    id: any,
    carData: any,
    files: any,
    comunicationMethod: any,
    number: any,
  ) {
    const {
      title,
      description,
      region,
      partsCategory,
      price,
      currency,
      brand,
      partsCondition,
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

    if (photo.length && photo.length > this.photoLenght) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    const created = await this.prisma.truckParts.create({
      data: {
        uuid: uuidv4(),
        title,
        description,
        region,
        partsCategory,
        price,
        currency,
        brand,
        partsCondition,
        contacts,
        photo,
        User: {
          connect: {
            id,
          },
        },
      },
    });
    return created;
  }

  async createBatteryAd(
    id: any,
    carData: any,
    files: any,
    comunicationMethod: any,
    number: any,
  ) {
    const {
      title,
      description,
      region,
      price,
      currency,
      batteryBrands,
      partsCondition,
      brand,
      model,
      modelId,
      carSeries,
      applicability,
      positiveTerminal,
      housingType,
      electrolyteType,
      terminals,
      maintenanceLevel,
      mountingType,
      capacity,
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

    if (photo.length && photo.length > this.photoLenght) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    const created = await this.prisma.batteries.create({
      data: {
        uuid: uuidv4(),
        title,
        description,
        region,
        price,
        currency,
        batteryBrands,
        partsCondition,
        brand,
        model,
        modelId: String(modelId),
        carSeries,
        applicability,
        positiveTerminal,
        housingType,
        electrolyteType,
        terminals,
        maintenanceLevel,
        mountingType,
        capacity,
        contacts,
        photo,
        User: {
          connect: {
            id,
          },
        },
      },
    });
    return created;
  }

  async createServiceAd(
    id: any,
    carData: any,
    files: any,
    comunicationMethod: any,
    number: any,
  ) {
    const {
      title,
      description,
      region,
      price,
      currency,
      contacts,
      serviceArray,
      repairArray,
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

    if (photo.length && photo.length > this.photoLenght) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    const service = await this.prisma.service.create({
      data: {
        serviceForCars: serviceArray.includes(1),
        serviceForMinibuses: serviceArray.includes(2),
        serviceForBuses: serviceArray.includes(3),
        serviceForTrucks: serviceArray.includes(4),
        serviceForSpecial: serviceArray.includes(5),
        serviceForAgricultural: serviceArray.includes(6),
      },
    });

    const repair = await this.prisma.repair.create({
      data: {
        repairEngine: repairArray.includes(1),
        repairElectrical: repairArray.includes(2),
        repairBodyFrames: repairArray.includes(3),
        repairSuspension: repairArray.includes(4),
        repairChassis: repairArray.includes(5),
        repairTransmission: repairArray.includes(6),
        repairManagementSystems: repairArray.includes(7),
        repairSafetySystems: repairArray.includes(8),
        repairAlarmSystems: repairArray.includes(9),
        repairPainting: repairArray.includes(10),
        repairBodyAlignment: repairArray.includes(11),
        repairAirConditioning: repairArray.includes(12),
        repairDetailing: repairArray.includes(13),
        repairGlassOptics: repairArray.includes(14),
      },
    });

    const created = await this.prisma.autoService.create({
      data: {
        uuid: uuidv4(),
        title,
        description,
        region,
        price,
        currency,
        contacts,
        photo,
        Service: {
          connect: {
            id: service.id,
          },
        },
        Repair: {
          connect: {
            id: repair.id,
          },
        },
        User: {
          connect: {
            id,
          },
        },
      },
    });
    return created;
  }
}
