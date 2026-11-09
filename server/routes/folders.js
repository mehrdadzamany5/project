import { Router } from 'express'
import { pool } from '../db.js'
import { logActivity, requireAdmin, requireAuth } from '../auth.js'

const router = Router()

router.get('/', requireAuth, async (req, res) => {
  const publishedOnly = req.user.role === 'guest'
  const { rows } = await pool.query(
    `SELECT f.id, f.name, f.position,
            count(p.id) FILTER (WHERE $1::boolean IS FALSE OR p.is_published)::int AS project_count
       FROM folders f
       LEFT JOIN projects p ON p.folder_id = f.id
      GROUP BY f.id
      ORDER BY f.position, f.id`,
    [publishedOnly],
  )
  res.json({ folders: rows })
})

router.post('/', requireAdmin, async (req, res) => {
  const name = String(req.body?.name ?? '').trim() || 'New Folder'
  const { rows } = await pool.query(
    'INSERT INTO folders (name, position) VALUES ($1, (SELECT coalesce(max(position) + 1, 0) FROM folders)) RETURNING *',
    [name.slice(0, 80)],
  )
  await logActivity(req.user, 'folder_create', `ایجاد فولدر «${rows[0].name}»`)
  res.status(201).json({ folder: rows[0] })
})

router.patch('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  const name = String(req.body?.name ?? '').trim()
  const position = req.body?.position
  const { rows } = await pool.query(
    `UPDATE folders
        SET name = coalesce(nullif($2, ''), name),
            position = coalesce($3, position)
      WHERE id = $1
      RETURNING *`,
    [id, name, Number.isFinite(position) ? Number(position) : null],
  )
  if (!rows.length) return res.status(404).json({ error: 'فولدر پیدا نشد.' })
  await logActivity(req.user, 'folder_update', `ویرایش فولدر «${rows[0].name}»`)
  res.json({ folder: rows[0] })
})

router.delete('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  const { rows } = await pool.query('DELETE FROM folders WHERE id = $1 RETURNING name', [id])
  if (!rows.length) return res.status(404).json({ error: 'فولدر پیدا نشد.' })
  await logActivity(req.user, 'folder_delete', `حذف فولدر «${rows[0].name}»`)
  res.json({ ok: true })
})

export default router
