import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  (process.env.DATABASE_URL 
    ? new PrismaClient() 
    : null as any)

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
