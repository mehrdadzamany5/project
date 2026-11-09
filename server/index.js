import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'node:path'
import fs from 'node:fs'
import { initDb, pool } from './db.js'
import { loadSession } from './auth.js'
import { UPLOAD_DIR } from './upload.js'
import authRoutes from './routes/auth.js'
import folderRoutes from './routes/folders.js'
import projectRoutes from './routes/projects.js'
import userRoutes from './routes/users.js'
import activityRoutes from './routes/activity.js'
import settingsRoutes from './routes/settings.js'
import uploadRoutes from './routes/uploads.js'

const app = express()
const PORT = Number(process.env.PORT) || 8000

app.disable('x-powered-by')
app.use(express.json({ limit: '2mb' }))
app.use(cookieParser())
app.use(loadSession)

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true, db: true })
  } catch (error) {
    res.status(503).json({ ok: false, db: false, error: error.message })
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/folders', folderRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/users', userRoutes)
app.use('/api/activity', activityRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/uploads', uploadRoutes)

app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '1h', fallthrough: true }))

// Production build (optional): serve the compiled SPA from the API process.
const distDir = path.resolve('dist')
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get(/^\/(?!api|uploads).*/, (_req, res) => res.sendFile(path.join(distDir, 'index.html')))
}

app.use('/api', (_req, res) => res.status(404).json({ error: 'مسیر یافت نشد.' }))

// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  if (error?.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'حجم فایل بیش از حد مجاز (۸۰ مگابایت) است.' })
  }
  console.error(error)
  return res.status(500).json({ error: error?.message || 'خطای سرور' })
})

async function start() {
  await initDb()
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GALLERY API listening on ${PORT}`)
  })
}

start().catch((error) => {
  console.error('Failed to start API', error)
  process.exit(1)
})
