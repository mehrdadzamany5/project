import path from 'node:path'
import fs from 'node:fs'
import crypto from 'node:crypto'
import multer from 'multer'

export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.resolve('uploads')
fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).slice(0, 12).replace(/[^.a-zA-Z0-9]/g, '')
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`)
  },
})

const ALLOWED = /^(image\/|video\/|audio\/|application\/pdf|application\/zip|application\/x-zip-compressed|text\/|application\/octet-stream)/

export const upload = multer({
  storage,
  limits: { fileSize: 80 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED.test(file.mimetype || '')) return cb(null, true)
    return cb(new Error('این نوع فایل مجاز نیست.'))
  },
})
