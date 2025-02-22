import { sendEmailModal } from '../../utils/nodemailerTransport.js'

export const createModalComproController = async (req, res) => {
   try {
      const { name, institution, whatsapp, email } = req.body
      const data = {
         name,
         institution,
         whatsapp,
         email,
      }
      sendEmailModal(`[Notifikasi]: ${name} meminta file compro`, data)
      return res.status(200).json({
         status: 'success',
      })
   } catch (error) {
      return res.status(500).json({ message: error.message })
   }
}
