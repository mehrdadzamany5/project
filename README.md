# GALLERY — نمایشگاه نمونه‌کار

A portfolio platform that opens as an interactive Windows XP desktop: folders are categories,
projects are files, and each project opens in a classic Internet Explorer window.

- **Front end:** React + Vite (`src/`), Windows XP chrome, CRT boot sequence with synthesised audio.
- **Back end:** Express (`server/`) with Postgres, bcrypt password hashes, http-only session cookies.
- **Storage:** uploads live in a volume and only their URLs are stored in the database.

## Run

```bash
docker compose --project-name app --project-directory /app -f /app/docker-compose.base44.yml up -d
```

The app is served on <http://localhost:3000>; the API is proxied behind the same origin.

Without Docker:

```bash
npm install
DATABASE_URL=postgres://user:pass@localhost:5432/gallery npm run dev:server   # API on :8000
npm run dev                                                                  # web on :3000
```

## Accounts

Seeded on first start with the password `Gallery123`:

| username | role |
| --- | --- |
| `admin` | مدیر اصلی — full access, publishing, users, settings |
| `user1`, `user2`, `user3` | کاربر — manage their own projects |
| guest | ورود مهمان — published projects only |

Change the passwords from «تغییر رمز عبور» in the start menu.

## Structure

- `server/db.js` — schema + seed; `server/auth.js` — sessions and role guards
- `server/routes/` — auth, folders, projects, users, activity, settings, uploads
- `src/components/` — Welcome, LoginForm, BootSequence, Desktop, ExplorerWindow,
  InternetExplorer, WorkspaceWindow, ProjectEditor, `admin/` panels
- `src/lib/sound.js` — WebAudio cues (see `AGENTS.md` to plug in recorded files)
- `src/styles/xp.css` — all XP chrome, CRT effect and responsive rules

## Roles

Admin manages folders, every project, publishing, users, uploads and settings. Regular users add
and edit only their own projects (drafts until an admin publishes them). Guests read published
projects and never see admin surfaces. Every rule is enforced by the API, not just the UI.
