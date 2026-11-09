import { Router } from 'express'
import { pool } from '../db.js'
import { requireAdmin } from '../auth.js'

const router = Router()

router.get('/', requireAdmin, async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 100, 300)
  const { rows } = await pool.query(
    `SELECT a.id, a.actor_name, a.action, a.detail, a.created_at, u.role
       FROM activity_logs a LEFT JOIN users u ON u.id = a.user_id
      ORDER BY a.id DESC LIMIT $1`,
    [limit],
  )
  res.json({ activity: rows })
})

export default router
