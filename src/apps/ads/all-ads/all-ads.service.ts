import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AllAdsService {
  async getAllCars(userId: any, page: number, limit: number) {
    const paginationOptions = { skip: (page - 1) * limit, take: limit };

    const totalCount = await prisma.car.count({
      where: {
        userId: userId,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        cars: { ...paginationOptions },
      },
    });

    return {
      cars: user?.cars,
      totalCount,
    };
  }

  async getAllMotos(userId: any, page: any, limit: any) {
    const paginationOptions = { skip: (page - 1) * limit, take: limit };

    const totalCount = await prisma.moto.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },

      include: {
        motos: { ...paginationOptions },
      },
    });

    return {
      cars: user?.motos,
      totalCount,
    };
  }

  async getAllBus(userId: any, page: any, limit: any) {
    const paginationOptions = { skip: (page - 1) * limit, take: limit };

    const totalCount = await prisma.busMicrobus.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },

      include: {
        bus: { ...paginationOptions },
      },
    });

    return {
      cars: user?.bus,
      totalCount,
    };
  }

  async getAllTruck(userId: any, page: any, limit: any) {
    const paginationOptions = { skip: (page - 1) * limit, take: limit };

    const totalCount = await prisma.truck.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },

      include: {
        trucks: { ...paginationOptions },
      },
    });

    return {
      cars: user?.trucks,
      totalCount,
    };
  }

  async getAllTractor(userId: any, page: any, limit: any) {
    const paginationOptions = { skip: (page - 1) * limit, take: limit };

    const totalCount = await prisma.agriculture.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },

      include: {
        tractor: { ...paginationOptions },
      },
    });

    return {
      cars: user?.tractor,
      totalCount,
    };
  }

  async getAllConstruction(userId: any, page: any, limit: any) {
    const paginationOptions = { skip: (page - 1) * limit, take: limit };

    const totalCount = await prisma.construction.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },

      include: {
        construction: { ...paginationOptions },
      },
    });

    return {
      cars: user?.construction,
      totalCount,
    };
  }

  async getAllTrailer(userId: any, page: any, limit: any) {
    const paginationOptions = { skip: (page - 1) * limit, take: limit };

    const totalCount = await prisma.trailer.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },

      include: {
        trailer: { ...paginationOptions },
      },
    });

    return {
      cars: user?.trailer,
      totalCount,
    };
  }

  async getAllParts(userId: any, page: any, limit: any) {
    const paginationOptions = { skip: (page - 1) * limit, take: limit };

    const totalCount = await prisma.carParts.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },

      include: {
        parts: { ...paginationOptions },
      },
    });

    return {
      cars: user?.parts,
      totalCount,
    };
  }

  async getAllTruckParts(userId: any, page: any, limit: any) {
    const paginationOptions = { skip: (page - 1) * limit, take: limit };

    const totalCount = await prisma.truckParts.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },

      include: {
        truckParts: { ...paginationOptions },
      },
    });

    return {
      cars: user?.truckParts,
      totalCount,
    };
  }

  async getAllBattery(userId: any, page: any, limit: any) {
    const paginationOptions = { skip: (page - 1) * limit, take: limit };

    const totalCount = await prisma.batteries.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },

      include: {
        battery: { ...paginationOptions },
      },
    });

    return {
      cars: user?.battery,
      totalCount,
    };
  }

  async getAllWheelTire(userId: any, page: any, limit: any) {
    const paginationOptions = { skip: (page - 1) * limit, take: limit };

    const totalCount = await prisma.wheelsTire.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },

      include: {
        wheelTire: { ...paginationOptions },
      },
    });

    return {
      cars: user?.wheelTire,
      totalCount,
    };
  }

  async getAllService(userId: any, page: any, limit: any) {
    const paginationOptions = { skip: (page - 1) * limit, take: limit };

    const totalCount = await prisma.autoService.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },

      include: {
        autoService: { ...paginationOptions },
      },
    });

    return {
      cars: user?.autoService,
      totalCount,
    };
  }
}
