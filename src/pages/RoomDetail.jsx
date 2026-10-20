import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import Img from '../components/ui/Img.jsx'
import Notice from '../components/ui/Notice.jsx'
import RoomCard from '../components/rooms/RoomCard.jsx'
import AvailabilityCalendar from '../components/rooms/AvailabilityCalendar.jsx'
import Field, { inputClass } from '../components/ui/Field.jsx'
import { getRoom, relatedRooms } from '../data/rooms.js'
import { BOOKING } from '../data/site.js'
import { formatCurrency, addDays, toISODate, today } from '../lib/format.js'
import { nightsBetween, validateStay } from '../lib/booking.js'
import NotFound from './NotFound.jsx'

export default function RoomDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const room = getRoom(slug)

  const [activeImage, setActiveImage] = useState(0)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')
  const [errors, setErrors] = useState({})

  const related = useMemo(() => (room ? relatedRooms(room.slug, 3) : []), [room])

  if (!room) return <NotFound />

  const minDate = toISODate(addDays(today(), BOOKING.minLeadDays))
  const nights = nightsBetween(checkIn, checkOut)
  const estimate = nights > 0 ? nights * room.baseRate : 0

  const onCheck = (event) => {
    event.preventDefault()
    const { valid, errors: nextErrors } = validateStay({ room, checkIn, checkOut, guests })
    setErrors(nextErrors)
    if (!valid) return

    const params = new URLSearchParams({
      room: room.slug,
      checkIn,
      checkOut,
      guests,
    })
    navigate(`/booking?${params.toString()}`)
  }

  return (
    <>
      <header className="bg-black pb-12 pt-[calc(var(--header-height)+48px)] text-white sm:pb-14 sm:pt-[calc(var(--header-height)+64px)]">
        <Container wide>
          <nav aria-label="Breadcrumb" className="label mb-8 flex flex-wrap items-center gap-3 text-white/50">
            <Link to="/rooms" className="transition-colors duration-300 hover:text-white">
              Rooms
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80">{room.name}</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="label mb-4 text-white/55">{room.type}</p>
              <h1 className="text-[30px] font-medium uppercase leading-[1.15] tracking-wide2 sm:text-[42px]">
                {room.name}
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.85] text-white/70">{room.summary}</p>
            </div>
            <div className="shrink-0 lg:text-right">
              <p className="text-[26px] font-light">{formatCurrency(room.baseRate)}</p>
              <p className="label mt-1 text-white/55">per night</p>
            </div>
          </div>
        </Container>
      </header>

      <section className="bg-paper py-14 sm:py-16 lg:py-20">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              {/* Gallery */}
              <div>
                <Img
                  src={room.images[activeImage].src}
                  alt={room.images[activeImage].alt}
                  className="aspect-[16/10] w-full"
                  priority
                  sizes="(max-width: 1024px) 100vw, 62vw"
                />
                <ul className="mt-3 grid grid-cols-4 gap-3">
                  {room.images.map((image, index) => (
                    <li key={image.src}>
                      <button
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`Show image ${index + 1}: ${image.alt}`}
                        aria-current={index === activeImage}
                        className={`block w-full border transition-colors duration-300 ${
                          index === activeImage ? 'border-black' : 'border-transparent hover:border-line'
                        }`}
                      >
                        <Img src={image.src} alt="" className="aspect-[4/3] w-full" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Facts */}
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-8 sm:grid-cols-4">
                <div>
                  <dt className="label text-muted">Sleeps</dt>
                  <dd className="mt-2 text-[15px] text-black">{room.capacity} guests</dd>
                </div>
                <div>
                  <dt className="label text-muted">Beds</dt>
                  <dd className="mt-2 text-[15px] text-black">{room.beds}</dd>
                </div>
                <div>
                  <dt className="label text-muted">Size</dt>
                  <dd className="mt-2 text-[15px] text-black">{room.size} m²</dd>
                </div>
                <div>
                  <dt className="label text-muted">Type</dt>
                  <dd className="mt-2 text-[15px] text-black">{room.type}</dd>
                </div>
                <div>
                  <dt className="label text-muted">Check-in</dt>
                  <dd className="mt-2 text-[15px] text-black">from {room.checkIn}</dd>
                </div>
                <div>
                  <dt className="label text-muted">Check-out</dt>
                  <dd className="mt-2 text-[15px] text-black">by {room.checkOut}</dd>
                </div>
                <div>
                  <dt className="label text-muted">Cleaning</dt>
                  <dd className="mt-2 text-[15px] text-black">{formatCurrency(room.cleaningFee)} per stay</dd>
                </div>
                <div>
                  <dt className="label text-muted">Minimum stay</dt>
                  <dd className="mt-2 text-[15px] text-black">
                    {BOOKING.minNights} {BOOKING.minNights === 1 ? 'night' : 'nights'}
                  </dd>
                </div>
              </dl>

              <div className="mt-12">
                <h2 className="text-[19px] font-medium uppercase tracking-wide2 text-black">The room</h2>
                <p className="mt-5 max-w-2xl text-[15px] leading-[1.95] text-muted">{room.description}</p>
              </div>

              <div className="mt-12">
                <h2 className="text-[19px] font-medium uppercase tracking-wide2 text-black">Amenities</h2>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {room.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="border border-line bg-white px-3.5 py-2 text-[12px] text-ink"
                    >
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12">
                <h2 className="text-[19px] font-medium uppercase tracking-wide2 text-black">
                  Availability
                </h2>
                <p className="mt-4 max-w-2xl text-[14px] leading-[1.85] text-muted">
                  Dates already requested for this room are shown below. Availability is checked again when
                  you review a booking.
                </p>
                <div className="mt-7 max-w-md border border-line bg-white p-6">
                  <AvailabilityCalendar roomSlug={room.slug} />
                </div>
              </div>
            </div>

            {/* Booking panel */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <form onSubmit={onCheck} noValidate className="border border-line bg-white p-7">
                  <h2 className="text-[17px] font-medium uppercase tracking-wide2 text-black">
                    Check availability
                  </h2>
                  <p className="mt-2 text-[13px] text-muted">
                    From {formatCurrency(room.baseRate)} per night · sample rate
                  </p>

                  <div className="mt-7 space-y-5">
                    <Field label="Arrival" required error={errors.checkIn}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          name="checkIn"
                          type="date"
                          value={checkIn}
                          min={minDate}
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

                    <Field label="Guests" required error={errors.guests}>
                      {({ id, describedBy }) => (
                        <select
                          id={id}
                          name="guests"
                          value={guests}
                          onChange={(event) => {
                            setGuests(event.target.value)
                            setErrors({})
                          }}
                          aria-invalid={Boolean(errors.guests)}
                          aria-describedby={errors.guests ? describedBy : undefined}
                          className={inputClass(Boolean(errors.guests))}
                        >
                          {Array.from({ length: room.capacity }, (_, i) => i + 1).map((count) => (
                            <option key={count} value={count}>
                              {count} {count === 1 ? 'guest' : 'guests'}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                  </div>

                  {nights > 0 ? (
                    <dl className="mt-7 space-y-2 border-t border-line pt-6 text-[13px]">
                      <div className="flex justify-between">
                        <dt className="text-muted">
                          {nights} {nights === 1 ? 'night' : 'nights'} × {formatCurrency(room.baseRate)}
                        </dt>
                        <dd className="text-black">{formatCurrency(estimate)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted">Cleaning fee</dt>
                        <dd className="text-black">{formatCurrency(room.cleaningFee)}</dd>
                      </div>
                      <div className="flex justify-between border-t border-line pt-3">
                        <dt className="text-black">Estimated total</dt>
                        <dd className="text-black">{formatCurrency(estimate + room.cleaningFee)}</dd>
                      </div>
                      <p className="pt-1 text-[11px] leading-[1.7] text-muted">
                        Indicative only. Seasonal rates are applied on the booking page, and taxes are not
                        configured.
                      </p>
                    </dl>
                  ) : null}

                  <button
                    type="submit"
                    className="mt-7 inline-flex w-full items-center justify-center bg-black px-7 py-3.5 text-[11px] font-medium uppercase tracking-label text-white transition-colors duration-300 ease-editorial hover:bg-forest"
                  >
                    Continue to booking
                  </button>

                  <Link
                    to="/contact"
                    className="label mt-5 flex items-center justify-center text-black/60 transition-colors duration-300 hover:text-bronze"
                  >
                    Ask a question first
                  </Link>
                </form>

                <Notice tone="info" className="mt-6">
                  Sample rate of {formatCurrency(room.baseRate)} per night. Seasonal pricing rules apply once
                  configured.
                </Notice>
              </div>
            </aside>
          </div>

          {/* Related rooms */}
          <div className="mt-24 border-t border-line pt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[22px] font-medium uppercase tracking-wide2 text-black">
                Other places to stay
              </h2>
              <Link
                to="/rooms"
                className="label text-black/60 transition-colors duration-300 hover:text-bronze"
              >
                All rooms
              </Link>
            </div>
            <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <RoomCard room={item} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  )
}
