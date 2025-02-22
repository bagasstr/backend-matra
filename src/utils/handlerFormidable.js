import fs from 'fs'
import path from 'path'

export const __dirname = path.resolve()

export const deleteGambar = (image) => {
  try {
    const delGambar = image.map((file) => file.url)
    for (const i in delGambar) {
      fs.unlinkSync(path.join(__dirname, 'public/', delGambar[i]))
    }
  } catch (error) {
    console.error('Gagal menghapus file gambar:', error)
  }
}

export const deleteThumbnail = (thumb) => {
  thumb.forEach((i) => {
    try {
      if (fs.existsSync(path.join(__dirname, 'public/', i.thumbnail))) {
        fs.unlinkSync(path.join(__dirname, 'public/', i.thumbnail))
      }
    } catch (error) {
      console.error('Gagal menghapus file thumbnail:', error)
    }
  })
}

export const deleteDocument = (document) => {
  try {
    fs.unlinkSync(path.join(__dirname, 'public/', document))
  } catch (error) {
    console.error('Gagal menghapus file:', error)
  }
}

export const deleteFile = (filePath) => {
  try {
    const fullPath = path.join(__dirname, 'public', filePath)
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath)
    }
  } catch (error) {
    console.error(`Gagal menghapus file ${filePath}:`, error.message)
  }
}
