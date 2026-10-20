# KEGALI — Architectural Forest Retreats

A complete marketing and booking website for **KEGALI**, a fictional luxury forest
homestay: cinematic photography, an editorial black-and-white layout, a full
multi-page structure and a six-step booking flow.

Built with the project's existing stack: **React 18 + Vite + Tailwind CSS +
React Router**. No dependencies were added.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

In the Base44 sandbox it runs through `docker-compose.base44.yml` on port 3000.

## Structure

```
src/
  data/        site config, rooms, offers, journal, experiences, testimonials, FAQ, policies
  lib/         format helpers, booking engine (pricing/validation), local persistence
  components/  ui primitives, layout (header/footer), home sections, rooms, booking
  pages/       one file per route
public/images/ 31 architectural and landscape photographs
```

All copy, rates, rooms and articles live in `src/data/` — edit there, not in components.

## Routes

| Route | Page |
| --- | --- |
| `/` | Homepage (hero carousel, welcome, featured room, room strip, testimonials, offers collage, journal) |
| `/about` | Brand story, architecture, philosophy, sustainability |
| `/rooms` | Filterable room collection |
| `/rooms/:slug` | Room detail: gallery, facts, amenities, availability calendar, booking panel |
| `/booking` | Six-step booking flow |
| `/experiences` | Editorial experiences page |
| `/offers` | All special offers with terms |
| `/journal`, `/journal/:slug` | Journal listing and article pages |
| `/contact` | Validated contact form |
| `/faq` | Accessible accordion FAQ |
| `/policies`, `/policies/:slug` | Policy index and detail pages |

## What is real and what is not

This build is a **frontend demonstration**. There is no server in the project, so:

- **Reservations, contact messages and newsletter sign-ups are stored in the
  visitor's browser** (`localStorage`, see `src/lib/store.js`). Nothing is
  transmitted, and no reservation is confirmed.
- **No payment provider is configured** (`BOOKING.paymentProvider` is `null` in
  `src/data/site.js`). No card details are collected and no money is taken. The
  final step submits a *reservation request*, and the confirmation screen says so.
- **Availability** is checked against reservations recorded on the same device.
  A real deployment must verify availability on the server.
- **Rates are sample rates** and are labelled as such. Tax is not configured.
- **Testimonials, offers and experiences are sample content**, marked as such in
  the UI and in their data files.
- **Policies are drafts.** None has been supplied by the operator.
- **No contact details or social URLs are invented.** Fill in `CONTACT` and
  `SOCIAL_LINKS` in `src/data/site.js` and they appear across the site; the
  social icon row and the direct-contact block stay hidden until you do.

To make it production-ready: replace `src/lib/store.js` with API calls, connect a
payment provider, and replace the draft policy text.

## Configuration

Everything an operator needs to supply is in `src/data/site.js`:

- `CONTACT` — email, phone, address, response time
- `SOCIAL_LINKS` — array of `{ label, href, icon }`
- `LANGUAGES` — only `enabled: true` entries are selectable
- `BOOKING` — currency, fees, tax rate, stay limits, payment provider

Rates and seasonal rules live in `src/data/rooms.js` (`baseRate`, `cleaningFee`,
`SEASONS`).
