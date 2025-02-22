export const getPromoController = async (req, res) => {
   try {
      const promo = await getPromoService()
      return res.status(200).json({ status: 'success', promo })
   } catch (error) {
      return res.status(500).json({ message: error.message })
   }
}
export const getPromoByIdController = async (req, res) => {
   try {
      const id = req.params.id
      const promo = await getPromoByIdService(id)
      return res.status(200).json({ status: 'success', promo })
   } catch (error) {
      return res.status(500).json({ message: error.message })
   }
}
export const createPromoController = async (req, res) => {
   try {
      const { title, description, image } = req.body
      const promo = await createPromoService(title, description, image)
      return res.status(200).json({ status: 'success', promo })
   } catch (error) {
      return res.status(500).json({ message: error.message })
   }
}

export const updatePromoController = async (req, res) => {
   try {
      const id = req.params.id
      const { title, description, image } = req.body
      const promo = await updatePromoService(id, title, description, image)
      return res.status(200).json({ status: 'success', promo })
   } catch (error) {
      return res.status(500).json({ message: error.message })
   }
}

export const deletePromoController = async (req, res) => {
   try {
      const id = req.params.id
      const promo = await deletePromoService(id)
      return res.status(200).json({ status: 'success', promo })
   } catch (error) {
      return res.status(500).json({ message: error.message })
   }
}
