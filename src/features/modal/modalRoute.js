import express from 'express'
import { createModalPenawaranController } from './modalPenawaranController.js'
import { createModalComproController } from './modalComproController.js'

const router = express.Router()

router.post('/penawaran', createModalPenawaranController)
router.post('/compro', createModalComproController)

export default router
