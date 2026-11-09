import { Router } from 'express'
import { pool } from '../db.js'
import { logActivity, requireAdmin, requireAuth } from '../auth.js'

const router = Router()
const PUBLIC_KEYS = ['site_name', 'site_subtitle', 'footer_note']
const ALL_KEYS = [...PUBLIC_KEYS, 'show_admin_hint']

router.get('/', requireAuth, async (_req, res) => {
  const { rows } = await pool.query('SELECT key, value FROM settings WHERE key = ANY($1)', [ALL_KEYS])
  const settings = {}
  for (const key of ALL_KEYS) settings[key] = ''
  for (const row of rows) settings[row.key] = row.value
  res.json({ settings })
})

router.put('/', requireAdmin, async (req, res) => {
  const updates = req.body?.settings ?? {}
  for (const key of ALL_KEYS) {
    if (typeof updates[key] !== 'string') continue
    await pool.query(
      `INSERT INTO settings (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
      [key, updates[key].slice(0, 400)],
    )
  }
  await logActivity(req.user, 'settings_update', 'به‌روزرسانی تنظیمات عمومی')
  const { rows } = await pool.query('SELECT key, value FROM settings WHERE key = ANY($1)', [ALL_KEYS])
  const settings = {}
  for (const key of ALL_KEYS) settings[key] = ''
  for (const row of rows) settings[row.key] = row.value
  res.json({ settings })
})

export default router
