/* Prisma imports */
import { PrismaClient } from "@prisma/client";

/* Env variables imports */
import { env } from "~/env.mjs";

/* Prisma types declaration */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/* Prisma database declaration */
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
