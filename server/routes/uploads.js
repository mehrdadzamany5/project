import { Router } from 'express'
import { pool } from '../db.js'
import { logActivity, requireAdmin, requireContributor } from '../auth.js'
import { upload } from '../upload.js'

const router = Router()

router.post('/', requireContributor, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'فایلی انتخاب نشده است.' })
  const url = `/uploads/${req.file.filename}`
  await logActivity(req.user, 'file_upload', `بارگذاری فایل «${req.file.originalname}»`)
  res.status(201).json({
    file: {
      url,
      originalName: req.file.originalname,
      mime: req.file.mimetype,
      size: req.file.size,
    },
  })
})

// Uploaded-file overview for the admin panel.
router.get('/library', requireAdmin, async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT f.id, f.url, f.original_name, f.mime, f.size, f.created_at,
            p.id AS project_id, p.title AS project_title, f.project_id IS NULL AS orphan
       FROM project_files f LEFT JOIN projects p ON p.id = f.project_id
      ORDER BY f.id DESC LIMIT 200`,
  )
  const { rows: thumbs } = await pool.query(
    `SELECT id, title, thumbnail_url, content_url FROM projects
      WHERE thumbnail_url IS NOT NULL OR content_url IS NOT NULL
      ORDER BY id DESC LIMIT 200`,
  )
  res.json({ files: rows, linked: thumbs })
})

router.delete('/library/:id', requireAdmin, async (req, res) => {
  const { rows } = await pool.query('DELETE FROM project_files WHERE id = $1 RETURNING original_name', [Number(req.params.id)])
  if (!rows.length) return res.status(404).json({ error: 'فایل پیدا نشد.' })
  await logActivity(req.user, 'file_delete', `حذف فایل «${rows[0].original_name}»`)
  res.json({ ok: true })
})

export default router
