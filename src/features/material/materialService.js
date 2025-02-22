import prisma from '../../config/database.js'
import {
   extractGambar,
   getWhereIdentifier,
   pasokanAreas,
} from '../../utils/helper.js'

export const getProductService = async (limit, skip) => {
   try {
      const produk = await prisma.produkMaterial.findMany({
         skip,
         take: limit,
         select: {
            id: true,
            namaBarang: true,
            thumbnail: true,
            slug: true,
            deskripsi: true,
            hargaBarang: true,
            satuan: true,
            minimalPembelian: true,
            kelipatanPembelian: true,
            dimensiUnit: true,
            berat: true,
            merek: true,
            kategori: true,
            subKategori: true,
            jumlahUnit: true,
            estimasiPengiriman: {
               select: {
                  area: true,
                  durasi: true,
               },
            },
            jenisPengiriman: true,
            gambar: {
               select: {
                  url: true,
               },
            },
            pasokanArea: {
               select: {
                  kota: true,
               },
            },
         },
         orderBy: {
            createdAt: 'desc',
         },
      })
      return produk
   } catch (error) {
      throw new Error(error.message)
   }
}

export const getProductByIdService = async (identifier) => {
   const whereCondition = getWhereIdentifier(identifier)
   try {
      const produk = await prisma.produkMaterial.findUnique({
         where: whereCondition,
         include: {
            gambar: true,
            pasokanArea: true,
         },
      })
      return produk
   } catch (error) {
      throw new Error(error.message)
   }
}

export const createProductService = async ({
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
   thumbnail,
   gambar,
   pasokanArea,
}) => {
   try {
      const extractsGambar = extractGambar(gambar)

      const extractPasokan = pasokanAreas(pasokanArea)
      const produk = await prisma.produkMaterial.create({
         data: {
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
            thumbnail: thumbnail[0],
            estimasiPengiriman: {
               create: estimasiPengiriman,
            },
            jenisPengiriman,
            pasokanArea: {
               create: extractPasokan,
            },
            gambar: {
               create: extractsGambar,
            },
         },
      })
      return produk
   } catch (error) {
      throw new Error(error.message)
   }
}

export const updateProductService = async (
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
   thumbnail,
   gambar,
   pasokanArea
) => {
   const whereCondition = getWhereIdentifier(identifier)
   const extractsGambar = extractGambar(gambar)
   try {
      const produk = await prisma.produkMaterial.update({
         where: whereCondition,
         data: {
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
            thumbnail: thumbnail[0],
            pasokanArea: {
               create: pasokanAreas(pasokanArea),
            },
            gambar: {
               create: extractsGambar,
            },
         },
      })
      return produk
   } catch (error) {
      throw new Error(error.message)
   }
}

export const deleteProductService = async (identifier) => {
   const whereCondition = getWhereIdentifier(identifier)
   try {
      const produk = await prisma.produkMaterial.delete({
         where: whereCondition,
      })
      return produk
   } catch (error) {
      throw new Error(error.message)
   }
}
