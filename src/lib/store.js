/**
 * Local persistence layer.
 *
 * IMPORTANT — this is a demonstration build. There is no server in this
 * project, so reservations, contact messages and newsletter sign-ups are kept
 * in the visitor's own browser via `localStorage`. Nothing is transmitted
 * anywhere, no payment is processed and no reservation is confirmed.
 *
 * Swapping this module for real API calls is the single change required to
 * move the booking flow onto a backend.
 */

const KEYS = {
  reservations: 'kegali.reservations.v1',
  contact: 'kegali.contact.v1',
  newsletter: 'kegali.newsletter.v1',
}

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function createId(prefix = 'id') {
  const random =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 10)
  return `${prefix}_${random}`
}

/* ------------------------------------------------------------------ */
/* Reservations                                                        */
/* ------------------------------------------------------------------ */

/** Active reservations only — cancelled entries never block availability. */
export function listReservations() {
  const all = read(KEYS.reservations, [])
  return Array.isArray(all) ? all.filter((item) => item && item.status !== 'cancelled') : []
}

export function listAllReservations() {
  const all = read(KEYS.reservations, [])
  return Array.isArray(all) ? all : []
}

/**
 * Persist a reservation request. The stored record is deliberately marked
 * `status: 'request'` — it is not a confirmed booking and the UI says so.
 */
export function saveReservationRequest(record) {
  const all = listAllReservations()
  const entry = {
    id: createId('res'),
    status: 'request',
    createdAt: new Date().toISOString(),
    ...record,
  }
  all.push(entry)
  write(KEYS.reservations, all)
  return entry
}

/* ------------------------------------------------------------------ */
/* Contact + newsletter                                                */
/* ------------------------------------------------------------------ */

export function saveContactMessage(record) {
  const all = read(KEYS.contact, [])
  const entry = { id: createId('msg'), createdAt: new Date().toISOString(), ...record }
  all.push(entry)
  write(KEYS.contact, all)
  return entry
}

export function saveNewsletterSubscriber(email) {
  const all = read(KEYS.newsletter, [])
  const exists = all.some((entry) => entry.email?.toLowerCase() === email.toLowerCase())
  if (exists) return { alreadySubscribed: true }
  all.push({ id: createId('sub'), email, createdAt: new Date().toISOString() })
  write(KEYS.newsletter, all)
  return { alreadySubscribed: false }
}
