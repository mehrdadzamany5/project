import { Router } from 'express'
import { pool } from '../db.js'
import { hashPassword, logActivity, requireAdmin } from '../auth.js'

const router = Router()
const ROLES = ['admin', 'user']

router.use(requireAdmin)

router.get('/', async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT u.id, u.username, u.display_name, u.role, u.active, u.created_at,
            count(p.id)::int AS project_count
       FROM users u
       LEFT JOIN projects p ON p.owner_id = u.id
      WHERE u.role <> 'guest'
      GROUP BY u.id
      ORDER BY u.id`,
  )
  res.json({ users: rows })
})

router.post('/', async (req, res) => {
  const username = String(req.body?.username ?? '').trim().toLowerCase()
  const displayName = String(req.body?.displayName ?? '').trim()
  const password = String(req.body?.password ?? '')
  const role = ROLES.includes(req.body?.role) ? req.body.role : 'user'
  if (!/^[a-z0-9._-]{3,32}$/.test(username)) {
    return res.status(400).json({ error: 'نام کاربری باید ۳ تا ۳۲ نویسه لاتین باشد.' })
  }
  if (password.length < 6) return res.status(400).json({ error: 'رمز عبور باید حداقل ۶ نویسه باشد.' })

  try {
    const { rows } = await pool.query(
      `INSERT INTO users (username, password_hash, display_name, role)
       VALUES ($1, $2, $3, $4) RETURNING id, username, display_name, role, active, created_at`,
      [username, await hashPassword(password), displayName || username, role],
    )
    await logActivity(req.user, 'user_create', `ایجاد کاربر «${rows[0].display_name}»`)
    res.status(201).json({ user: rows[0] })
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ error: 'این نام کاربری قبلاً ثبت شده است.' })
    throw error
  }
})

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { rows: existingRows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
  const existing = existingRows[0]
  if (!existing) return res.status(404).json({ error: 'کاربر پیدا نشد.' })
  if (existing.role === 'guest') return res.status(400).json({ error: 'حساب مهمان قابل ویرایش نیست.' })

  const role = ROLES.includes(req.body?.role) ? req.body.role : existing.role
  const active = typeof req.body?.active === 'boolean' ? req.body.active : existing.active
  const displayName = String(req.body?.displayName ?? existing.display_name).trim() || existing.display_name

  if (existing.role === 'admin' && (role !== 'admin' || !active)) {
    const { rows } = await pool.query("SELECT count(*)::int AS count FROM users WHERE role = 'admin' AND active AND id <> $1", [id])
    if (rows[0].count === 0) return res.status(400).json({ error: 'حداقل یک مدیر فعال باید باقی بماند.' })
  }
  if (id === req.user.id && !active) return res.status(400).json({ error: 'نمی‌توانید حساب خودتان را غیرفعال کنید.' })

  await pool.query('UPDATE users SET display_name = $2, role = $3, active = $4 WHERE id = $1', [
    id,
    displayName.slice(0, 80),
    role,
    active,
  ])
  if (req.body?.password) {
    const password = String(req.body.password)
    if (password.length < 6) return res.status(400).json({ error: 'رمز عبور باید حداقل ۶ نویسه باشد.' })
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [await hashPassword(password), id])
    await pool.query('DELETE FROM sessions WHERE user_id = $1', [id])
  }
  if (!active) await pool.query('DELETE FROM sessions WHERE user_id = $1', [id])

  await logActivity(req.user, 'user_update', `ویرایش کاربر «${displayName}»`)
  const { rows } = await pool.query(
    'SELECT id, username, display_name, role, active, created_at FROM users WHERE id = $1',
    [id],
  )
  res.json({ user: rows[0] })
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (id === req.user.id) return res.status(400).json({ error: 'حساب خودتان را نمی‌توانید حذف کنید.' })
  const { rows } = await pool.query("SELECT display_name FROM users WHERE id = $1 AND role <> 'guest'", [id])
  if (!rows.length) return res.status(404).json({ error: 'کاربر پیدا نشد.' })
  await pool.query('DELETE FROM users WHERE id = $1', [id])
  await logActivity(req.user, 'user_delete', `حذف کاربر «${rows[0].display_name}»`)
  res.json({ ok: true })
})

export default router
