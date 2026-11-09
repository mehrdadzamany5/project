import { Router } from 'express'
import { pool } from '../db.js'
import {
  createSession,
  destroySession,
  hashPassword,
  logActivity,
  requireAuth,
  verifyPassword,
} from '../auth.js'

const router = Router()

router.get('/me', (req, res) => {
  res.json({ user: req.user ?? null })
})

router.post('/login', async (req, res) => {
  const username = String(req.body?.username ?? '').trim().toLowerCase()
  const password = String(req.body?.password ?? '')
  if (!username || !password) {
    return res.status(400).json({ error: 'نام کاربری و رمز عبور را وارد کنید.' })
  }

  const { rows } = await pool.query('SELECT * FROM users WHERE lower(username) = $1', [username])
  const account = rows[0]
  if (!account || account.role === 'guest' || !account.active) {
    return res.status(401).json({ error: 'نام کاربری یا رمز عبور نادرست است.' })
  }
  if (!(await verifyPassword(password, account.password_hash))) {
    return res.status(401).json({ error: 'نام کاربری یا رمز عبور نادرست است.' })
  }

  await createSession(res, account.id)
  const user = {
    id: account.id,
    username: account.username,
    displayName: account.display_name,
    role: account.role,
  }
  await logActivity(user, 'login', `ورود ${user.displayName}`)
  res.json({ user })
})

router.post('/guest', async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE role = 'guest' ORDER BY id LIMIT 1")
  const account = rows[0]
  if (!account) return res.status(500).json({ error: 'حساب مهمان در دسترس نیست.' })
  await createSession(res, account.id)
  const user = { id: account.id, username: account.username, displayName: account.display_name, role: 'guest' }
  await logActivity(user, 'guest_login', 'ورود به‌عنوان مهمان')
  res.json({ user })
})

router.post('/logout', async (req, res) => {
  if (req.user) await logActivity(req.user, 'logout', `خروج ${req.user.displayName}`)
  await destroySession(req, res)
  res.json({ ok: true })
})

router.post('/password', requireAuth, async (req, res) => {
  if (req.user.role === 'guest') return res.status(403).json({ error: 'حساب مهمان رمز عبور ندارد.' })
  const current = String(req.body?.currentPassword ?? '')
  const next = String(req.body?.newPassword ?? '')
  if (next.length < 6) return res.status(400).json({ error: 'رمز جدید باید حداقل ۶ نویسه باشد.' })

  const { rows } = await pool.query('SELECT password_hash FROM users WHERE id = $1', [req.user.id])
  if (!(await verifyPassword(current, rows[0]?.password_hash))) {
    return res.status(400).json({ error: 'رمز فعلی نادرست است.' })
  }
  await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [await hashPassword(next), req.user.id])
  await logActivity(req.user, 'password_change', 'تغییر رمز عبور شخصی')
  res.json({ ok: true })
})

export default router
