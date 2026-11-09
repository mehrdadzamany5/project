import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'
import { pool } from './db.js'

export const SESSION_COOKIE = 'gallery_session'
const SESSION_DAYS = 30

export function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

export function verifyPassword(password, hash) {
  if (!hash) return Promise.resolve(false)
  return bcrypt.compare(password, hash)
}

export async function createSession(res, userId) {
  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
  await pool.query('INSERT INTO sessions (token, user_id, expires_at) VALUES ($1, $2, $3)', [token, userId, expires])
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    expires,
  })
  return token
}

export async function destroySession(req, res) {
  if (req.sessionToken) {
    await pool.query('DELETE FROM sessions WHERE token = $1', [req.sessionToken])
  }
  res.clearCookie(SESSION_COOKIE, { path: '/' })
}

// Attaches req.user (or null) and req.sessionToken for every request.
export async function loadSession(req, _res, next) {
  const token = req.cookies?.[SESSION_COOKIE]
  if (!token) return next()
  try {
    const { rows } = await pool.query(
      `SELECT s.token, u.id, u.username, u.display_name, u.role
         FROM sessions s JOIN users u ON u.id = s.user_id
        WHERE s.token = $1 AND s.expires_at > now() AND u.active = TRUE`,
      [token],
    )
    if (rows.length) {
      req.sessionToken = rows[0].token
      req.user = {
        id: rows[0].id,
        username: rows[0].username,
        displayName: rows[0].display_name,
        role: rows[0].role,
      }
    }
  } catch (error) {
    return next(error)
  }
  return next()
}

export function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'برای این کار باید وارد شوید.' })
  return next()
}

export function requireContributor(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'برای این کار باید وارد شوید.' })
  if (req.user.role === 'guest') return res.status(403).json({ error: 'حساب مهمان اجازه ویرایش ندارد.' })
  return next()
}

export function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'برای این کار باید وارد شوید.' })
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'این بخش فقط در اختیار مدیر اصلی است.' })
  return next()
}

export async function logActivity(user, action, detail = '') {
  try {
    await pool.query(
      'INSERT INTO activity_logs (user_id, actor_name, action, detail) VALUES ($1, $2, $3, $4)',
      [user?.id ?? null, user?.displayName ?? 'ناشناس', action, detail],
    )
  } catch (error) {
    console.error('activity log failed', error)
  }
}
