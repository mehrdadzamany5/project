import { Router } from 'express'
import { pool } from '../db.js'
import { logActivity, requireAdmin, requireAuth, requireContributor } from '../auth.js'

const router = Router()
const KINDS = ['image', 'video', 'pdf', 'website', 'other']

router.get('/', requireAuth, async (req, res) => {
  const folderId = req.query.folderId ? Number(req.query.folderId) : null
  const params = []
  const where = []

  if (folderId !== null) {
    params.push(folderId)
    where.push(`p.folder_id = $${params.length}`)
  }
  if (req.user.role === 'guest') {
    where.push('p.is_published = TRUE')
  } else if (req.user.role === 'user') {
    params.push(req.user.id)
    where.push(`(p.is_published = TRUE OR p.owner_id = $${params.length})`)
  }

  const { rows } = await pool.query(
    `SELECT p.*, u.display_name AS owner_name, f.name AS folder_name
       FROM projects p
       LEFT JOIN users u ON u.id = p.owner_id
       LEFT JOIN folders f ON f.id = p.folder_id
      ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
      ORDER BY p.created_at DESC, p.id DESC`,
    params,
  )
  res.json({ projects: rows })
})

router.get('/:id', requireAuth, async (req, res) => {
  const { rows } = await pool.query(
    `SELECT p.*, u.display_name AS owner_name, f.name AS folder_name
       FROM projects p
       LEFT JOIN users u ON u.id = p.owner_id
       LEFT JOIN folders f ON f.id = p.folder_id
      WHERE p.id = $1`,
    [Number(req.params.id)],
  )
  const project = rows[0]
  if (!project) return res.status(404).json({ error: 'نمونه‌کار پیدا نشد.' })
  const isOwner = project.owner_id === req.user.id
  if (req.user.role === 'guest' && !project.is_published) {
    return res.status(403).json({ error: 'این نمونه‌کار منتشر نشده است.' })
  }
  if (req.user.role === 'user' && !project.is_published && !isOwner) {
    return res.status(403).json({ error: 'این نمونه‌کار در دسترس شما نیست.' })
  }
  const files = await pool.query(
    'SELECT id, url, original_name, mime, size, created_at FROM project_files WHERE project_id = $1 ORDER BY id DESC',
    [project.id],
  )
  res.json({ project, files: files.rows })
})

router.post('/', requireContributor, async (req, res) => {
  const title = String(req.body?.title ?? '').trim()
  if (!title) return res.status(400).json({ error: 'نام پروژه الزامی است.' })
  const kind = KINDS.includes(req.body?.kind) ? req.body.kind : 'other'
  const folderId = req.body?.folderId ? Number(req.body.folderId) : null

  if (folderId !== null) {
    const folder = await pool.query('SELECT id FROM folders WHERE id = $1', [folderId])
    if (!folder.rows.length) return res.status(400).json({ error: 'دسته‌بندی انتخاب‌شده موجود نیست.' })
  }

  const { rows } = await pool.query(
    `INSERT INTO projects (folder_id, owner_id, title, description, kind, thumbnail_url, content_url, is_published)
     VALUES ($1, $2, $3, $4, $5, $6, $7, FALSE)
     RETURNING *`,
    [
      folderId,
      req.user.id,
      title.slice(0, 160),
      String(req.body?.description ?? '').slice(0, 4000),
      kind,
      String(req.body?.thumbnailUrl ?? '') || null,
      String(req.body?.contentUrl ?? '') || null,
    ],
  )
  await logActivity(req.user, 'project_create', `افزودن نمونه‌کار «${rows[0].title}»`)
  res.status(201).json({ project: rows[0] })
})

async function loadProject(id) {
  const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1', [id])
  return rows[0]
}

function canEdit(user, project) {
  return user.role === 'admin' || (user.role === 'user' && project.owner_id === user.id)
}

router.patch('/:id', requireContributor, async (req, res) => {
  const project = await loadProject(Number(req.params.id))
  if (!project) return res.status(404).json({ error: 'نمونه‌کار پیدا نشد.' })
  if (!canEdit(req.user, project)) return res.status(403).json({ error: 'اجازه ویرایش این نمونه‌کار را ندارید.' })

  const body = req.body ?? {}
  const kind = KINDS.includes(body.kind) ? body.kind : project.kind
  const folderId = body.folderId === undefined
    ? project.folder_id
    : body.folderId === null || body.folderId === '' ? null : Number(body.folderId)

  if (folderId !== null) {
    const folder = await pool.query('SELECT id FROM folders WHERE id = $1', [folderId])
    if (!folder.rows.length) return res.status(400).json({ error: 'دسته‌بندی انتخاب‌شده موجود نیست.' })
  }

  // Publishing is an administrator-only decision.
  const publish = req.user.role === 'admin' && typeof body.isPublished === 'boolean'
    ? body.isPublished
    : project.is_published

  const { rows } = await pool.query(
    `UPDATE projects
        SET title = $2, description = $3, kind = $4, folder_id = $5,
            thumbnail_url = $6, content_url = $7, is_published = $8, updated_at = now()
      WHERE id = $1
      RETURNING *`,
    [
      project.id,
      String(body.title ?? project.title).trim().slice(0, 160) || project.title,
      String(body.description ?? project.description).slice(0, 4000),
      kind,
      folderId,
      body.thumbnailUrl === undefined ? project.thumbnail_url : String(body.thumbnailUrl || '') || null,
      body.contentUrl === undefined ? project.content_url : String(body.contentUrl || '') || null,
      publish,
    ],
  )
  await logActivity(req.user, 'project_update', `ویرایش نمونه‌کار «${rows[0].title}»`)
  res.json({ project: rows[0] })
})

router.patch('/:id/publish', requireAdmin, async (req, res) => {
  const published = Boolean(req.body?.isPublished)
  const { rows } = await pool.query(
    'UPDATE projects SET is_published = $2, updated_at = now() WHERE id = $1 RETURNING *',
    [Number(req.params.id), published],
  )
  if (!rows.length) return res.status(404).json({ error: 'نمونه‌کار پیدا نشد.' })
  await logActivity(
    req.user,
    published ? 'project_publish' : 'project_unpublish',
    `${published ? 'انتشار' : 'مخفی‌کردن'} «${rows[0].title}»`,
  )
  res.json({ project: rows[0] })
})

router.delete('/:id', requireContributor, async (req, res) => {
  const project = await loadProject(Number(req.params.id))
  if (!project) return res.status(404).json({ error: 'نمونه‌کار پیدا نشد.' })
  if (!canEdit(req.user, project)) return res.status(403).json({ error: 'اجازه حذف این نمونه‌کار را ندارید.' })
  await pool.query('DELETE FROM projects WHERE id = $1', [project.id])
  await logActivity(req.user, 'project_delete', `حذف نمونه‌کار «${project.title}»`)
  res.json({ ok: true })
})

router.post('/:id/files', requireContributor, async (req, res) => {
  const project = await loadProject(Number(req.params.id))
  if (!project) return res.status(404).json({ error: 'نمونه‌کار پیدا نشد.' })
  if (!canEdit(req.user, project)) return res.status(403).json({ error: 'اجازه افزودن فایل به این نمونه‌کار را ندارید.' })
  const { url, originalName, mime, size } = req.body ?? {}
  if (!url) return res.status(400).json({ error: 'فایل ارسال نشده است.' })
  const { rows } = await pool.query(
    `INSERT INTO project_files (project_id, url, original_name, mime, size, uploaded_by)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [project.id, String(url), String(originalName ?? 'file'), String(mime ?? ''), Number(size ?? 0), req.user.id],
  )
  await logActivity(req.user, 'file_upload', `افزودن فایل به «${project.title}»`)
  res.status(201).json({ file: rows[0] })
})

export default router
