import prisma from '../../config/database.js'
import { deleteGambar } from '../../utils/handlerFormidable.js'
import { extractGambar, getWhereIdentifier } from '../../utils/helper.js'

export const getPortfolioService = async (filter, skip, limit) => {
  try {
    return await prisma.portfolioProyek.findMany({
      where: filter,
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        mitraKlien: true,
        ringkasan: true,
        mulaiPelaksanaan: true,
        selesaiPelaksanaan: true,
        tipeBangunan: true,
        tanggalPelaksanaan: true,
        lokasi: true,
        thumbnail: true,
        gambarProyek: true,
        createdAt: true,
      },

      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getPortfolioByIdService = async (identifier) => {
  const whereCondition = getWhereIdentifier(identifier)

  try {
    const portfolioProyek = await prisma.portfolioProyek.findUnique({
      where: whereCondition,
    })
    return portfolioProyek
  } catch (error) {
    throw new Error(error.message)
  }
}

export const createPortfolioService = async ({
  title,
  mitraKlien,
  ringkasan,
  tanggalPelaksanaan,
  lokasi,
  mulaiPelaksanaan,
  selesaiPelaksanaan,
  tipeBangunan,
  thumbnail,
  gambar,
  slug,
}) => {
  const extractsGambar = extractGambar(gambar)

  try {
    const portfolio = await prisma.portfolioProyek.create({
      data: {
        title,
        mitraKlien,
        ringkasan,
        slug,
        tanggalPelaksanaan,
        lokasi,
        mulaiPelaksanaan,
        selesaiPelaksanaan,
        tipeBangunan,
        thumbnail: thumbnail[0],
        gambarProyek:
          gambar.length > 0 ? { create: extractsGambar } : undefined,
      },
      include: { gambarProyek: true },
    })
    return portfolio
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updatePortfolioService = async ({
  identifier,
  slug,
  title,
  mitraKlien,
  ringkasan,
  tipeBangunan,
  mulaiPelaksanaan,
  selesaiPelaksanaan,
  tanggalPelaksanaan,
  lokasi,
  thumbnail,
}) => {
  const whereCondition = getWhereIdentifier(identifier)

  try {
    return await prisma.portfolioProyek.update({
      where: whereCondition,
      data: {
        title,
        mitraKlien,
        ringkasan,
        slug,
        mulaiPelaksanaan,
        selesaiPelaksanaan,
        tanggalPelaksanaan,
        lokasi,
        tipeBangunan,
        thumbnail: thumbnail,
      },
      include: { gambarProyek: true },
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deletePortfolioService = async (identifier) => {
  const whereCondition = getWhereIdentifier(identifier)

  try {
    const portfolio = await prisma.portfolioProyek.delete({
      where: whereCondition,
    })
    return portfolio
  } catch (error) {
    throw new Error(error.message)
  }
}
