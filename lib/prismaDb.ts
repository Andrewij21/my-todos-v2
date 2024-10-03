
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;


// import { PrismaClient } from '@prisma/client';

// declare const global: Global & { prisma?: PrismaClient };

// export let prisma: PrismaClient;

// if (typeof window === 'undefined') {
//   if (process.env['NODE_ENV'] === 'production') {
//     prisma = new PrismaClient();
//   } else {
//     if (!global.prisma) {
//       global.prisma = new PrismaClient();
//     }
//     prisma = global.prisma;
//   }
// }