# AGENTS.md

Notes for future agents working in this repository. Only non-obvious things.

## Running it

`docker-compose.base44.yml` runs the cloned source with the Vite dev server on
**host port 3000** (container 5173). Dependencies are installed by the compose
startup command into a named `node_modules` volume when `package-lock.json` is
newer than the install stamp, so a lockfile change is picked up on the next
`up`. There is no database, no backend and no build step in dev.

```bash
docker compose -f docker-compose.base44.yml up -d --build
docker compose -f docker-compose.base44.yml logs -f web
```

## Non-obvious gotchas

- **Vite resolves to 5.4.x** (`^5.3.4`), which enforces the dev-server host
  allowlist. `vite.config.js` extends `server.allowedHosts` with
  `.${BASE44_SANDBOX_HOST_DOMAIN}` **only when `BASE44_PREVIEW_MODE === '1'`**,
  because the sandbox hostname rotates. With the flag unset, Vite keeps its
  stock behaviour. Do not hardcode a resolved sandbox host anywhere.
- `package.json` still uses the Vite default port (5173) inside the container;
  only the compose port mapping makes it 3000.
- Fonts (Manrope, Cormorant Garamond) load from Google Fonts at runtime. There is
  no self-hosted fallback, so a network-less environment falls back to system
  fonts.
- Photography lives in `public/images/` and is served by Vite from the source
  mount. Replacing a file is enough; no build needed.
- `src/lib/store.js` is the only place that touches `localStorage`. Everything
  persisted by the app (reservations, contact messages, newsletter sign-ups) goes
  through it. Keys are versioned (`kegali.<thing>.v1`).

## Verifying the app works

- `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` → `200`, and
  the served HTML must contain `<script type="module" src="/src/main.jsx">`
  (proof it is the live source, not a prebuilt bundle).
- Every route is a client-side route, so all of them return 200 from the dev
  server; check for the expected heading instead of the status code.
- The booking flow can be driven end to end: `/booking` → dates → guests → room
  → details → review → payment. The last step records a **request** in
  `localStorage` (`kegali.reservations.v1`) and shows a "not a confirmed
  reservation" notice. Remove the record afterwards — it affects the
  availability calendar for that room in that browser.
- Dates in the booking flow must be at least `BOOKING.minLeadDays` in the future.

## Design constraints

- Colour tokens are defined in `tailwind.config.js` and mirrored as CSS custom
  properties in `src/index.css`. Keep the palette restrained: black, charcoal,
  forest, olive, bronze, paper, stone.
- All copy, rates and content live in `src/data/`. Components should not hardcode
  content.
- Never invent contact details, social URLs, discounts or verified guest
  endorsements. `null` / `sample` / `draft` markers are surfaced in the UI on
  purpose.
