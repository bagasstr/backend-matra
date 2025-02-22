import prisma from '../../config/database'

export const getPromoService = async () => {
   return await prisma.promo.findMany({
      include: {
         produk: true,
         promoType: true,
      },
   })
}

export const getPromoByIdService = async (id) => {
   return await prisma.promo.findUnique({
      where: {
         id: Number(id),
      },
      include: {
         produk: true,
         promoType: true,
      },
   })
}

export const createPromoService = async (data) => {
   return await prisma.promo.create({
      data,
   })
}

export const deletePromoService = async (id) => {
   return await prisma.promo.delete({
      where: {
         id: Number(id),
      },
   })
}
