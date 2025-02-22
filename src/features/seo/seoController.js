import slugify from 'slugify'
import {
  createSeoService,
  getSeoByIdService,
  getSeoService,
  updateSeoService,
} from './seoService.js'
import prisma from '../../config/database.js'

export const getSeoController = async (req, res) => {
  try {
    const { type } = req.query

    if (type) {
      const seo = await getSeoService(type)
      return res.status(200).json({ status: 'success', seo })
    } else {
      const seo = await getSeoService()
      return res.status(200).json({ status: 'success', seo })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getSeoByIdController = async (req, res) => {
  try {
    const { id } = req.params

    const seo = await getSeoByIdService(id)
    return res.status(200).json({ status: 'success', seo })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const createSeoController = async (req, res) => {
  try {
    const { title, description, keywords } = req.body

    const type = 'halaman'

    const seo = await createSeoService(title, description, keywords, type)
    return res.status(200).json({ status: 'success', seo })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateSeoController = async (req, res) => {
  try {
    const id = req.params.id
    const { title, description, keywords } = req.body

    const seo = await updateSeoService(id, title, description, keywords)
    return res.status(200).json({ status: 'success', seo })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
