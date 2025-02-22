import prisma from '../../config/database.js'
import { getWhereIdentifier } from '../../utils/helper.js'

export const getTestimoniService = async (skip, limit) => {
  try {
    return await prisma.testimoni.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        company: true,
        testi: true,
        title: true,
        author: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getTestimoniByIdService = async (identifier) => {
  const whereCondition = getWhereIdentifier(identifier)
  try {
    const testimoni = await prisma.testimoni.findUnique({
      where: whereCondition,
      select: {
        id: true,
        company: true,
        title: true,
        author: true,
        testi: true,
        image: true,
      },
    })
    return testimoni
  } catch (error) {
    throw new Error(error.message)
  }
}

export const createTestimoniService = async ({
  title,
  author,
  company,
  testi,
  thumbnail,
}) => {
  try {
    const testimoni = await prisma.testimoni.create({
      data: {
        company,
        title,
        author,
        testi,
        image: thumbnail[0],
      },
    })
    return testimoni
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updateTestimoniService = async (
  identifier,
  { company, testi, thumbnail, title, author }
) => {
  const whereCondition = getWhereIdentifier(identifier)
  try {
    const testimoni = await prisma.testimoni.update({
      where: whereCondition,
      data: {
        title,
        author,
        company,
        testi,
        image: thumbnail,
      },
    })
    return testimoni
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deleteTestimoniService = async (identifier) => {
  const whereCondition = getWhereIdentifier(identifier)
  try {
    const testimoni = await prisma.testimoni.delete({
      where: whereCondition,
    })
    return testimoni
  } catch (error) {
    throw new Error(error.message)
  }
}
