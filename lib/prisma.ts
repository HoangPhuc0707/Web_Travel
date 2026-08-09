import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL?.trim()
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim()

  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  const adapter = new PrismaLibSql({ url, authToken })
  return new PrismaClient({ adapter })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
