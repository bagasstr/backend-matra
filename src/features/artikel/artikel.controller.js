import slugify from 'slugify'
import prisma from '../../config/database.js'
import {
  createArtikelService,
  deleteArtikelService,
  getArtikelByIdService,
  getArtikelService,
  updateArtikelService,
} from './artikel.service.js'
import { deleteGambar, deleteThumbnail } from '../../utils/handlerFormidable.js'
import {
  validateCategory,
  validateReqBody,
  generateSeo,
  validCategories,
  getPagination,
  paginationRes,
  countPrisma,
  getWhereIdentifier,
} from '../../utils/helper.js'
import fs from 'fs'
import path from 'path'

export const getArtikelController = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req)
    const { category } = req.query
    const filter = {
      ...(category && { category }),
    }
    const artikel = await getArtikelService(filter, skip, limit)
    const totalArtikel = await countPrisma('artikel', filter)
    if (artikel.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: 'Artikel tidak ditemukan' })
    }
    return res.status(200).json(
      paginationRes({
        data: artikel,
        totalItem: totalArtikel,
        page,
        limit,
      })
    )
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getArtikelByIdController = async (req, res) => {
  try {
    const { identifier } = req.params
    const artikel = await getArtikelByIdService(identifier)
    if (!artikel) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' })
    }
    return res.status(200).json({ status: 'success', artikel })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const createArtikelController = async (req, res) => {
  try {
    const { title, content, category, refrensi } = req.body
    const { thumbnail } = req.files

    const validasiKategory = validateCategory(category, validCategories)
    const existsArtikel = await prisma.artikel.findMany({
      where: { title },
      select: {
        slug: true,
        thumbnail: true,
      },
    })
    if (!validasiKategory) {
      return res.status(400).json({ message: 'Category tidak valid' })
    }

    if (existsArtikel.slug) {
      return res.status(400).json({ message: 'Artikel sudah ada' })
    }

    if (!validateReqBody(req.body, ['title', 'content'])) {
      return res.status(400).json({ message: 'Data tidak lengkap' })
    }
    // const processedTags =
    //   typeof tags === 'string' ? tags.split(',').map((tag) => tag.trim()) : tags

    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    })
    existsArtikel.forEach((i) => {
      if (i.slug === slug) {
        throw new Error(`Artikel "${title}" sudah ada`)
      }
    })
    const seoData = generateSeo(title, content, thumbnail)

    const seoArtikel = await prisma.seo.create({
      data: {
        type: 'artikel',
        pageTitle: seoData.metaTitle,
        metaDescription: seoData.metaDescription,
        keywords: seoData.keywords,
        image: seoData.thumb[0],
      },
    })
    const authors = 'admin matra'

    const artikel = await createArtikelService({
      title,
      content,
      slug,
      author: authors,
      // tags: processedTags,
      refrensi,
      seoId: seoArtikel.id,
      category: validasiKategory,
      thumbnail: thumbnail
        ? thumbnail.map((path) => `upload/image/${path.filename}`)
        : null,
      // gambar: gambar
      //   ? gambar.map((path) => ({
      //       url: `upload/image/${path.filename}`,
      //     }))
      //   : null,
    })

    return res.status(200).json({ status: 'success', artikel })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateArtikelController = async (req, res) => {
  try {
    const { identifier } = req.params
    const { title, content } = req.body
    const { thumbnail } = req.files
    const whereCondition = getWhereIdentifier(identifier)
    const __dirname = path.resolve()
    const existsArtikel = await prisma.artikel.findUnique({
      where: whereCondition,
      select: {
        slug: true,
        // gambar: true,
        thumbnail: true,
      },
    })

    let categories
    let tag
    if (existsArtikel) {
      categories = existsArtikel.category
      tag = existsArtikel.tags
    }
    // const validasiKategory = validateCategory(categories, validCategories)
    const slugi = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    })

    const author = 'admin matra'

    let thumb = []
    if (
      thumbnail &&
      thumbnail.length > 0 &&
      thumbnail !== undefined &&
      thumbnail !== 'undefined'
    ) {
      const imagePath = path.join(__dirname, 'public/', existsArtikel.thumbnail)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
      for (const i of thumbnail) {
        thumb = `upload/image/${i.filename}`
      }
    } else {
      thumb = existsArtikel?.thumbnail
    }

    if (!existsArtikel) {
      return res.status(404).json({ message: `Artikel tidak ada` })
    }
    const artikel = await updateArtikelService({
      title,
      identifier,
      slug: slugi,
      author,
      tags: tag,
      category: categories,
      thumbnail: thumb,
      content,
      // gambarPath: gambar.map((path) => ({
      //   url: `upload/image/${path.filename}`,
      // })),
    })

    return res.status(200).json({ status: 'success', artikel })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteArtikelController = async (req, res) => {
  try {
    const { ids } = req.body

    const artikel = await prisma.artikel.findMany({
      where: { id: { in: ids } },
    })

    if (!artikel) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' })
    }

    if (artikel.length > 0) {
      deleteThumbnail(artikel)
    }

    await deleteArtikelService(ids)

    return res.status(200).json({
      status: 'success',
      message: 'Artikel berhasil di hapus',
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
