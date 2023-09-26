import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getPrismaInstance } from 'src/apps/prisma/prisma.providers';
import fs from 'fs';
import path from 'path';
import { ApiError } from 'exception/apiError';

@Injectable()
export class UpdateAdService {
  private readonly prisma: PrismaClient;
  photoLenght: number = 35;
  photoLength: number = 35;

  constructor() {
    this.prisma = getPrismaInstance();
  }

  getCarToUpdate = async (id: any, userId: any) => {
    const car = await this.prisma.car.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const carToUpdate = await this.prisma.car.findFirst({
      where: {
        // userId: user.id,
        id,
      },
    });

    if (car.userId === user.id) {
      return { msg: 'success', carToUpdate };
    }

    return {
      msg: 'some error',
    };
  };

  updateCar = async (id: any, userId: any, updateCar: any, files: any) => {
    const car = await this.prisma.car.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const photoList = files.map((file: any) => {
      return file.filename;
    });

    const { photo, ...newCar } = updateCar;
    console.log(photo);

    if (photo.length && photo.length > this.photoLength) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    if (car.userId === user.id) {
      if (photoList.length > 0) {
        const carToUpdate = await this.prisma.car.update({
          where: {
            id,
          },
          data: {
            ...newCar,
            photo: photoList,
          },
        });
        if (carToUpdate) {
          try {
            const prevPhotoPaths = car.photo.map((filename) =>
              path.join('media/pics/cars', filename),
            );

            prevPhotoPaths.forEach((prevPhotoPath: any) => {
              fs.unlinkSync(prevPhotoPath);
            });
          } catch (error) {
            console.log(error);
            throw error;
          }
        }
        return carToUpdate;
      }
      const carToUpdate = await this.prisma.car.update({
        where: {
          id,
        },
        data: {
          ...newCar,
          photo: photo,
        },
      });
      return carToUpdate;
    }
  };

  getBusToUpdate = async (id: any, userId: any) => {
    const car = await this.prisma.busMicrobus.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const carToUpdate = await this.prisma.busMicrobus.findFirst({
      where: {
        id,
      },
    });

    if (car.userId === user.id) {
      return { msg: 'success', carToUpdate };
    }

    return {
      msg: 'some error',
    };
  };

  updateBus = async (id: any, userId: any, updateCar: any, files: any) => {
    const car = await this.prisma.busMicrobus.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const photoList = files.map((file: any) => {
      return file.filename;
    });

    const { photo, ...newCar } = updateCar;

    if (car.userId === user.id) {
      if (photoList.length > 0) {
        const carToUpdate = await this.prisma.busMicrobus.update({
          where: {
            id,
          },
          data: {
            ...newCar,
            photo: photoList,
          },
        });
        if (carToUpdate) {
          const prevPhotoPaths = car.photo.map((filename) =>
            path.join('media/pics/bus', filename),
          );

          // Delete previous photos from the folder
          prevPhotoPaths.forEach((prevPhotoPath) => {
            fs.unlinkSync(prevPhotoPath);
          });
        }
        return carToUpdate;
      }
      const carToUpdate = await this.prisma.busMicrobus.update({
        where: {
          id,
        },
        data: {
          ...newCar,
          photo: photo,
        },
      });
      return carToUpdate;
    }
  };

  getTruckToUpdate = async (id: any, userId: any) => {
    const car = await this.prisma.truck.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const carToUpdate = await this.prisma.truck.findFirst({
      where: {
        id,
      },
    });

    if (car.userId === user.id) {
      return { msg: 'success', carToUpdate };
    }

    return {
      msg: 'some error',
    };
  };

  updateTruck = async (id: any, userId: any, updateCar: any, files: any) => {
    const car = await this.prisma.truck.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    console.log('ok');

    const photoList = files.map((file: any) => {
      return file.filename;
    });

    const { photo, ...newCar } = updateCar;

    if (photo.length && photo.length > this.photoLenght) {
      throw new BadRequestException(
        'Максимально допустимое количество фотографий 35. Numărul maxim de fotografii permis este de 35',
      );
    }

    if (car.userId === user.id) {
      if (photoList.length > 0) {
        const carToUpdate = await this.prisma.truck.update({
          where: {
            id,
          },
          data: {
            ...newCar,
            photo: photoList,
          },
        });
        // if (carToUpdate) {
        //   const prevPhotoPaths = car.photo.map((filename) =>
        //     path.join('media/pics/truck', filename),
        //   );

        //   prevPhotoPaths.forEach((prevPhotoPath) => {
        //     fs.unlinkSync(prevPhotoPath);
        //   });
        // }
        return carToUpdate;
      }
      const carToUpdate = await this.prisma.truck.update({
        where: {
          id,
        },
        data: {
          ...newCar,
          photo: photo,
        },
      });
      return carToUpdate;
    }
  };

  getMotoToUpdate = async (id: any, userId: any) => {
    const car = await this.prisma.moto.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    if (car.userId === user.id) {
      return { msg: 'success', carToUpdate: car };
    }

    return {
      msg: 'some error',
    };
  };

  updateMoto = async (id: any, userId: any, updateCar: any, files: any) => {
    const car = await this.prisma.moto.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const photoList = files.map((file: any) => {
      return file.filename;
    });

    const { photo, ...newCar } = updateCar;

    if (car.userId === user.id) {
      if (photoList.length > 0) {
        const carToUpdate = await this.prisma.moto.update({
          where: {
            id,
          },
          data: {
            ...newCar,
            photo: photoList,
          },
        });
        if (carToUpdate) {
          const prevPhotoPaths = car.photo.map((filename) =>
            path.join('media/pics/moto', filename),
          );

          prevPhotoPaths.forEach((prevPhotoPath) => {
            fs.unlinkSync(prevPhotoPath);
          });
        }
        return carToUpdate;
      }
      const carToUpdate = await this.prisma.moto.update({
        where: {
          id,
        },
        data: {
          ...newCar,
          photo: photo,
        },
      });
      return carToUpdate;
    }
  };

  getTractorToUpdate = async (id: any, userId: any) => {
    const car = await this.prisma.agriculture.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    if (car.userId === user.id) {
      return { msg: 'success', carToUpdate: car };
    }

    return {
      msg: 'some error',
    };
  };

  updateTractor = async (id: any, userId: any, updateCar: any, files: any) => {
    const car = await this.prisma.agriculture.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const photoList = files.map((file: any) => {
      return file.filename;
    });

    const { photo, ...newCar } = updateCar;

    if (car.userId === user.id) {
      if (photoList.length > 0) {
        const carToUpdate = await this.prisma.agriculture.update({
          where: {
            id,
          },
          data: {
            ...newCar,
            photo: photoList,
          },
        });
        if (carToUpdate) {
          const prevPhotoPaths = car.photo.map((filename) =>
            path.join('media/pics/tractor', filename),
          );

          prevPhotoPaths.forEach((prevPhotoPath) => {
            fs.unlinkSync(prevPhotoPath);
          });
        }
        return carToUpdate;
      }
      const carToUpdate = await this.prisma.agriculture.update({
        where: {
          id,
        },
        data: {
          ...newCar,
          photo: photo,
        },
      });
      return carToUpdate;
    }
  };

  getTrailerToUpdate = async (id: any, userId: any) => {
    const car = await this.prisma.trailer.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    if (car.userId === user.id) {
      return { msg: 'success', carToUpdate: car };
    }

    return {
      msg: 'some error',
    };
  };

  updateTrailer = async (id: any, userId: any, updateCar: any, files: any) => {
    const car = await this.prisma.trailer.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const photoList = files.map((file: any) => {
      return file.filename;
    });

    const { photo, ...newCar } = updateCar;

    if (car.userId === user.id) {
      if (photoList.length > 0) {
        const carToUpdate = await this.prisma.trailer.update({
          where: {
            id,
          },
          data: {
            ...newCar,
            photo: photoList,
          },
        });
        if (carToUpdate) {
          const prevPhotoPaths = car.photo.map((filename) =>
            path.join('media/pics/trailer', filename),
          );

          prevPhotoPaths.forEach((prevPhotoPath) => {
            fs.unlinkSync(prevPhotoPath);
          });
        }
        return carToUpdate;
      }
      const carToUpdate = await this.prisma.trailer.update({
        where: {
          id,
        },
        data: {
          ...newCar,
          photo: photo,
        },
      });
      return carToUpdate;
    }
  };

  getConstructionToUpdate = async (id: any, userId: any) => {
    const car = await this.prisma.construction.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    if (car.userId === user.id) {
      return { msg: 'success', carToUpdate: car };
    }

    return {
      msg: 'some error',
    };
  };

  updateConstruction = async (
    id: any,
    userId: any,
    updateCar: any,
    files: any,
  ) => {
    const car = await this.prisma.construction.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const photoList = files.map((file: any) => {
      return file.filename;
    });

    const { photo, ...newCar } = updateCar;

    if (car.userId === user.id) {
      if (photoList.length > 0) {
        const carToUpdate = await this.prisma.construction.update({
          where: {
            id,
          },
          data: {
            ...newCar,
            photo: photoList,
          },
        });
        if (carToUpdate) {
          const prevPhotoPaths = car.photo.map((filename) =>
            path.join('media/pics/construction', filename),
          );

          prevPhotoPaths.forEach((prevPhotoPath) => {
            fs.unlinkSync(prevPhotoPath);
          });
        }
        return carToUpdate;
      }
      const carToUpdate = await this.prisma.construction.update({
        where: {
          id,
        },
        data: {
          ...newCar,
          photo: photo,
        },
      });
      return carToUpdate;
    }
  };

  getWheelTireToUpdate = async (id: any, userId: any) => {
    const car = await this.prisma.wheelsTire.findFirst({
      where: {
        id,
      },
      include: {
        tire: true,
        disc: true,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    if (car.userId === user.id) {
      return { msg: 'success', carToUpdate: car };
    }

    return {
      msg: 'some error',
    };
  };

  updateWheelTire = async (
    id: any,
    userId: any,
    updateCar: any,
    files: any,
  ) => {
    const car = await this.prisma.wheelsTire.findFirst({
      where: {
        id,
      },
      include: {
        disc: true,
        tire: true,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const photoList = files.map((file: any) => {
      return file.filename;
    });

    const { photo, tire, disc, ...newCar } = updateCar;
    const { id: discId, ...newDisc } = disc;
    const { id: tireId, ...newTire } = tire;

    const updatedDisc = await this.prisma.disc.update({
      where: {
        id: car?.disc?.id,
      },
      data: newDisc,
    });

    const updatedTire = await this.prisma.tire.update({
      where: {
        id: car?.tire?.id,
      },
      data: newTire,
    });

    if (car.userId === user.id) {
      if (photoList.length > 0) {
        const carToUpdate = await this.prisma.wheelsTire.update({
          where: {
            id,
          },
          data: {
            ...newCar,
            photo: photoList,
            discId: updatedDisc.id,
            tireId: updatedTire.id,
          },
        });
        if (carToUpdate) {
          const prevPhotoPaths = car.photo.map((filename) =>
            path.join('media/pics/tire', filename),
          );

          prevPhotoPaths.forEach((prevPhotoPath) => {
            fs.unlinkSync(prevPhotoPath);
          });
        }
        return carToUpdate;
      }
      const carToUpdate = await this.prisma.wheelsTire.update({
        where: {
          id,
        },
        data: {
          ...newCar,
          photo: photo,
          discId: updatedDisc.id,
          tireId: updatedTire.id,
        },
      });
      return carToUpdate;
    }
  };

  getCarPartsToUpdate = async (id: any, userId: any) => {
    const car = await this.prisma.carParts.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    if (car.userId === user.id) {
      return { msg: 'success', carToUpdate: car };
    }

    return {
      msg: 'some error',
    };
  };

  updateCarParts = async (id: any, userId: any, updateCar: any, files: any) => {
    const car = await this.prisma.carParts.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const photoList = files.map((file: any) => {
      return file.filename;
    });

    const { photo, ...newCar } = updateCar;

    if (car.userId === user.id) {
      if (photoList.length > 0) {
        const carToUpdate = await this.prisma.carParts.update({
          where: {
            id,
          },
          data: {
            ...newCar,
            photo: photoList,
          },
        });
        if (carToUpdate) {
          const prevPhotoPaths = car.photo.map((filename) =>
            path.join('media/pics/parts', filename),
          );

          prevPhotoPaths.forEach((prevPhotoPath) => {
            fs.unlinkSync(prevPhotoPath);
          });
        }
        return carToUpdate;
      }
      const carToUpdate = await this.prisma.carParts.update({
        where: {
          id,
        },
        data: {
          ...newCar,
          photo: photo,
        },
      });
      return carToUpdate;
    }
  };

  getTruckPartsToUpdate = async (id: any, userId: any) => {
    const car = await this.prisma.truckParts.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    if (car.userId === user.id) {
      return { msg: 'success', carToUpdate: car };
    }

    return {
      msg: 'some error',
    };
  };

  updateTruckParts = async (
    id: any,
    userId: any,
    updateCar: any,
    files: any,
  ) => {
    const car = await this.prisma.truckParts.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const photoList = files.map((file: any) => {
      return file.filename;
    });

    const { photo, ...newCar } = updateCar;

    if (car.userId === user.id) {
      if (photoList.length > 0) {
        const carToUpdate = await this.prisma.carParts.update({
          where: {
            id,
          },
          data: {
            ...newCar,
            photo: photoList,
          },
        });
        if (carToUpdate) {
          const prevPhotoPaths = car.photo.map((filename) =>
            path.join('media/pics/truck_parts', filename),
          );

          prevPhotoPaths.forEach((prevPhotoPath) => {
            fs.unlinkSync(prevPhotoPath);
          });
        }
        return carToUpdate;
      }
      const carToUpdate = await this.prisma.truckParts.update({
        where: {
          id,
        },
        data: {
          ...newCar,
          photo: photo,
        },
      });
      return carToUpdate;
    }
  };

  getBatteryToUpdate = async (id: any, userId: any) => {
    const car = await this.prisma.batteries.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    if (car.userId === user.id) {
      return { msg: 'success', carToUpdate: car };
    }

    return {
      msg: 'some error',
    };
  };

  updateBattery = async (id: any, userId: any, updateCar: any, files: any) => {
    const car = await this.prisma.batteries.findFirst({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const photoList = files.map((file: any) => {
      return file.filename;
    });

    const { photo, ...newCar } = updateCar;

    if (car.userId === user.id) {
      if (photoList.length > 0) {
        const carToUpdate = await this.prisma.batteries.update({
          where: {
            id,
          },
          data: {
            ...newCar,
            photo: photoList,
          },
        });
        if (carToUpdate) {
          const prevPhotoPaths = car.photo.map((filename) =>
            path.join('media/pics/battery', filename),
          );

          prevPhotoPaths.forEach((prevPhotoPath) => {
            fs.unlinkSync(prevPhotoPath);
          });
        }
        return carToUpdate;
      }
      const carToUpdate = await this.prisma.batteries.update({
        where: {
          id,
        },
        data: {
          ...newCar,
          photo: photo,
        },
      });
      return carToUpdate;
    }
  };

  getServiceToUpdate = async (id: any, userId: any) => {
    const car = await this.prisma.autoService.findFirst({
      where: {
        id,
      },
      include: {
        Service: true,
        Repair: true,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    if (car.userId === user.id) {
      return { msg: 'success', carToUpdate: car };
    }

    return {
      msg: 'some error',
    };
  };

  updateService = async (id: any, userId: any, updateCar: any, files: any) => {
    const car = await this.prisma.autoService.findFirst({
      where: {
        id,
      },
      include: {
        Service: true,
        Repair: true,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!car) {
      throw new NotFoundException(
        `Обьявления с идентификатором ${id} не существует. \n Nu există niciun anunț cu id ${id}.`,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `Пользователь с идентификатором ${userId} не существует. \n Utilizatorul cu id ${id} nu există.`,
      );
    }

    if (!(car.userId === user.id)) {
      throw new BadRequestException(
        'Чтобы обновлять эту статью, вы должны быть ее автором.\n Pentru a actualiza acest articol, trebuie să fii autorul.',
      );
    }

    const photoList = files.map((file: any) => {
      return file.filename;
    });

    const {
      id: articleId,
      userId: articleUserId,
      serviceId: articleServiceId,
      repairId: articleRepairId,
      photo,
      serviceArray,
      repairArray,
      serviceCategory,
      repairCategory,
      Repair,
      Service,
      ...newCar
    } = updateCar;

    const service = await this.prisma.service.update({
      where: {
        id: car?.Service?.id,
      },
      data: {
        ...Service,
      },
    });

    const repair = await this.prisma.repair.update({
      where: {
        id: car?.Repair?.id,
      },
      data: {
        ...Repair,
      },
    });

    if (car.userId === user.id) {
      if (photoList.length > 0) {
        const carToUpdate = await this.prisma.autoService.update({
          where: {
            id,
          },
          data: {
            ...newCar,
            photo: photoList,
            serviceId: service.id,
            repairId: repair.id,
          },
        });
        if (carToUpdate) {
          const prevPhotoPaths = car.photo.map((filename) =>
            path.join('media/pics/service', filename),
          );

          prevPhotoPaths.forEach((prevPhotoPath) => {
            fs.unlinkSync(prevPhotoPath);
          });
        }
        return carToUpdate;
      }
      const carToUpdate = await this.prisma.autoService.update({
        where: {
          id,
        },
        data: {
          ...newCar,
          photo: photo,
          serviceId: service.id,
          repairId: repair.id,
        },
      });
      return carToUpdate;
    }
  };
}
