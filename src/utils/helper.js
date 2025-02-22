import { ExpressValidator } from 'express-validator'
import prisma from '../config/database.js'
import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'

export const validateCategory = (category, validCategories) => {
  const validasiKategory = category?.trim().toLowerCase().replace(/ /g, '_')
  return validCategories.includes(validasiKategory) ? validasiKategory : null
}

export const validateReqBody = (body, requiredFields) => {
  return requiredFields.every((field) => body[field])
}

export const window = new JSDOM('').window
export const purify = DOMPurify(window)

export const generateSeo = (title, description, thumbnail) => {
  const metaTitle = title.length > 60 ? title.substring(0, 57) : title
  const metaDescription =
    description.length > 160
      ? purify.sanitize(description.substring(0, 157), {
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: {},
        })
      : purify.sanitize(description, {
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: {},
        })

  const thumb = thumbnail
    ? thumbnail.map((path) => `upload/image/${path.filename}`)
    : null
  const keywords = extractKeywords(description)
  return { metaTitle, metaDescription, keywords, thumb }
}
const extractKeywords = (description) => {
  const words = description.toLowerCase().match(/\b\w+\b/g)
  const wordFrequencies = {}

  words.forEach((word) => {
    if (!wordFrequencies[word]) wordFrequencies[word] = 0
    wordFrequencies[word]++
  })

  const sortedWords = Object.keys(wordFrequencies).sort(
    (a, b) => wordFrequencies[b] - wordFrequencies[a]
  )
  return sortedWords.slice(0, 10)
}

export const validCategories = [
  'matra_kosala',
  'seputar_konstruksi',
  'tips_dan_pedoman',
]

export const getPagination = (req) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 5
  const skip = (page - 1) * limit
  return { page, limit, skip }
}
export const paginationRes = ({ data, totalItem, page, limit }) => {
  const totalPage = Math.ceil(totalItem / limit)

  return {
    success: true,
    page,
    limit,
    totalPage,
    totalItem,
    data,
  }
}

export const extractGambar = (gambar) => {
  const extractGambar = gambar?.map((i) => ({ url: i.url }))
  return extractGambar
}

export const getWhereIdentifier = (identifier) => {
  const isNumId = !isNaN(Number(identifier))
  return isNumId ? { id: Number(identifier) } : { slug: identifier }
}

export const extractVarianVendor = (produk) => {
  const extractVarian = produk.varian?.map((varian) => ({
    namaVarian: varian?.namaVarian || null,
    spesifikasi: varian.spesifikVarian,
    hargaSatuan: varian.hargaSatuan,
    satuanProduk: varian.satuanProduk,
    hargaDiskon: varian.hargaDiskon || null,
    minPembelian: varian.minPembelian,
  }))
  return extractVarian
}

export const pasokanAreas = (p) => {
  const pasokan = p.map((item) => ({
    kota: item.kota,
  }))
  return pasokan
}

export const countPrisma = async (model, filter) => {
  const totalItem = await prisma[model].count({
    where: filter,
  })
  return totalItem
}

export const kategoriVendor = (namaProduk) => {
  let kategori = namaProduk.toLowerCase()
  if (
    kategori.includes('bata') ||
    kategori.includes('beton') ||
    kategori.includes('semen') ||
    kategori.includes('baja') ||
    kategori.includes('besi')
  ) {
    return 'Struktur'
  }

  // Arsitektur (Finishing & estetika)
  if (
    kategori.includes('keramik') ||
    kategori.includes('marmer') ||
    kategori.includes('granit') ||
    kategori.includes('cat') ||
    kategori.includes('plafon')
  ) {
    return 'Arsitektur'
  }

  // MEP (Mechanical, Electrical, Plumbing)
  if (
    kategori.includes('pipa') ||
    kategori.includes('pompa') ||
    kategori.includes('kabel') ||
    kategori.includes('lampu') ||
    kategori.includes('ac') ||
    kategori.includes('kipas')
  ) {
    return 'MEP'
  }

  // Material Alam (Bahan dari alam)
  if (
    kategori.includes('kayu') ||
    kategori.includes('bambu') ||
    kategori.includes('batu') ||
    kategori.includes('pasir') ||
    kategori.includes('tanah') ||
    kategori.includes('kapur')
  ) {
    return 'Material Alam'
  }

  return 'Lainnya'
}
