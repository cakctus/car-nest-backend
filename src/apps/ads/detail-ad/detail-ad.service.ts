import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DetailAdService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getCar(id: any) {
    const car = await this.prisma.car.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!car)
      throw new NotFoundException(
        'Oops! It looks like the page you were trying to reach does not exist.',
      );
    return car;
  }

  async getBus(id: any) {
    const bus = await this.prisma.busMicrobus.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!bus)
      throw new NotFoundException(
        'Oops! It looks like the page you were trying to reach does not exist.',
      );
    return bus;
  }

  async getTruck(id: any) {
    const truck = await this.prisma.truck.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!truck)
      throw new NotFoundException(
        'Oops! It looks like the page you were trying to reach does not exist.',
      );
    return truck;
  }

  async getMoto(id: any) {
    const truck = await this.prisma.moto.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!truck)
      throw new NotFoundException(
        'Oops! It looks like the page you were trying to reach does not exist.',
      );
    return truck;
  }

  async getTractor(id: any) {
    const truck = await this.prisma.agriculture.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!truck)
      throw new NotFoundException(
        'Oops! It looks like the page you were trying to reach does not exist.',
      );
    return truck;
  }

  async getTrailer(id: any) {
    const trailer = await this.prisma.trailer.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!trailer)
      throw new NotFoundException(
        'Oops! It looks like the page you were trying to reach does not exist.',
      );
    return trailer;
  }

  async getConstruction(id: any) {
    const trailer = await this.prisma.construction.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!trailer)
      throw new NotFoundException(
        'Oops! It looks like the page you were trying to reach does not exist.',
      );
    return trailer;
  }

  async getDiscTire(id: any) {
    const trailer = await this.prisma.wheelsTire.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        tire: true,
        disc: true,
      },
    });
    if (!trailer)
      throw new NotFoundException(
        'Oops! It looks like the page you were trying to reach does not exist.',
      );
    return trailer;
  }

  async getPart(id: any) {
    const trailer = await this.prisma.carParts.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!trailer)
      throw new NotFoundException(
        'Oops! It looks like the page you were trying to reach does not exist.',
      );
    return trailer;
  }

  async getTruckPart(id: any) {
    const trailer = await this.prisma.truckParts.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!trailer)
      throw new NotFoundException(
        'Oops! It looks like the page you were trying to reach does not exist.',
      );
    return trailer;
  }

  async getBattery(id: any) {
    const trailer = await this.prisma.batteries.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!trailer)
      throw new NotFoundException(
        'Oops! It looks like the page you were trying to reach does not exist.',
      );
    return trailer;
  }

  async getService(id: any) {
    const trailer = await this.prisma.autoService.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        Service: true,
        Repair: true,
        title: true,
        description: true,
        region: true,
        price: true,
        currency: true,
        photo: true,
        contacts: true,
      },
    });
    if (!trailer)
      throw new NotFoundException(
        'Oops! It looks like the page you were trying to reach does not exist.',
      );
    return trailer;
  }
}
