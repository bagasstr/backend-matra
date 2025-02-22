import prisma from '../../config/database.js';

export const getUserService = async () => {
   try {
      const user = await prisma.user.findMany({
         select: {
            username: true,
         },
      });
      return user;
   } catch (error) {
      throw new Error(error.message);
   }
};
