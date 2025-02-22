import {
  createTestimoniService,
  deleteTestimoniService,
  getTestimoniByIdService,
  getTestimoniService,
  updateTestimoniService,
} from './testiService.js'
import fs from 'fs'
import path from 'path'
import { getPagination, paginationRes } from '../../utils/helper.js'
import prisma from '../../config/database.js'

export const getTestimoniController = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req)
    const existTesti = await getTestimoniService()
    if (!existTesti || existTesti.length === 0) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'testimoni tidak ada' })
    }
    const totalTestimoni = await prisma.testimoni.count()
    const testimoni = await getTestimoniService(skip, limit)

    return res.status(200).json(
      paginationRes({
        data: testimoni,
        totalItem: totalTestimoni,
        page,
        limit,
      })
    )
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getTestimoniByIdController = async (req, res) => {
  try {
    const { identifier } = req.params
    const existTesti = await getTestimoniByIdService(identifier)
    if (!existTesti || existTesti.length === 0) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'testimoni tidak ada' })
    }
    const testimoni = await getTestimoniService(identifier)
    return res.status(200).json({ status: 'success', testimoni })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const createTestimoniController = async (req, res) => {
  try {
    const { company, testi, title, author } = req.body
    const { thumbnail } = req.files

    if (!company || !testi || !thumbnail || !title || !author) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Silahkan isi semua field' })
    }
    const testimoni = await createTestimoniService({
      company,
      testi,
      title,
      author,
      thumbnail: thumbnail
        ? thumbnail.map((i) => `upload/image/${i.filename}`)
        : null,
    })
    return res.status(200).json({
      status: 'success',
      message: 'testimoni berhasil di tambahkan',
      testimoni,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateTestimoniController = async (req, res) => {
  try {
    const { identifier } = req.params
    const { company, testi, title, author } = req.body
    const { thumbnail } = req.files
    const existTesti = await getTestimoniByIdService(identifier)
    const __dirname = path.resolve()

    let thumb = []
    if (
      thumbnail &&
      thumbnail.length > 0 &&
      thumbnail !== undefined &&
      thumbnail !== 'undefined'
    ) {
      const imagePath = path.join(__dirname, 'public/', existTesti.image)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
      for (const i of thumbnail) {
        thumb = `upload/image/${i.filename}`
      }
    } else {
      thumb = existTesti?.thumbnail
    }

    const testimoni = await updateTestimoniService(identifier, {
      company,
      testi,
      thumbnail: thumb,
      title,
      author,
    })
    return res.status(200).json({
      status: 'success',
      message: 'testimoni berhasil di update',
      testimoni,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteTestimoniController = async (req, res) => {
  try {
    const { identifier } = req.params
    const testimoni = await deleteTestimoniService(identifier)
    return res
      .status(200)
      .json({ status: 'success', message: 'testimoni berhasil di hapus' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
