import {
  getVendorService,
  createVendorService,
  deleteVendorService,
  getVendorByIdService,
} from './vendorService.js'
import prisma from '../../config/database.js'
import { deleteDocument } from '../../utils/handlerFormidable.js'

import { sendEmail } from '../../utils/nodemailerTransport.js'
import { kategoriVendor } from '../../utils/helper.js'

export const getVendorController = async (req, res) => {
  try {
    const vendor = await getVendorService()
    if (vendor.length === 0) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'Tidak ada data vendor' })
    }
    // const totalVendor = await prisma.vendor.count()
    return res.status(200).json({ data: vendor })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getVendorByIdController = async (req, res) => {
  try {
    const id = req.params.id
    const vendor = await getVendorByIdService(id)
    if (!vendor) {
      return res
        .status(404)
        .json({ status: 'success', message: 'Vendor tidak ditemukan' })
    }
    return res.status(200).json({ status: 'success', vendor })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const createVendorController = async (req, res) => {
  try {
    const { namaPerusahaan, pic, whatsapp, produk } = req.body
    const document = req.files

    let parsedProduk = Array.isArray(produk) ? produk : JSON.parse(produk)
    console.log(namaPerusahaan, pic, whatsapp, parsedProduk)

    const kategori = kategoriVendor(parsedProduk.namaProduk)
    parsedProduk.kategori = kategori
    let filename = null
    if (
      document &&
      Array.isArray(document.document) &&
      document.document.length > 0
    ) {
      filename = document.document[0]?.filename
    }
    parsedProduk.document = filename

    const vendor = await createVendorService({
      namaPerusahaan,
      pic,
      whatsapp,
      produk: parsedProduk,
    })
    sendEmail(`[Notifikasi]: vendor baru dari ${vendor.namaPerusahaan}`)

    return res.status(200).json({
      status: 'success',
      vendor,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteVendorController = async (req, res) => {
  try {
    const id = req.params.id
    const vendor = await prisma.vendor.findUnique({
      where: { id: Number(id) },
      include: {
        produk: true,
      },
    })
    const doc = vendor.produk.map((p) => p.document)
    if (vendor && doc) {
      deleteDocument(doc[0])
    }
    await deleteVendorService(id)
    return res
      .status(200)
      .json({ status: 'success', message: 'Vendor berhasil dihapus' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
