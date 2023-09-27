// nest
import { Injectable } from '@nestjs/common';
// prisma
import { PrismaService } from 'src/apps/prisma/prisma.service';

@Injectable()
export class AllAdsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCars(userId: any) {
    const totalCount = await this.prisma.$queryRaw`
      SELECT CAST(COUNT(id) AS INTEGER) 
      FROM public."Car"
      WHERE "userId" = ${Number(userId)}
    `;

    const cars = await this.prisma.$queryRaw`
      SELECT * 
      FROM public."Car"
      WHERE "userId" = ${Number(userId)}
      ORDER BY "createdAt" DESC;
    `;

    return {
      cars,
      totalCount: totalCount[0].count,
    };
  }

  async getAllMotos(userId: any) {
    const totalCount = await this.prisma.$queryRaw`
      SELECT CAST(COUNT(id) AS INTEGER) 
      FROM public."Moto"
      WHERE "userId" = ${Number(userId)}
    `;

    const cars = await this.prisma.$queryRaw`
      SELECT * 
      FROM public."Moto"
      WHERE "userId" = ${Number(userId)}
      ORDER BY "createdAt" DESC;
    `;

    return {
      cars,
      totalCount: totalCount[0].count,
    };
  }

  async getAllBus(userId: any, page: any, limit: any) {
    const totalCount = await this.prisma.$queryRaw`
      SELECT CAST(COUNT(id) AS INTEGER) 
      FROM public."BusMicrobus"
      WHERE "userId" = ${Number(userId)}
    `;

    const cars = await this.prisma.$queryRaw`
      SELECT * 
      FROM public."BusMicrobus"
      WHERE "userId" = ${Number(userId)}
      ORDER BY "createdAt" DESC;
    `;

    return {
      cars,
      totalCount: totalCount[0].count,
    };
  }

  async getAllTruck(userId: any, page: any, limit: any) {
    const paginationOptions = { skip: (page - 1) * limit, take: limit };

    const totalCount = await this.prisma.truck.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await this.prisma.user.findFirst({
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

    const totalCount = await this.prisma.agriculture.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await this.prisma.user.findFirst({
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

    const totalCount = await this.prisma.construction.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await this.prisma.user.findFirst({
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

    const totalCount = await this.prisma.trailer.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await this.prisma.user.findFirst({
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

    const totalCount = await this.prisma.carParts.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await this.prisma.user.findFirst({
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

    const totalCount = await this.prisma.truckParts.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await this.prisma.user.findFirst({
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

    const totalCount = await this.prisma.batteries.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await this.prisma.user.findFirst({
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

    const totalCount = await this.prisma.wheelsTire.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await this.prisma.user.findFirst({
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

    const totalCount = await this.prisma.autoService.count({
      where: {
        userId: Number(userId),
      },
    });

    const user = await this.prisma.user.findFirst({
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
