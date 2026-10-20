import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Field, { inputClass } from '../components/ui/Field.jsx'
import Img from '../components/ui/Img.jsx'
import Notice from '../components/ui/Notice.jsx'
import { ROOMS, getRoom } from '../data/rooms.js'
import { BOOKING } from '../data/site.js'
import { addDays, formatCurrency, formatDate, toISODate, today } from '../lib/format.js'
import {
  isRangeAvailable,
  nightsBetween,
  quote,
  validateGuestDetails,
  validateStay,
} from '../lib/booking.js'
import { saveReservationRequest } from '../lib/store.js'

const STEPS = [
  { id: 'dates', label: 'Dates' },
  { id: 'guests', label: 'Guests' },
  { id: 'room', label: 'Room' },
  { id: 'details', label: 'Your details' },
  { id: 'review', label: 'Review' },
  { id: 'payment', label: 'Payment' },
]

const EMPTY_DETAILS = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  notes: '',
}

function Stepper({ current, onSelect }) {
  return (
    <ol className="no-scrollbar -mx-5 flex gap-6 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" aria-label="Booking steps">
      {STEPS.map((step, index) => {
        const state = index === current ? 'current' : index < current ? 'done' : 'todo'
        return (
          <li key={step.id} className="shrink-0">
            <button
              type="button"
              onClick={() => index < current && onSelect(index)}
              disabled={index > current}
              aria-current={state === 'current' ? 'step' : undefined}
              className={`flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-label transition-colors duration-300 ${
                state === 'current'
                  ? 'text-black'
                  : state === 'done'
                    ? 'text-bronze hover:text-black'
                    : 'text-muted/60'
              } disabled:cursor-default`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center border text-[10px] ${
                  state === 'current'
                    ? 'border-black bg-black text-white'
                    : state === 'done'
                      ? 'border-bronze text-bronze'
                      : 'border-line text-muted/60'
                }`}
              >
                {index + 1}
              </span>
              {step.label}
            </button>
          </li>
        )
      })}
    </ol>
  )
}

function SummaryRow({ label, value, muted = false }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className={muted ? 'text-muted' : 'text-black'}>{label}</dt>
      <dd className={muted ? 'text-muted' : 'text-black'}>{value}</dd>
    </div>
  )
}

export default function Booking() {
  const [searchParams] = useSearchParams()

  const [step, setStep] = useState(0)
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '')
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '')
  const [guests, setGuests] = useState(searchParams.get('guests') || '')
  const [roomSlug, setRoomSlug] = useState(searchParams.get('room') || '')
  const [details, setDetails] = useState(EMPTY_DETAILS)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitted, setSubmitted] = useState(null)

  // Guards against a double click submitting two requests.
  const inFlight = useRef(false)
  const topRef = useRef(null)

  const room = getRoom(roomSlug)
  const minDate = toISODate(addDays(today(), BOOKING.minLeadDays))
  const maxDate = toISODate(addDays(today(), BOOKING.bookingWindowDays))
  const nights = nightsBetween(checkIn, checkOut)
  const price = room && nights > 0 ? quote(room, checkIn, checkOut) : null

  useEffect(() => {
    if (step > 0) topRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [step])

  const eligibleRooms = useMemo(() => {
    const count = Number(guests) || 0
    return ROOMS.map((item) => ({
      room: item,
      fits: count === 0 || item.capacity >= count,
      available: nights > 0 ? isRangeAvailable(item.slug, checkIn, checkOut) : true,
    }))
  }, [guests, checkIn, checkOut, nights])

  const goNext = () => setStep((value) => Math.min(STEPS.length - 1, value + 1))
  const goBack = () => setStep((value) => Math.max(0, value - 1))

  /* ---------------- step handlers ---------------- */

  const submitDates = (event) => {
    event.preventDefault()
    // Only the date fields are relevant on this step.
    const { errors: nextErrors } = validateStay({ room, checkIn, checkOut, guests: guests || 1 })
    const dateErrors = {}
    if (nextErrors.checkIn) dateErrors.checkIn = nextErrors.checkIn
    if (nextErrors.checkOut) dateErrors.checkOut = nextErrors.checkOut
    setErrors(dateErrors)
    if (Object.keys(dateErrors).length) return
    goNext()
  }

  const submitGuests = (event) => {
    event.preventDefault()
    const count = Number(guests)
    const nextErrors = {}
    if (!count) nextErrors.guests = 'Choose how many guests are coming.'
    else if (count < 1) nextErrors.guests = 'At least one guest is required.'
    else if (count > BOOKING.maxGuestsPerBooking)
      nextErrors.guests = `For more than ${BOOKING.maxGuestsPerBooking} guests please contact the retreat directly.`
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    goNext()
  }

  const selectRoom = (slug) => {
    setRoomSlug(slug)
    setErrors({})
    goNext()
  }

  const submitDetails = (event) => {
    event.preventDefault()
    const { valid, errors: nextErrors } = validateGuestDetails(details)
    setErrors(nextErrors)
    if (!valid) return
    goNext()
  }

  const submitRequest = async () => {
    if (inFlight.current || !room || !price) return
    inFlight.current = true
    setStatus('submitting')
    setErrors({})

    // Re-check availability at the moment of submission.
    if (!isRangeAvailable(room.slug, checkIn, checkOut)) {
      setStatus('idle')
      inFlight.current = false
      setErrors({ checkOut: 'Those dates are no longer available in this room.' })
      setStep(0)
      return
    }

    try {
      const record = saveReservationRequest({
        roomSlug: room.slug,
        roomName: room.name,
        checkIn,
        checkOut,
        nights: price.nights,
        guests: Number(guests),
        guest: { ...details },
        total: price.total,
        currency: BOOKING.currency,
        paymentStatus: 'not_collected',
      })
      setSubmitted({ ...record, price })
      setStatus('submitted')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('error')
    } finally {
      inFlight.current = false
    }
  }

  /* ---------------- submitted state ---------------- */

  if (status === 'submitted' && submitted) {
    return (
      <>
        <PageHeader eyebrow="Booking" title="Request received" />
        <section className="bg-paper py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-2xl">
              <Notice tone="draft" title="Not a confirmed reservation">
                No booking system or payment provider is connected to this website, so nothing has been
                charged and no stay is confirmed yet. Your request has been recorded in this browser only.
                The retreat would normally confirm it with you directly.
              </Notice>

              <div className="mt-10 border border-line bg-white p-8">
                <p className="label text-muted">Reference</p>
                <p className="mt-2 font-mono text-[15px] text-black">{submitted.id}</p>

                <dl className="mt-8 space-y-3 text-[14px]">
                  <SummaryRow label="Room" value={submitted.roomName} />
                  <SummaryRow
                    label="Arrival"
                    value={`${formatDate(submitted.checkIn)} from ${room?.checkIn || ''}`}
                  />
                  <SummaryRow
                    label="Departure"
                    value={`${formatDate(submitted.checkOut)} by ${room?.checkOut || ''}`}
                  />
                  <SummaryRow
                    label="Nights"
                    value={`${submitted.nights} ${submitted.nights === 1 ? 'night' : 'nights'}`}
                  />
                  <SummaryRow label="Guests" value={submitted.guests} />
                  <SummaryRow label="Guest" value={`${details.firstName} ${details.lastName}`.trim()} />
                  <SummaryRow label="Email" value={details.email} />
                  <div className="border-t border-line pt-3">
                    <SummaryRow label="Estimated total" value={formatCurrency(submitted.total)} />
                  </div>
                  <SummaryRow label="Payment" value="Not collected" muted />
                </dl>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/rooms"
                  className="inline-flex items-center justify-center bg-black px-7 py-3.5 text-[11px] font-medium uppercase tracking-label text-white transition-colors duration-300 hover:bg-forest"
                >
                  Browse rooms
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center border border-black/25 px-7 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 hover:bg-black hover:text-white"
                >
                  Contact the retreat
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </>
    )
  }

  /* ---------------- wizard ---------------- */

  return (
    <>
      <PageHeader
        eyebrow="Booking"
        title="Reserve your stay"
        intro="Six short steps: dates, guests, room, your details, a review, then payment. No payment is taken until a provider is connected."
      />

      <section className="bg-paper py-14 sm:py-16 lg:py-20">
        <Container>
          <div ref={topRef} className="scroll-mt-28" />

          <Stepper current={step} onSelect={setStep} />

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              {/* Step 1 — dates */}
              {step === 0 ? (
                <form onSubmit={submitDates} noValidate>
                  <h2 className="text-[20px] font-medium uppercase tracking-wide2 text-black">
                    Step 1 — Select your dates
                  </h2>
                  <p className="mt-4 max-w-xl text-[14px] leading-[1.85] text-muted">
                    Arrival is from 15:00 and departure by 11:00. Stays run between{' '}
                    {BOOKING.minNights} and {BOOKING.maxNights} nights.
                  </p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <Field label="Arrival" required error={errors.checkIn}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          name="checkIn"
                          type="date"
                          value={checkIn}
                          min={minDate}
                          max={maxDate}
                          onChange={(event) => {
                            setCheckIn(event.target.value)
                            setErrors({})
                          }}
                          aria-invalid={Boolean(errors.checkIn)}
                          aria-describedby={errors.checkIn ? describedBy : undefined}
                          className={inputClass(Boolean(errors.checkIn))}
                        />
                      )}
                    </Field>

                    <Field label="Departure" required error={errors.checkOut}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          name="checkOut"
                          type="date"
                          value={checkOut}
                          min={checkIn || minDate}
                          max={maxDate}
                          onChange={(event) => {
                            setCheckOut(event.target.value)
                            setErrors({})
                          }}
                          aria-invalid={Boolean(errors.checkOut)}
                          aria-describedby={errors.checkOut ? describedBy : undefined}
                          className={inputClass(Boolean(errors.checkOut))}
                        />
                      )}
                    </Field>
                  </div>

                  {nights > 0 ? (
                    <p className="mt-6 text-[14px] text-muted">
                      {nights} {nights === 1 ? 'night' : 'nights'} ·{' '}
                      {formatDate(checkIn)} → {formatDate(checkOut)}
                    </p>
                  ) : null}

                  <div className="mt-10 flex gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-black px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-white transition-colors duration-300 hover:bg-forest"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              ) : null}

              {/* Step 2 — guests */}
              {step === 1 ? (
                <form onSubmit={submitGuests} noValidate>
                  <h2 className="text-[20px] font-medium uppercase tracking-wide2 text-black">
                    Step 2 — How many guests?
                  </h2>
                  <p className="mt-4 max-w-xl text-[14px] leading-[1.85] text-muted">
                    We will only offer rooms that sleep your party. For more than{' '}
                    {BOOKING.maxGuestsPerBooking} guests, contact the retreat directly.
                  </p>

                  <div className="mt-8 max-w-xs">
                    <Field label="Guests" required error={errors.guests}>
                      {({ id, describedBy }) => (
                        <select
                          id={id}
                          name="guests"
                          value={guests}
                          onChange={(event) => {
                            setGuests(event.target.value)
                            setErrors({})
                            if (roomSlug && Number(event.target.value) > (getRoom(roomSlug)?.capacity || 0)) {
                              setRoomSlug('')
                            }
                          }}
                          aria-invalid={Boolean(errors.guests)}
                          aria-describedby={errors.guests ? describedBy : undefined}
                          className={inputClass(Boolean(errors.guests))}
                        >
                          <option value="">Select…</option>
                          {Array.from({ length: BOOKING.maxGuestsPerBooking }, (_, i) => i + 1).map((count) => (
                            <option key={count} value={count}>
                              {count} {count === 1 ? 'guest' : 'guests'}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                  </div>

                  <div className="mt-10 flex gap-3">
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center justify-center border border-black/25 px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 hover:bg-black hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-black px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-white transition-colors duration-300 hover:bg-forest"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              ) : null}

              {/* Step 3 — room */}
              {step === 2 ? (
                <div>
                  <h2 className="text-[20px] font-medium uppercase tracking-wide2 text-black">
                    Step 3 — Choose a room
                  </h2>
                  <p className="mt-4 max-w-xl text-[14px] leading-[1.85] text-muted">
                    Availability is checked against reservations recorded on this device. A real deployment
                    would verify this on the server.
                  </p>

                  <ul className="mt-8 space-y-4">
                    {eligibleRooms.map(({ room: item, fits, available }) => {
                      const disabled = !fits || !available
                      const roomPrice = quote(item, checkIn, checkOut)
                      return (
                        <li key={item.slug}>
                          <button
                            type="button"
                            disabled={disabled}
                            onClick={() => selectRoom(item.slug)}
                            aria-pressed={roomSlug === item.slug}
                            className={`flex w-full items-stretch gap-5 border bg-white p-3 text-left transition-colors duration-300 ${
                              roomSlug === item.slug ? 'border-black' : 'border-line'
                            } ${disabled ? 'cursor-not-allowed opacity-55' : 'hover:border-black'}`}
                          >
                            <Img
                              src={item.images[0].src}
                              alt=""
                              className="hidden h-24 w-36 shrink-0 sm:block"
                            />
                            <span className="min-w-0 flex-1 py-1">
                              <span className="flex flex-wrap items-baseline justify-between gap-2">
                                <span className="text-[15px] font-medium text-black">{item.name}</span>
                                <span className="text-[14px] text-black">
                                  {formatCurrency(item.baseRate)}
                                  <span className="text-[12px] text-muted"> / night</span>
                                </span>
                              </span>
                              <span className="mt-1.5 block text-[12px] text-muted">
                                {item.type} · sleeps {item.capacity} · {item.size} m²
                              </span>
                              <span className="mt-2 block text-[12px] text-muted">
                                {!fits
                                  ? 'Too small for your party'
                                  : !available
                                    ? 'Not available for those dates'
                                    : roomPrice
                                      ? `Estimated ${formatCurrency(roomPrice.total)} total`
                                      : 'Select dates to see a total'}
                              </span>
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>

                  <div className="mt-10">
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center justify-center border border-black/25 px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 hover:bg-black hover:text-white"
                    >
                      Back
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Step 4 — details */}
              {step === 3 ? (
                <form onSubmit={submitDetails} noValidate>
                  <h2 className="text-[20px] font-medium uppercase tracking-wide2 text-black">
                    Step 4 — Your details
                  </h2>
                  <p className="mt-4 max-w-xl text-[14px] leading-[1.85] text-muted">
                    Only what the retreat needs to answer your request. Nothing is transmitted from this
                    demonstration build.
                  </p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <Field label="First name" required error={errors.firstName}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          name="firstName"
                          autoComplete="given-name"
                          value={details.firstName}
                          onChange={(event) => {
                            setDetails({ ...details, firstName: event.target.value })
                            setErrors({})
                          }}
                          aria-invalid={Boolean(errors.firstName)}
                          aria-describedby={errors.firstName ? describedBy : undefined}
                          className={inputClass(Boolean(errors.firstName))}
                        />
                      )}
                    </Field>

                    <Field label="Last name" required error={errors.lastName}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          name="lastName"
                          autoComplete="family-name"
                          value={details.lastName}
                          onChange={(event) => {
                            setDetails({ ...details, lastName: event.target.value })
                            setErrors({})
                          }}
                          aria-invalid={Boolean(errors.lastName)}
                          aria-describedby={errors.lastName ? describedBy : undefined}
                          className={inputClass(Boolean(errors.lastName))}
                        />
                      )}
                    </Field>

                    <Field label="Email" required error={errors.email}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={details.email}
                          onChange={(event) => {
                            setDetails({ ...details, email: event.target.value })
                            setErrors({})
                          }}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? describedBy : undefined}
                          className={inputClass(Boolean(errors.email))}
                        />
                      )}
                    </Field>

                    <Field label="Phone" hint="Optional" error={errors.phone}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={details.phone}
                          onChange={(event) => {
                            setDetails({ ...details, phone: event.target.value })
                            setErrors({})
                          }}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? describedBy : undefined}
                          className={inputClass(Boolean(errors.phone))}
                        />
                      )}
                    </Field>

                    <Field label="Country of residence" required error={errors.country}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          name="country"
                          autoComplete="country-name"
                          value={details.country}
                          onChange={(event) => {
                            setDetails({ ...details, country: event.target.value })
                            setErrors({})
                          }}
                          aria-invalid={Boolean(errors.country)}
                          aria-describedby={errors.country ? describedBy : undefined}
                          className={inputClass(Boolean(errors.country))}
                        />
                      )}
                    </Field>
                  </div>

                  <div className="mt-6">
                    <Field label="Notes for the retreat" hint="Optional — arrival time, dietary needs, a dog">
                      {({ id }) => (
                        <textarea
                          id={id}
                          name="notes"
                          rows={4}
                          value={details.notes}
                          onChange={(event) => setDetails({ ...details, notes: event.target.value })}
                          className={`${inputClass(false)} resize-y`}
                        />
                      )}
                    </Field>
                  </div>

                  <div className="mt-10 flex gap-3">
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center justify-center border border-black/25 px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 hover:bg-black hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-black px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-white transition-colors duration-300 hover:bg-forest"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              ) : null}

              {/* Step 5 — review */}
              {step === 4 ? (
                <div>
                  <h2 className="text-[20px] font-medium uppercase tracking-wide2 text-black">
                    Step 5 — Review your booking
                  </h2>

                  {room && !isRangeAvailable(room.slug, checkIn, checkOut) ? (
                    <Notice tone="draft" title="Those dates are no longer available" className="mt-6">
                      Another request has taken this room for part of your stay. Go back to step 1 to choose
                      different dates.
                    </Notice>
                  ) : null}

                  <dl className="mt-8 divide-y divide-line border-y border-line text-[14px]">
                    <div className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="text-muted">Room</dt>
                      <dd className="text-right text-black">{room ? room.name : '—'}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="text-muted">Arrival</dt>
                      <dd className="text-right text-black">
                        {formatDate(checkIn)} {room ? `· from ${room.checkIn}` : ''}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="text-muted">Departure</dt>
                      <dd className="text-right text-black">
                        {formatDate(checkOut)} {room ? `· by ${room.checkOut}` : ''}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="text-muted">Guests</dt>
                      <dd className="text-right text-black">{guests}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="text-muted">Guest</dt>
                      <dd className="text-right text-black">
                        {details.firstName} {details.lastName}
                        <span className="block text-[12px] text-muted">{details.email}</span>
                      </dd>
                    </div>
                  </dl>

                  {price ? (
                    <dl className="mt-8 space-y-3 border border-line bg-white p-6 text-[14px]">
                      <SummaryRow
                        label={`${price.nights} ${price.nights === 1 ? 'night' : 'nights'} (average ${formatCurrency(price.averageNightly)})`}
                        value={formatCurrency(price.subtotal)}
                      />
                      <SummaryRow label="Cleaning fee" value={formatCurrency(price.cleaningFee)} />
                      {price.serviceFee ? (
                        <SummaryRow label="Service fee" value={formatCurrency(price.serviceFee)} />
                      ) : null}
                      <SummaryRow
                        label="Taxes"
                        value={price.taxes === null ? 'Not configured' : formatCurrency(price.taxes)}
                        muted={price.taxes === null}
                      />
                      <div className="border-t border-line pt-4">
                        <SummaryRow label="Estimated total" value={formatCurrency(price.total)} />
                      </div>
                      {price.seasonalLabels.length ? (
                        <p className="pt-1 text-[11px] leading-[1.7] text-muted">
                          Rates applied: {price.seasonalLabels.join(' · ')}.
                        </p>
                      ) : null}
                    </dl>
                  ) : null}

                  <div className="mt-10 flex gap-3">
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center justify-center border border-black/25 px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 hover:bg-black hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={Boolean(room && !isRangeAvailable(room.slug, checkIn, checkOut))}
                      className="inline-flex items-center justify-center bg-black px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-white transition-colors duration-300 hover:bg-forest disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Continue to payment
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Step 6 — payment */}
              {step === 5 ? (
                <div>
                  <h2 className="text-[20px] font-medium uppercase tracking-wide2 text-black">
                    Step 6 — Payment and confirmation
                  </h2>

                  <Notice tone="draft" title="No payment provider configured" className="mt-6">
                    {BOOKING.paymentProvider
                      ? 'A provider is configured.'
                      : 'This website has no payment provider connected, so no card details are collected and no money is taken. Submitting below records a reservation request for the retreat to confirm — it is not a confirmed booking.'}
                  </Notice>

                  <div className="mt-8 border border-line bg-white p-6">
                    <h3 className="text-[15px] font-medium text-black">What happens next</h3>
                    <ol className="mt-4 space-y-3 text-[14px] leading-[1.85] text-muted">
                      <li>1. Your request is recorded with the details you entered.</li>
                      <li>2. The retreat checks availability and answers by email.</li>
                      <li>3. Payment is arranged directly once the stay is confirmed.</li>
                    </ol>
                  </div>

                  {errors.checkOut ? (
                    <Notice tone="draft" className="mt-6">
                      {errors.checkOut}
                    </Notice>
                  ) : null}
                  {status === 'error' ? (
                    <Notice tone="draft" className="mt-6">
                      Something went wrong recording the request. Please try again.
                    </Notice>
                  ) : null}

                  <div className="mt-10 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={status === 'submitting'}
                      className="inline-flex items-center justify-center border border-black/25 px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 hover:bg-black hover:text-white disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={submitRequest}
                      disabled={status === 'submitting' || !room || !price}
                      className="inline-flex items-center justify-center bg-black px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-white transition-colors duration-300 hover:bg-forest disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {status === 'submitting' ? 'Submitting…' : 'Submit reservation request'}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Live summary */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 border border-line bg-white p-7">
                <h2 className="label text-muted">Your selection</h2>
                <dl className="mt-5 space-y-3 text-[13px]">
                  <SummaryRow label="Arrival" value={checkIn ? formatDate(checkIn) : 'Not set'} muted={!checkIn} />
                  <SummaryRow label="Departure" value={checkOut ? formatDate(checkOut) : 'Not set'} muted={!checkOut} />
                  <SummaryRow
                    label="Nights"
                    value={nights > 0 ? `${nights}` : '—'}
                    muted={nights <= 0}
                  />
                  <SummaryRow label="Guests" value={guests || 'Not set'} muted={!guests} />
                  <SummaryRow label="Room" value={room ? room.name : 'Not set'} muted={!room} />
                  <div className="border-t border-line pt-3">
                    <SummaryRow
                      label="Estimated total"
                      value={price ? formatCurrency(price.total) : '—'}
                      muted={!price}
                    />
                  </div>
                </dl>

                {room ? (
                  <Img
                    src={room.images[0].src}
                    alt=""
                    className="mt-6 aspect-[16/10] w-full"
                  />
                ) : null}

                <p className="mt-5 text-[11px] leading-[1.7] text-muted">
                  Estimates use sample rates. Seasonal rules and taxes are applied once configured.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
