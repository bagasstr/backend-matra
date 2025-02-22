import express from 'express'
import {
  getPortofolioController,
  getPortofolioByIdController,
  createPortofolioController,
  updatePortfolioController,
  deletePortofoliocontroller,
} from './portofolioController.js'
import {
  errorHandlerMulter,
  middlewareUpload,
} from '../../middleware/formidableMiddleware.js'

const router = express.Router()

router.get('/', getPortofolioController)
router.get('/:identifier', getPortofolioByIdController)
router.post(
  '/',
  middlewareUpload,
  errorHandlerMulter,
  createPortofolioController
)
router.put(
  '/:identifier',
  middlewareUpload,
  errorHandlerMulter,
  updatePortfolioController
)
router.delete('/:identifier', deletePortofoliocontroller)

export default router
