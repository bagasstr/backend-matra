import dotenv from 'dotenv'

dotenv.config()
const env = process.env.NODE_ENV || 'development'
const config = {
  development: {
    app: {
      port: process.env.DEV_PORT || 5100,
      host: process.env.DEV_HOST || 'localhost',
    },
    logging: {
      level: 'info',
      enableConsole: true,
    },
  },
  stagging: {
    app: {
      port: process.env.PROD_PORT || 5000,
      host: process.env.PROD_HOST || '192.168.0.3',
    },
    logging: {
      level: 'info',
      enableConsole: true,
    },
  },
  production: {
    app: {
      port: process.env.PROD_PORT || 5000,
      host: process.env.PROD_HOST || 'https://api.matrakosala.com',
    },
    logging: {
      level: 'error',
      enableConsole: false,
    },
  },
}

export default config[env]
