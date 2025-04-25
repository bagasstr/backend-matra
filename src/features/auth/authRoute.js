import { loginController, logoutController } from './authController.js'
import express from 'express'

const router = express.Router()

router.post('/login', loginController)
router.get('/logout', logoutController)

export default router
