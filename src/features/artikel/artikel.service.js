import prisma from '../../config/database.js'
import { extractGambar, getWhereIdentifier } from '../../utils/helper.js'

export const getArtikelService = async (filter, skip, limit) => {
  try {
    const artikel = await prisma.artikel.findMany({
      where: filter,
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        tags: true,
        category: true,
        content: true,
        slug: true,
        thumbnail: true,
        createdAt: true,
        updatedAt: true,
        author: true,
        seo: {
          select: {
            id: true,
            type: true,
            pageTitle: true,
            metaDescription: true,
            keywords: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      //   include: { gambar: true },
    })

    return artikel
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getArtikelByIdService = async (identifier) => {
  const whereCondition = getWhereIdentifier(identifier)
  try {
    const artikel = await prisma.artikel.findUnique({
      where: whereCondition,
      include: {
        seo: {
          select: {
            id: true,
            pageTitle: true,
            metaDescription: true,
            keywords: true,
          },
        },
      },
    })
    return artikel
  } catch (error) {
    throw new Error(error.message)
  }
}

export const createArtikelService = async ({
  title,
  content,
  category,
  tags,
  thumbnail,
  author,
  slug,
  seoId,
}) => {
  // const extractsGambar = extractGambar(gambar)
  try {
    const artikel = await prisma.artikel.create({
      data: {
        title,
        content,
        slug,
        author,
        tags,
        seoId,
        category,
        thumbnail: thumbnail[0] || thumbnail,
        // gambar: {
        //    create: extractsGambar,
        // },
      },
      include: { seo: true },
    })
    return artikel
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updateArtikelService = async ({
  title,
  slug,
  content,
  category,
  identifier,
  thumbnail,
  // gambarPath,
  author,
}) => {
  // const extractsGambar = extractGambar(gambarPath)
  const whereCondition = getWhereIdentifier(identifier)

  if (Array.isArray(thumbnail)) {
    thumbnail = thumbnail[0]
  } else {
    thumbnail = thumbnail
  }

  try {
    const artikel = await prisma.artikel.update({
      where: whereCondition,
      data: {
        title,
        content,
        slug,
        category,
        thumbnail: thumbnail,
        author,
        // gambar: {
        //   deleteMany: {},
        //   create: extractsGambar,
        // },
        updatedAt: new Date(),
      },
      // include: { seo: true },
    })
    return artikel
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deleteArtikelService = async (ids) => {
  try {
    const artikel = await prisma.artikel.deleteMany({
      where: { id: { in: ids } },
    })

    return artikel
  } catch (error) {
    throw new Error(error.message)
  }
}
