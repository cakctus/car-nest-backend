import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { unlink } from 'node:fs/promises';
import * as countries from 'country-data';

const prisma = new PrismaClient();

interface UserDto {
  [key: string]: any;
}

@Injectable()
export class ProfileService {
  async getCountryCodes() {
    return countries.callingCodes.all;
  }

  async userDtoUpdateService(body: any, files: any) {
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
      // number,
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

    const { number } = userDto;

    if (number) {
      const n = await prisma.number.findFirst({
        where: {
          number: String(number),
        },
      });
      if (n) {
        throw new BadRequestException('Number already exists.');
      }
      const createdNumber = await prisma.number.create({
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

    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    if (files['userPhoto'] && files['userPhoto'][0].fieldname === 'userPhoto') {
      const { filename, destination, path } = files['userPhoto'][0];
      const fName = filename?.replace(/\s+/g, '_');
      const user = await prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      if (user!.userPhoto === '') {
        const userUpdate = await prisma.user.update({
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
      const userUpdate = await prisma.user.update({
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
      const { filename, destination, path } = files['userProfilePhoto'][0];
      const fName = filename?.replace(/\s+/g, '_');
      const user = await prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });

      if (user!.userProfilePhoto === '') {
        const userUpdate = await prisma.user.update({
          where: {
            id: user!.id,
          },
          data: {
            userProfilePhoto: fName,
          },
        });
        return userUpdate;
      }

      const userUpdate = await prisma.user.update({
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

  async updateUserPhotoService(
    destination: any,
    filename: any,
    path: any,
    userId: any,
  ) {
    const fName = filename?.replace(/\s+/g, '_');
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (user!.userPhoto === '') {
      const userUpdate = await prisma.user.update({
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
        //@ts-ignore
        // const __filename = fileURLToPath(import.meta.url)
        // const __dirname = dirname(__filename)
        // const f = `media/profile/users/${user!.userPhoto}`

        // console.log(dirname(process.cwd()) + join("/", f)) // /users/joe
        // console.log(basename(f)) // notes.txt
        // console.log(extname(f))
        // console.log(join("/", f))
        // const j = join("/", f)
        await unlink(destination + '\\' + `${user!.userPhoto}`);
        console.log('successfully deleted');
      } catch (error) {
        console.error('there was an error:', error);
      }
    }
    const userUpdate = await prisma.user.update({
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
    path: any,
    userId: any,
  ) {
    const fName = filename?.replace(/\s+/g, '_');
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (user!.userProfilePhoto === '') {
      const userUpdate = await prisma.user.update({
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
        //@ts-ignore
        // const __filename = fileURLToPath(import.meta.url)
        // const __dirname = dirname(__filename)
        // const f = `media/profile/users/${user!.userPhoto}`

        // console.log(dirname(process.cwd()) + join("/", f)) // /users/joe
        // console.log(basename(f)) // notes.txt
        // console.log(extname(f))
        // console.log(join("/", f))
        // const j = join("/", f)
        await unlink(destination + '\\' + `${user!.userProfilePhoto}`);
        console.log('successfully deleted');
      } catch (error) {
        console.error('there was an error:', error);
      }
    }
    const userUpdate = await prisma.user.update({
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
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new BadRequestException('User does not exist');

    if (user) {
      const updatedUser = await prisma.user.update({
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
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new BadRequestException('User does not exist');

    if (user) {
      const updatedUser = await prisma.user.update({
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

  async deletePhoneNumberService(id: any) {
    const number = await prisma.number.findUnique({
      where: {
        id,
      },
    });
    if (number) {
      const deleted = await prisma.number.delete({
        where: {
          id,
        },
      });
      return deleted;
    } else throw new BadRequestException();
  }
}

export default new ProfileService();
