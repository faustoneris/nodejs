import fastfy from 'fastify'
import { PrismaClient } from '@prisma/client'
export const app = fastfy()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Fausto Neris',
    email: 'fausto2102@hotnmail.com',
  },
})
