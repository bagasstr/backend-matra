import slugify from 'slugify'
import { deleteGambar, deleteThumbnail } from '../../utils/handlerFormidable.js'
import {
   countPrisma,
   getPagination,
   paginationRes,
} from '../../utils/helper.js'
import {
   createProductService,
   deleteProductService,
   getProductByIdService,
   getProductService,
   updateProductService,
} from './materialService.js'

export const getProductController = async (req, res) => {
   const { page, limit, skip } = getPagination(req)
   try {
      const produk = await getProductService(limit, skip)
      const totalProduct = await countPrisma('produkMaterial')
      if (produk.length <= 0) {
         return res.status(404).json({ message: 'Tidak ada produk' })
      }
      return res.status(200).json(
         paginationRes({
            data: produk,
            totalItem: totalProduct,
            page,
            limit,
         })
      )
   } catch (error) {
      return res.status(500).json({ message: error.message })
   }
}

export const getProductByController = async (req, res) => {
   try {
      const { identifier } = req.params
      const product = await getProductByIdService(identifier)
      if (product <= 0) {
         return res.status(404).json({ message: 'Produk tidak ditemukan' })
      }
      return res.status(200).json({ status: 'success', product })
   } catch (error) {
      return res.status(500).json({ message: error.message })
   }
}

export const createProductController = async (req, res) => {
   try {
      const {
         namaBarang,
         deskripsi,
         satuan,
         dimensiUnit,
         merek,
         kategori,
         subKategori,
         jenisPengiriman,
         pasokanArea,
      } = req.body

      const estimasiPengiriman = [
         {
            area: 'Jabodetabek',
            durasi: '2-4 Hari',
         },
         {
            area: 'Luar Jabodetabek',
            durasi: '2-7 Hari',
         },
      ]

      const hargaBarang = Number(req.body.hargaBarang)
      const minimalPembelian = Number(req.body.minimalPembelian)
      const berat = Number(req.body.berat)
      const jumlahUnit = Number(req.body.jumlahUnit)
      const kelipatanPembelian = Number(req.body.kelipatanPembelian)
      const { thumbnail, gambar } = req.files

      const parsedProduk = JSON.parse(pasokanArea)
      const slug = slugify(namaBarang, {
         lower: true,
         trim: true,
         strict: true,
      })

      await createProductService({
         namaBarang,
         slug,
         deskripsi,
         hargaBarang,
         satuan,
         minimalPembelian,
         kelipatanPembelian,
         dimensiUnit,
         berat,
         merek,
         kategori,
         subKategori,
         jumlahUnit,
         estimasiPengiriman,
         jenisPengiriman,
         thumbnail: thumbnail.map((path) => `upload/image/${path.filename}`),
         gambar: gambar.map((path) => ({
            url: `upload/image/${path.filename}`,
         })),
         pasokanArea: parsedProduk,
      })
      return res
         .status(200)
         .json({ status: 'success', message: 'Berhasil menambahkan produk' })
   } catch (error) {
      return res.status(500).json({ message: error.message })
   }
}

export const updateProductController = async (req, res) => {
   try {
      const { identifier } = req.params
      const {
         namaBarang,
         deskripsi,
         hargaBarang,
         satuan,
         minimalPembelian,
         kelipatanPembelian,
         dimensiUnit,
         berat,
         merek,
         kategori,
         subKategori,
         jumlahUnit,
         estimasiPengiriman,
         jenisPengiriman,
         pasokanArea,
      } = req.body
      const { thumbnail, gambar } = req.files
      const slug = slugify(namaBarang, {
         lower: true,
         trim: true,
         strict: true,
      })
      const existsProduct = await getProductByIdService(identifier)
      if (!existsProduct) {
         return res.status(404).json({ message: 'Produk tidak ditemukan' })
      }
      await updateProductService({
         identifier,
         namaBarang,
         slug,
         deskripsi,
         hargaBarang,
         satuan,
         minimalPembelian,
         kelipatanPembelian,
         dimensiUnit,
         berat,
         merek,
         kategori,
         subKategori,
         jumlahUnit,
         estimasiPengiriman,
         jenisPengiriman,
         pasokanArea,
         thumbnail: thumbnail
            ? thumbnail.map((path) => `upload/image/${path.filename}`)
            : null,
         gambar: gambar.map((path) => ({
            url: `upload/image/${path.filename}`,
         })),
      })
      return res
         .status(200)
         .json({ status: 'success', message: 'Update produk berhasil' })
   } catch (error) {
      return res.status(500).json({ message: error.message })
   }
}

export const deleteProductController = async (req, res) => {
   try {
      const { identifier } = req.params

      const existsProduct = await getProductByIdService(identifier)
      if (!existsProduct) {
         return res.status(404).json({ message: 'Produk tidak ditemukan' })
      }

      if (existsProduct.thumbnail) {
         deleteThumbnail(existsProduct.thumbnail)
      }
      if (existsProduct.gambar) {
         deleteGambar(existsProduct.gambar)
      }

      await deleteProductService(identifier)

      return res
         .status(200)
         .json({ status: 'success', message: 'Produk berhasil di hapus' })
   } catch (error) {
      return res.status(500).json({ message: error.message })
   }
}
