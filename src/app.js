import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import { createRequire } from 'module'

import authRoute from './features/auth/authRoute.js'
import artikelRoute from './features/artikel/artikel.route.js'
import userRoute from './features/user/userRoute.js'
import portofolioRoute from './features/portofolio/portofolioRoute.js'
import vendorRoute from './features/vendor/vendorRoute.js'
import modalRoute from './features/modal/modalRoute.js'
import seoRoute from './features/seo/seoRoute.js'
import materialRoute from './features/material/materialRoute.js'
import testiRoute from './features/testimoni/testiRoute.js'
import swaggerDocs from './utils/swaggerDocs.js'

const require = createRequire(import.meta.url)
const swaggerDoc = require('../swagger.json')

// Konfigurasi dotenv
dotenv.config()

const app = express()

// Konfigurasi CORS
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5100/api-docs/',
    'https://matrakosala.com',
    'https://staging.matrakosala.com',
    'https://63a7-111-94-111-154.ngrok-free.app',
  ], // Sesuaikan dengan domain frontend
  credentials: true, // Izinkan cookie jika perlu
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions))
// const corsOptions = {
//   origin: (origin, callback) => callback(null, true),
//   credentials: true,
//   methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }
// app.use(cors(corsOptions))

// Middleware Global
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// Konfigurasi Static File
const __dirname = path.resolve()
app.use('/upload', express.static(path.join(__dirname, 'public', 'upload')))

// Dokumentasi API
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, swaggerDocs.swaggerUiOptions)
)

// Routing
app.use('/auth', authRoute)
app.use('/', userRoute)
app.use('/api/artikel', artikelRoute)
app.use('/api/vendor', vendorRoute)
app.use('/api/modal', modalRoute)
app.use('/api/seo', seoRoute)
app.use('/api/portfolio', portofolioRoute)
app.use('/api/produk', materialRoute)
app.use('/api/testimoni', testiRoute)

export default app
