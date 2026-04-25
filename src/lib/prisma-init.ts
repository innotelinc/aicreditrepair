import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: any
}

const getPrisma = () => {
  if (global.prisma) return global.prisma

  // During build, we MUST NOT instantiate PrismaClient if it will throw
  // Since the build-time environment often varies, we use a try-catch 
  // or check for the critical env var.
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is missing. Using mock prisma client for build.')
    return {
      user: { update: async () => ({}) },
      creditReport: { create: async () => ({ id: 'mock-id' }) },
      dispute: { create: async () => ({ id: 'mock-id' }) },
      // Add any other models used in the app here
    }
  }

  try {
    const client = new PrismaClient()
    if (process.env.NODE_ENV !== 'production') global.prisma = client
    return client
  } catch (e) {
    console.error('Failed to instantiate PrismaClient:', e)
    return {
      user: { update: async () => ({}) },
      creditReport: { create: async () => ({ id: 'mock-id' }) },
      dispute: { create: async () => ({ id: 'mock-id' }) },
    }
  }
}

export const prisma = getPrisma()
