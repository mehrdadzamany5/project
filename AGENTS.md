# GALLERY — agent notes

Interactive Windows XP–style portfolio platform. Vite + React front end, Express + Postgres
back end, session-cookie auth, local-disk uploads.

## Run (sandbox)

    docker compose --project-name app --project-directory /app -f /app/docker-compose.base44.yml up -d

`docker-compose.base44.yml` runs one app container (`node:22-alpine`) that installs dependencies
into a named volume, starts the API with `node --watch server/index.js` on port 8000 and Vite on
port 3000. Only port 3000 is published: Vite proxies `/api` and `/uploads`, so cookies stay
first-party. Postgres runs as a separate service with a healthcheck.

The schema is created and seeded on API start (`server/db.js`, idempotent). Seeded accounts all use
the password `Gallery123`: `admin` (مدیر اصلی), `user1`…`user3` (کاربر). Guests sign in through
`POST /api/auth/guest` and share a real `guest` row so activity logging always has an identity.

## Non-obvious behaviour

- Roles are enforced in the API, never only in the UI: `requireContributor` blocks guests,
  `requireAdmin` guards folders/users/settings/publish. Project reads are filtered by role
  (guest → published only, user → published + own, admin → all).
- Only an admin can publish. Users create drafts; the editor hides the publish checkbox for them.
- Uploads go to the `gallery-uploads` named volume (`UPLOAD_DIR=/app-uploads`), not the repo, so they
  survive restarts and never appear in git. Only the URL is stored in `project_files`.
- `server/routes/uploads.js#/library` powers the admin file manager; deleting a file row does not
  remove the blob.
- Sound cues are synthesised with WebAudio (`src/lib/sound.js`). Set `USE_RECORDED_SOUNDS = true`
  and drop `tv-on.mp3`, `dial-up.mp3`, `windows-xp-startup.mp3`, `typing.mp3` into `public/sounds/`
  to use real recordings instead — no other change needed.
- Boot sequence timings mirror the original design: 1 s TV static → 0.9 s → 12 s terminal with
  dial-up → XP chime (3.8 s) → desktop. The skip button is the only addition.
- Project files/media are intentionally not seeded with URLs; the IE window renders an in-app
  placeholder page until an admin enters a real URL or uploads a file.
- `vite.config.js` enables polling (`CHOKIDAR_USEPOLLING=1`) and `allowedHosts: true` for the
  preview proxy; `server.watch` only switches to polling when that env var is set.

## Verify

- `curl localhost:3000/api/health` → `{"ok":true,"db":true}`.
- Auth/permissions: guest `POST /api/projects` → 403, user `PATCH` of someone else's project → 403,
  user `PATCH /api/projects/:id/publish` → 403, anonymous `/api/projects` → 401.
- UI flow: welcome → ورود کاربران → login → boot prompt → skip → desktop → folder → IE window.
  The preview browser keeps no session between runs, so each scripted check must sign in first.
