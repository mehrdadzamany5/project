import { BOOKING } from '../data/site.js'
import { SEASONS } from '../data/rooms.js'
import { addDays, parseISODate, toISODate, today } from './format.js'
import { listReservations } from './store.js'

/** Inclusive-exclusive night count between two `YYYY-MM-DD` strings. */
export function nightsBetween(checkIn, checkOut) {
  const from = parseISODate(checkIn)
  const to = parseISODate(checkOut)
  if (!from || !to) return 0
  const ms = to.getTime() - from.getTime()
  return Math.max(0, Math.round(ms / 86400000))
}

/** Every date covered by a stay, excluding the check-out day. */
export function stayDates(checkIn, checkOut) {
  const from = parseISODate(checkIn)
  const nights = nightsBetween(checkIn, checkOut)
  if (!from || nights <= 0) return []
  return Array.from({ length: nights }, (_, i) => toISODate(addDays(from, i)))
}

const monthDay = (date) => {
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** The seasonal rule that applies to a date, or null for the base rate. */
export function seasonFor(isoDate) {
  const date = parseISODate(isoDate)
  if (!date) return null
  const md = monthDay(date)
  return (
    SEASONS.find((season) =>
      season.from <= season.to
        ? md >= season.from && md <= season.to
        : md >= season.from || md <= season.to,
    ) || null
  )
}

export function nightlyRate(room, isoDate) {
  const season = seasonFor(isoDate)
  const multiplier = season ? season.multiplier : 1
  return {
    rate: Math.round(room.baseRate * multiplier),
    seasonLabel: season ? season.label : 'Standard rate',
    isBase: !season,
  }
}

/**
 * Price breakdown for a stay. Returns `null` when dates are incomplete.
 * `taxes` is `null` when no tax rate is configured — the UI shows a
 * "not configured" note rather than an invented figure.
 */
export function quote(room, checkIn, checkOut) {
  const nights = nightsBetween(checkIn, checkOut)
  if (!room || nights <= 0) return null

  const nightsDetail = stayDates(checkIn, checkOut).map((date) => {
    const { rate, seasonLabel } = nightlyRate(room, date)
    return { date, rate, seasonLabel }
  })

  const subtotal = nightsDetail.reduce((sum, night) => sum + night.rate, 0)
  const cleaningFee = typeof room.cleaningFee === 'number' ? room.cleaningFee : BOOKING.cleaningFee
  const serviceFee = Math.round(subtotal * (BOOKING.serviceFeeRate || 0))
  const taxes =
    typeof BOOKING.taxRate === 'number'
      ? Math.round((subtotal + cleaningFee + serviceFee) * BOOKING.taxRate)
      : null

  const total = subtotal + cleaningFee + serviceFee + (taxes || 0)

  return {
    nights,
    nightsDetail,
    averageNightly: Math.round(subtotal / nights),
    subtotal,
    cleaningFee,
    serviceFee,
    taxes,
    total,
    currencySymbol: BOOKING.currencySymbol,
    seasonalLabels: [...new Set(nightsDetail.map((n) => n.seasonLabel))],
  }
}

/** Dates already taken for a room by reservations stored on this device. */
export function bookedDates(roomSlug) {
  const taken = new Set()
  listReservations()
    .filter((reservation) => reservation.roomSlug === roomSlug)
    .forEach((reservation) => {
      stayDates(reservation.checkIn, reservation.checkOut).forEach((date) => taken.add(date))
    })
  return taken
}

/**
 * Availability check against locally stored reservations. This is a
 * demonstration check only — a real deployment must verify availability on the
 * server before confirming anything.
 */
export function isRangeAvailable(roomSlug, checkIn, checkOut) {
  const taken = bookedDates(roomSlug)
  return stayDates(checkIn, checkOut).every((date) => !taken.has(date))
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const PHONE_PATTERN = /^[+()\d\s-]{6,20}$/

export function validateEmail(value) {
  if (!value?.trim()) return 'Enter an email address.'
  if (!EMAIL_PATTERN.test(value.trim())) return 'Enter a valid email address.'
  return null
}

/** Validate the whole stay selection. Returns a field → message map. */
export function validateStay({ room, checkIn, checkOut, guests }) {
  const errors = {}
  const start = parseISODate(checkIn)
  const end = parseISODate(checkOut)
  const earliest = addDays(today(), BOOKING.minLeadDays)
  const latest = addDays(today(), BOOKING.bookingWindowDays)

  if (!checkIn) errors.checkIn = 'Choose an arrival date.'
  else if (!start) errors.checkIn = 'That date could not be read.'
  else if (start < earliest) errors.checkIn = `Arrival must be on or after ${toISODate(earliest)}.`
  else if (start > latest) errors.checkIn = 'Arrival is beyond the bookable window.'

  if (!checkOut) errors.checkOut = 'Choose a departure date.'
  else if (!end) errors.checkOut = 'That date could not be read.'
  else if (start && end <= start) errors.checkOut = 'Departure must be after arrival.'

  if (!errors.checkIn && !errors.checkOut) {
    const nights = nightsBetween(checkIn, checkOut)
    if (nights < BOOKING.minNights) errors.checkOut = `Minimum stay is ${BOOKING.minNights} night.`
    if (nights > BOOKING.maxNights) errors.checkOut = `Maximum stay is ${BOOKING.maxNights} nights.`
  }

  const guestCount = Number(guests)
  if (!guestCount || Number.isNaN(guestCount)) errors.guests = 'Choose how many guests are coming.'
  else if (guestCount < 1) errors.guests = 'At least one guest is required.'
  else if (guestCount > BOOKING.maxGuestsPerBooking)
    errors.guests = `For more than ${BOOKING.maxGuestsPerBooking} guests please contact the retreat directly.`
  else if (room && guestCount > room.capacity)
    errors.guests = `${room.name} sleeps up to ${room.capacity} guests.`

  if (room && !errors.checkIn && !errors.checkOut && !isRangeAvailable(room.slug, checkIn, checkOut)) {
    errors.checkOut = 'Those dates are no longer available in this room.'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

export function validateGuestDetails(details) {
  const errors = {}
  if (!details.firstName?.trim()) errors.firstName = 'Enter a first name.'
  if (!details.lastName?.trim()) errors.lastName = 'Enter a last name.'
  const emailError = validateEmail(details.email)
  if (emailError) errors.email = emailError
  if (details.phone?.trim() && !PHONE_PATTERN.test(details.phone.trim()))
    errors.phone = 'Enter a valid phone number, or leave it blank.'
  if (!details.country?.trim()) errors.country = 'Enter a country of residence.'
  return { valid: Object.keys(errors).length === 0, errors }
}
