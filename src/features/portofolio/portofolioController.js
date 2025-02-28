import { validationResult } from 'express-validator'
import {
  getPortfolioService,
  getPortfolioByIdService,
  createPortfolioService,
  updatePortfolioService,
  deletePortfolioService,
} from './portofolioService.js'
import slugify from 'slugify'
import { deleteGambar, deleteThumbnail } from '../../utils/handlerFormidable.js'
import { getPagination, paginationRes } from '../../utils/helper.js'
import prisma from '../../config/database.js'
import fs from 'fs'
import path from 'path'

export const getPortofolioController = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req)
    const { category, search } = req.query
    const filter = {
      ...(category && { tipeBangunan: category }),
      ...(search && {
        OR: [
          { title: { contains: search } },
          { mitraKlien: { contains: search } },
          { lokasi: { contains: search } },
        ],
      }),
    }
    const portofolio = await getPortfolioService(filter, skip, limit)
    if (!portofolio || portofolio.length === 0)
      return res.status(404).json({
        status: false,
        message: 'Tidak ada portofolio',
      })
    const totalPortfolio = await prisma.portfolioProyek.count({
      where: filter,
    })
    return res.status(200).json(
      paginationRes({
        data: portofolio,
        totalItem: totalPortfolio,
        page,
        limit,
      })
    )
  } catch (error) {
    return res.status(500).json({ status: 'failed', message: error.message })
  }
}

export const getPortofolioByIdController = async (req, res) => {
  try {
    const { identifier } = req.params
    const data = await getPortfolioByIdService(identifier)
    if (!data)
      return res.status(404).json({ message: 'Portofolio tidak ditemukan' })
    return res.status(200).json({ status: 'success', data })
  } catch (error) {
    return res.status(500).json({ status: 'failed', message: error.message })
  }
}

export const createPortofolioController = async (req, res) => {
  try {
    const {
      title,
      mitraKlien,
      ringkasan,
      lokasi,
      tipeBangunan,
      mulaiPelaksanaan,
      selesaiPelaksanaan,
    } = req.body
    const { gambar, thumbnail } = req.files

    const category = (text) => {
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z0-9 -]/g, '')
        .replace(/\s+/g, '-')
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    })
    if (!title) {
      return res.status(400).json({ message: 'Silahkan isi title' })
    }

    const tanggalPelaksanaan = `${mulaiPelaksanaan} - ${selesaiPelaksanaan}`

    const portofolio = await createPortfolioService({
      title,
      mitraKlien,
      ringkasan,
      mulaiPelaksanaan,
      selesaiPelaksanaan,
      tanggalPelaksanaan,
      lokasi,
      tipeBangunan: category(tipeBangunan),
      thumbnail: thumbnail
        ? thumbnail.map((path) => `upload/image/${path.filename}`)
        : null,
      gambar: gambar
        ? gambar.map((path) => ({
            url: `upload/image/${path.filename}`,
          }))
        : null,
      slug,
    })
    return res.status(200).json({ status: 'success', portofolio })
  } catch (error) {
    return res.status(500).json({ status: 'failed', message: error.message })
  }
}

export const updatePortfolioController = async (req, res) => {
  try {
    const { identifier } = req.params
    const {
      title,
      mitraKlien,
      ringkasan,
      lokasi,
      tipeBangunan,
      mulaiPelaksanaan,
      selesaiPelaksanaan,
      removeImage,
    } = req.body
    const { gambar, thumbnail } = req.files
    const imagesToDelete = JSON.parse(removeImage)
    const __dirname = path.resolve()
    const existPortf = await getPortfolioByIdService(identifier)
    if (!existPortf) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'portofolio tidak ada' })
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    })

    let thumb = []
    if (
      thumbnail &&
      thumbnail.length > 0 &&
      thumbnail !== undefined &&
      thumbnail !== 'undefined'
    ) {
      for (const image of thumbnail) {
        const imagePath = path.join(__dirname, 'public/', image.filename)
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath)
        }
        thumb = `upload/image/${image.filename}`
      }
    } else {
      thumb = existPortf?.thumbnail
    }
    if (imagesToDelete.length > 0) {
      const imageToRemove = await prisma.gambarProyek.findMany({
        where: {
          id: {
            in: imagesToDelete.map(Number),
          },
        },
      })

      for (const image of imageToRemove) {
        const imagePath = path.join(__dirname, 'public/', image.url)

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath)
        }
      }

      await prisma.gambarProyek.deleteMany({
        where: {
          id: {
            in: imagesToDelete.map(Number),
          },
        },
      })
    }

    let newImage = []
    if (gambar && gambar.length > 0) {
      for (const image of gambar) {
        const imageUrl = `/upload/image/${image.filename}`
        const newImages = await prisma.gambarProyek.create({
          data: {
            url: imageUrl,
            portfolioProyekId: Number(identifier),
          },
        })
        newImage.push(newImages)
      }
    }
    const tanggalPelaksanaan = `${mulaiPelaksanaan} - ${selesaiPelaksanaan}`

    const updatePorto = await updatePortfolioService({
      identifier,
      title,
      slug,
      mitraKlien,
      ringkasan,
      thumbnail: thumb,
      mulaiPelaksanaan,
      tanggalPelaksanaan,
      selesaiPelaksanaan,
      tipeBangunan,
      lokasi,
    })

    return res.status(200).json({ status: 'success', data: updatePorto })
  } catch (error) {
    res.status(500).json({
      message: 'Error updating product',
      error: error.message,
    })
  }
}

export const deletePortofoliocontroller = async (req, res) => {
  try {
    const { identifier } = req.params

    const existPortf = await getPortfolioByIdService(identifier)
    if (!existPortf) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'portofolio tidak ada' })
    }

    if (existPortf.gambarProyek) {
      deleteGambar(existPortf.gambarProyek)
    }
    if (existPortf.thumbnail) {
      deleteThumbnail(existPortf.thumbnail)
    }

    await deletePortfolioService(identifier)
    return res
      .status(200)
      .json({ status: 'success', message: 'portofolio berhasil di hapus' })
  } catch (error) {
    return res.status(500).json({ status: 'failed', message: error.message })
  }
}
