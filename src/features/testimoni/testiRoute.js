import express from 'express'
import {
  createTestimoniController,
  deleteTestimoniController,
  getTestimoniByIdController,
  getTestimoniController,
  updateTestimoniController,
} from './testiController.js'
import {
  errorHandlerMulter,
  middlewareUpload,
} from '../../middleware/formidableMiddleware.js'

const router = express.Router()

router.get('/', getTestimoniController)
router.get('/:identifier', getTestimoniByIdController)
router.post(
  '/',
  middlewareUpload,
  errorHandlerMulter,
  createTestimoniController
)
router.put(
  '/:identifier',
  middlewareUpload,
  errorHandlerMulter,
  updateTestimoniController
)
router.delete('/:identifier', deleteTestimoniController)

export default router
