import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Skip Prisma initialization during Next.js build
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build'

export const prisma = (() => {
  if (isBuildTime) {
    // Return a mock client during build to avoid initialization errors
    return {} as PrismaClient
  }
  
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma
  }
  
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
  
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client
  }
  
  return client
})()

