import prisma from '../../config/database.js'
import { extractVarianVendor } from '../../utils/helper.js'

export const getVendorService = async () => {
  try {
    const vendor = await prisma.vendor.findMany({
      // skip,
      // take: limit,
      include: {
        produk: {
          include: {
            kategori: {
              include: {
                kategori: true,
              },
            },
          },
          include: {
            varian: true,
            pengiriman: true,
            pajak: true,
            pembayaran: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return vendor
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getVendorByIdService = async (id) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        produk: {
          include: {
            varian: true,
            pengiriman: true,
            pajak: true,
            pembayaran: true,
          },
        },
      },
    })
    return vendor
  } catch (error) {
    return new Error(error.message)
  }
}

export const createVendorService = async ({
  namaPerusahaan,
  pic,
  whatsapp,
  produk,
}) => {
  const extractVarian = extractVarianVendor(produk)

  try {
    const vendor = await prisma.vendor.create({
      data: {
        namaPerusahaan,
        pic,
        whatsapp,
        produk: {
          create: {
            namaProduk: produk.namaProduk,
            kategori: produk.kategori,
            document: produk.document,
            varian: {
              create: extractVarian,
            },
            pengiriman: {
              create: produk.pengiriman
                ? {
                    tipe: produk.pengiriman.tipePengiriman,
                    area: produk.pengiriman.lokasiPengiriman,
                    jadwal: produk.pengiriman.jadwalMuat,
                  }
                : null,
            },
            pajak: {
              create: produk.pajak
                ? {
                    jenisPajak: produk.pajak.tipePajak,
                  }
                : null,
            },
            pembayaran: {
              create: produk.pembayaran
                ? {
                    jenisPembayaran: produk.pembayaran.tipePembayaran,
                    tempo: produk.pembayaran.tempo,
                    lainnya: produk.pembayaran.lainnya,
                  }
                : null,
            },
          },
        },
      },

      include: {
        produk: {
          include: {
            varian: true,
            pengiriman: true,
            pajak: true,
            pembayaran: true,
          },
        },
      },
    })

    return vendor
  } catch (error) {
    return new Error(error.message)
  }
}

export const deleteVendorService = async (id) => {
  try {
    const vendor = await prisma.vendor.delete({
      where: {
        id: parseInt(id),
      },
    })
    return vendor
  } catch (error) {
    return new Error(error.message)
  }
}
