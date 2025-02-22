import http from 'http'
import app from './src/app.js'
import dotenv from 'dotenv'
import config from './config.js'
dotenv.config()

const server = http.createServer(app)

server.listen(config.app.port, () => {
  console.log(`Server is running on ${config.app.host}:${config.app.port}`)
})
