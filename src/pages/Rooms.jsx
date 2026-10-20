import { useMemo, useState } from 'react'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Notice from '../components/ui/Notice.jsx'
import RoomCard from '../components/rooms/RoomCard.jsx'
import { inputClass } from '../components/ui/Field.jsx'
import { AMENITIES, ROOMS, ROOM_TYPES } from '../data/rooms.js'
import { BOOKING } from '../data/site.js'
import { formatCurrency } from '../lib/format.js'

const PRICE_MAX = Math.max(...ROOMS.map((room) => room.baseRate))

const EMPTY_FILTERS = {
  query: '',
  guests: '',
  maxPrice: '',
  type: '',
  amenities: [],
}

export default function Rooms() {
  const [filters, setFilters] = useState(EMPTY_FILTERS)

  const set = (key) => (event) => setFilters((current) => ({ ...current, [key]: event.target.value }))

  const toggleAmenity = (amenity) =>
    setFilters((current) => ({
      ...current,
      amenities: current.amenities.includes(amenity)
        ? current.amenities.filter((item) => item !== amenity)
        : [...current.amenities, amenity],
    }))

  const results = useMemo(() => {
    const query = filters.query.trim().toLowerCase()
    return ROOMS.filter((room) => {
      if (query) {
        const haystack = `${room.name} ${room.type} ${room.summary}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }
      if (filters.guests && room.capacity < Number(filters.guests)) return false
      if (filters.maxPrice && room.baseRate > Number(filters.maxPrice)) return false
      if (filters.type && room.type !== filters.type) return false
      if (filters.amenities.length && !filters.amenities.every((a) => room.amenities.includes(a))) return false
      return true
    })
  }, [filters])

  const activeCount =
    (filters.query ? 1 : 0) +
    (filters.guests ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    (filters.type ? 1 : 0) +
    filters.amenities.length

  return (
    <>
      <PageHeader
        eyebrow="Rooms"
        title="Our rooms and houses"
        intro="Five places to stay, from a single-room suite to a three-bedroom residence at the treeline. Filter the collection, or browse them all."
      />

      <section className="bg-paper py-14 sm:py-16 lg:py-20">
        <Container wide>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            {/* Filters */}
            <aside className="lg:col-span-3">
              <form
                className="lg:sticky lg:top-28"
                onSubmit={(event) => event.preventDefault()}
                aria-label="Filter rooms"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="label text-muted">Filter</h2>
                  {activeCount ? (
                    <button
                      type="button"
                      onClick={() => setFilters(EMPTY_FILTERS)}
                      className="label text-bronze hover:text-black"
                    >
                      Clear ({activeCount})
                    </button>
                  ) : null}
                </div>

                <div className="mt-6 space-y-7">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="room-search" className="label text-muted">
                      Search
                    </label>
                    <input
                      id="room-search"
                      type="search"
                      value={filters.query}
                      onChange={set('query')}
                      placeholder="Room name or keyword"
                      className={inputClass(false)}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="room-guests" className="label text-muted">
                      Guests
                    </label>
                    <select id="room-guests" value={filters.guests} onChange={set('guests')} className={inputClass(false)}>
                      <option value="">Any number of guests</option>
                      {Array.from({ length: BOOKING.maxGuestsPerBooking }, (_, i) => i + 1).map((count) => (
                        <option key={count} value={count}>
                          {count} {count === 1 ? 'guest' : 'guests'} or more
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="room-price" className="label text-muted">
                      Maximum nightly rate
                    </label>
                    <select id="room-price" value={filters.maxPrice} onChange={set('maxPrice')} className={inputClass(false)}>
                      <option value="">Any rate</option>
                      {[199, 229, 249, 289, 349].map((price) => (
                        <option key={price} value={price}>
                          up to {formatCurrency(price)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <fieldset className="flex flex-col gap-2">
                    <legend className="label text-muted">Room type</legend>
                    <select
                      id="room-type"
                      value={filters.type}
                      onChange={set('type')}
                      className={inputClass(false)}
                      aria-label="Room type"
                    >
                      <option value="">All types</option>
                      {ROOM_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  <fieldset>
                    <legend className="label text-muted">Amenities</legend>
                    <ul className="mt-4 space-y-2.5">
                      {AMENITIES.map((amenity) => (
                        <li key={amenity}>
                          <label className="flex cursor-pointer items-start gap-3 text-[13px] text-ink">
                            <input
                              type="checkbox"
                              checked={filters.amenities.includes(amenity)}
                              onChange={() => toggleAmenity(amenity)}
                              className="mt-0.5 h-4 w-4 shrink-0 accent-black"
                            />
                            {amenity}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </fieldset>
                </div>

                <Notice tone="info" className="mt-8">
                  Rates are sample rates. Live availability appears once a booking system is connected.
                </Notice>
              </form>
            </aside>

            {/* Results */}
            <div className="lg:col-span-9">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-5">
                <p className="text-[14px] text-muted">
                  <span className="text-black">{results.length}</span> of {ROOMS.length} rooms
                  {filters.guests ? ` for ${filters.guests} guests` : ''}
                </p>
                <p className="text-[13px] text-muted">Rates from {formatCurrency(Math.min(...ROOMS.map((r) => r.baseRate)))}</p>
              </div>

              {results.length ? (
                <ul className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((room) => (
                    <li key={room.slug}>
                      <RoomCard room={room} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-16 border border-line bg-white p-10 text-center">
                  <h2 className="text-[18px] font-medium text-black">No rooms match those filters</h2>
                  <p className="mx-auto mt-3 max-w-sm text-[14px] leading-[1.85] text-muted">
                    Try widening the price range or removing an amenity. Some rooms only sleep two.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilters(EMPTY_FILTERS)}
                    className="mt-7 inline-flex items-center justify-center border border-black/25 px-7 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 hover:bg-black hover:text-white"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
