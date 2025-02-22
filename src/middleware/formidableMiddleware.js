import multer, { MulterError } from 'multer'
import path from 'path'
import fs from 'fs'
import prisma from '../config/database.js'
import { __dirname } from '../utils/handlerFormidable.js'

// File limits configuration
const FILE_LIMITS = {
  thumbnail: {
    maxSize: 10 * 1024 * 1024, // 10MB for thumbnail
    allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'],
  },
  gambar: {
    maxSize: 10 * 1024 * 1024, // 10MB for images
    allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'],
  },
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB for PDF documents
    allowedTypes: ['application/pdf'],
  },
}

const fileLimits = (fieldName) => FILE_LIMITS[fieldName] || null

// Storage configuration
const createStorage = () =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPaths = {
        thumbnail: path.join(process.cwd(), 'public/upload/image'),
        gambar: path.join(process.cwd(), 'public/upload/image'),
        document: path.join(process.cwd(), 'public/upload/document'),
      }

      const uploadPath = uploadPaths[file.fieldname]

      if (!uploadPath) {
        return cb(new Error('Invalid or improperly configured field.'))
      }

      cb(null, uploadPath)
    },

    filename: (req, file, cb) => {
      // Add timestamp to prevent filename conflicts
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      const ext = path.extname(file.originalname)
      cb(null, `${path.basename(file.originalname, ext)}-${uniqueSuffix}${ext}`)
    },
  })

// File filter with dynamic validation
const createFileFilter = () => (req, file, cb) => {
  const limits = fileLimits(file.fieldname)

  if (!limits) {
    return cb(
      new multer.MulterError(
        'LIMIT_UNEXPECTED_FILE',
        `Field ${file.fieldname} is not allowed.`
      ),
      false
    )
  }

  const { allowedTypes, maxSize } = limits

  if (!allowedTypes.includes(file.mimetype)) {
    const allowedFilesText = allowedTypes
      .map((type) => type.split('/')[1])
      .join(', ')
    return cb(
      new multer.MulterError(
        'LIMIT_UNSUPPORTED_FILETYPE',
        `Invalid file type. Only ${allowedFilesText} files are allowed.`
      ),
      false
    )
  }

  if (parseInt(req.headers['content-length']) > maxSize) {
    return cb(
      new multer.MulterError(
        'LIMIT_FILE_SIZE',
        `File size for ${file.fieldname} exceeds the limit of ${
          maxSize / 1024 / 1024
        }MB.`
      ),
      false
    )
  }

  cb(null, true)
}

// Upload middleware
export const middlewareUpload = (req, res, next) => {
  const upload = multer({
    storage: createStorage(),
    fileFilter: createFileFilter(),
    limits: {
      fileSize: Math.max(
        ...Object.values(FILE_LIMITS).map((limit) => limit.maxSize)
      ),
    },
  })

  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gambar', maxCount: 6 },
    { name: 'document', maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'File processing error',
        // code: err.code || 'UNKNOWN_ERROR',
      })
    }
    next()
  })
}

// Multer error handler middleware
export const errorHandlerMulter = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const errorMessages = {
      LIMIT_FILE_SIZE: 'File size exceeds the limit allowed.',
      LIMIT_FILE_COUNT: 'Too many files uploaded. Check the file count limit.',
      LIMIT_UNSUPPORTED_FILETYPE: 'Type of file is not allowed.',
      LIMIT_UNEXPECTED_FILE:
        'Uploaded file field does not match the expected field.',
    }

    return res.status(400).json({
      success: false,
      message:
        errorMessages[err.code] || 'File processing error. Please try again.',
      code: err.code,
    })
  } else if (err) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${err.message}`,
      code: 'SERVER_ERROR',
    })
  }

  next()
}

export const removeOldFilesMiddleware = (modelName, fileFields) => {
  return async (req, res, next) => {
    try {
      const { identifier } = req.params
      const isNumericId = !isNaN(Number(identifier))

      const whereClause = isNumericId
        ? { id: Number(identifier) }
        : { slug: identifier }

      const modelData = await prisma[modelName].findFirst({
        where: whereClause,
        select: fileFields.reduce((fields, field) => {
          fields[field] = true
          return fields
        }, {}),
      })

      if (modelData) {
        await Promise.all(
          fileFields.map(async (field) => {
            const files = modelData[field]
            if (files) {
              await removeFiles(files)
            }
          })
        )
      }

      next()
    } catch (error) {
      console.error('Gagal menghapus file lama:', error)
      res
        .status(500)
        .json({ message: 'Terjadi kesalahan saat menghapus file lama' })
    }
  }
}

async function removeFiles(files) {
  const filesToRemove = Array.isArray(files) ? files : [files]

  await Promise.all(
    filesToRemove.map(async (file) => {
      const filePath = path.join(process.cwd(), 'public', file)
      try {
        await fs.promises.access(filePath, fs.constants.F_OK)
        await fs.promises.unlink(filePath)
      } catch (error) {
        if (error.code !== 'ENOENT') {
          console.error(`Gagal menghapus file: ${filePath}`, error)
        }
      }
    })
  )
}
