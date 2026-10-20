import { BOOKING } from '../data/site.js'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Parse a `YYYY-MM-DD` string as a local date (avoids UTC shift bugs). */
export function parseISODate(value) {
  if (!value) return null
  const [y, m, d] = String(value).split('-').map(Number)
  if (!y || !m || !d) return null
  const date = new Date(y, m - 1, d)
  return Number.isNaN(date.getTime()) ? null : date
}

/** Serialise a Date to `YYYY-MM-DD` in local time. */
export function toISODate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return ''
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function addDays(date, days) {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  next.setDate(next.getDate() + days)
  return next
}

export function today() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function formatDate(value, { withYear = true } = {}) {
  const date = typeof value === 'string' ? parseISODate(value) : value
  if (!date) return ''
  return `${date.getDate()} ${MONTHS[date.getMonth()]}${withYear ? ` ${date.getFullYear()}` : ''}`
}

export function formatMonthYear(date) {
  if (!date) return ''
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

export function formatCurrency(amount, { symbol = BOOKING.currencySymbol, decimals = 0 } = {}) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '—'
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`
}

export function pluralise(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`
}
