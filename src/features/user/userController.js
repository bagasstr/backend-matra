import { getUserService } from './userService.js';

export const getUserController = async (req, res) => {
   try {
      const users = await getUserService();
      if (!users) {
         return res
            .status(404)
            .json({ status: 'failed', message: 'User tidak ditemukan' });
      }
      return res
         .status(200)
         .json({ success: true, message: 'login berhasil', users });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};
