import prisma from '../../config/database.js'

export const getSeoService = async (type) => {
  try {
    const seo = await prisma.seo.findMany({
      where: type ? { type: type } : {},
      orderBy: { updatedAt: 'desc' },
    })
    return seo
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getSeoByIdService = async (id) => {
  try {
    const seo = await prisma.seo.findUnique({ where: { id: Number(id) } })
    return seo
  } catch (error) {
    throw new Error(error.message)
  }
}

export const createSeoService = async (title, description, keywords, type) => {
  try {
    const seo = await prisma.seo.create({
      data: {
        type: type,
        pageTitle: title,
        metaDescription: description,
        keywords,
      },
    })
    return seo
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updateSeoService = async (id, title, description, keywords) => {
  try {
    const seo = await prisma.seo.update({
      where: { id: Number(id) },
      data: {
        pageTitle: title,
        metaDescription: description,
        keywords,
        updatedAt: new Date(),
      },
    })
    return seo
  } catch (error) {
    throw new Error(error.message)
  }
}
