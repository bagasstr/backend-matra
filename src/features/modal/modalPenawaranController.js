import { sendEmailModal } from '../../utils/nodemailerTransport.js'

export const createModalPenawaranController = async (req, res) => {
   try {
      const { name, institution, whatsapp, email } = req.body
      const data = {
         name,
         institution,
         whatsapp,
         email,
      }

      sendEmailModal(`[Notifikasi]: ${name} meminta penawaran`, data)
      return res.status(200).json({
         status: 'success',
      })
   } catch (error) {
      return res.status(500).json({ message: error.message })
   }
}
