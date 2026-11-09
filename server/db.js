import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://gallery:gallery@localhost:5432/gallery',
  max: 10,
})

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'user', 'guest')) DEFAULT 'user',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id);

CREATE TABLE IF NOT EXISTS folders (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  folder_id INTEGER REFERENCES folders(id) ON DELETE SET NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'other',
  thumbnail_url TEXT,
  content_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS projects_folder_idx ON projects(folder_id);
CREATE INDEX IF NOT EXISTS projects_owner_idx ON projects(owner_id);

CREATE TABLE IF NOT EXISTS project_files (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime TEXT NOT NULL DEFAULT '',
  size BIGINT NOT NULL DEFAULT 0,
  uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS project_files_project_idx ON project_files(project_id);

CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  actor_name TEXT NOT NULL,
  action TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);
`

const DEFAULT_SETTINGS = [
  ['site_name', 'GALLERY'],
  ['site_subtitle', 'نمایشگاه نمونه‌کار'],
  ['footer_note', 'نمایشگاه GALLERY — نسخه اولیه'],
]

const SEED_USERS = [
  { username: 'admin', displayName: 'مدیر اصلی', role: 'admin', password: 'Gallery123' },
  { username: 'user1', displayName: 'کاربر اول', role: 'user', password: 'Gallery123' },
  { username: 'user2', displayName: 'کاربر دوم', role: 'user', password: 'Gallery123' },
  { username: 'user3', displayName: 'کاربر سوم', role: 'user', password: 'Gallery123' },
]

export async function waitForDatabase(attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      await pool.query('SELECT 1')
      return
    } catch (error) {
      if (i === attempts - 1) throw error
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
}

async function seed() {
  const { rows } = await pool.query('SELECT count(*)::int AS count FROM users')
  if (rows[0].count > 0) return

  for (const user of SEED_USERS) {
    await pool.query(
      `INSERT INTO users (username, password_hash, display_name, role)
       VALUES ($1, $2, $3, $4) ON CONFLICT (username) DO NOTHING`,
      [user.username, await bcrypt.hash(user.password, 10), user.displayName, user.role],
    )
  }

  // Guest account is a real row so sessions/activity always have an identity.
  await pool.query(
    `INSERT INTO users (username, password_hash, display_name, role)
     VALUES ('guest', NULL, 'مهمان', 'guest') ON CONFLICT (username) DO NOTHING`,
  )

  for (let i = 0; i < 4; i += 1) {
    await pool.query('INSERT INTO folders (name, position) VALUES ($1, $2)', ['New Folder', i])
  }

  const { rows: owners } = await pool.query("SELECT id FROM users WHERE role = 'user' ORDER BY id")
  const { rows: folders } = await pool.query('SELECT id FROM folders ORDER BY position')
  const samples = [
    { title: 'Sample Project 01', kind: 'image', description: 'نمونه تصویری برای آزمودن نمایشگر.', published: true },
    { title: 'Sample Project 02', kind: 'video', description: 'نمونه ویدئویی برای آزمودن نمایشگر.', published: true },
    { title: 'Sample Project 03', kind: 'pdf', description: 'نمونه PDF برای آزمودن نمایشگر.', published: false },
    { title: 'Sample Project 04', kind: 'website', description: 'نمونه وب‌سایت؛ لینک اصلی هنوز متصل نشده است.', published: true },
    { title: 'Sample Project 05', kind: 'other', description: 'فایل نمونه با نوع دلخواه.', published: false },
    { title: 'Sample Project 06', kind: 'image', description: 'نمونه دوم تصویری برای آزمودن فولدرها.', published: true },
  ]
  for (let i = 0; i < samples.length; i += 1) {
    const sample = samples[i]
    await pool.query(
      `INSERT INTO projects (folder_id, owner_id, title, description, kind, is_published)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        folders[i % folders.length]?.id ?? null,
        owners[i % Math.max(owners.length, 1)]?.id ?? null,
        sample.title,
        sample.description,
        sample.kind,
        sample.published,
      ],
    )
  }

  for (const [key, value] of DEFAULT_SETTINGS) {
    await pool.query('INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING', [key, value])
  }
}

export async function initDb() {
  await waitForDatabase()
  await pool.query(SCHEMA)
  await seed()
}
