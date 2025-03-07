import express from 'express'
import {
  createArtikelController,
  deleteArtikelController,
  getArtikelByIdController,
  getArtikelController,
  updateArtikelController,
} from './artikel.controller.js'
import {
  errorHandlerMulter,
  middlewareUpload,
  removeOldFilesMiddleware,
} from '../../middleware/formidableMiddleware.js'

const router = express.Router()

router.get('/', getArtikelController)

router.get('/:identifier', getArtikelByIdController)

router.post('/', middlewareUpload, errorHandlerMulter, createArtikelController)

router.patch(
  '/:identifier',
  // removeOldFilesMiddleware('artikel', ['thumbnail']),
  middlewareUpload,
  errorHandlerMulter,
  updateArtikelController
)

router.delete('/', deleteArtikelController)

export default router
