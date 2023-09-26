import { PrismaClient } from '@prisma/client';

let prismaInstance: PrismaClient;

export const getPrismaInstance = (): PrismaClient => {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }

  return prismaInstance;
};
