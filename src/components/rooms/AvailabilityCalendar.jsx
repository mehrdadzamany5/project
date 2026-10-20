import { useMemo, useState } from 'react'
import { addDays, formatMonthYear, toISODate, today } from '../../lib/format.js'
import { bookedDates } from '../../lib/booking.js'

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function startOfGrid(monthDate) {
  const first = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
  const weekday = (first.getDay() + 6) % 7 // Monday-first
  return addDays(first, -weekday)
}

/**
 * Month view of the dates already taken for a room, based on reservations
 * stored on this device. It is a demonstration calendar, not a live feed.
 */
export default function AvailabilityCalendar({ roomSlug, months = 2 }) {
  const [offset, setOffset] = useState(0)
  const taken = useMemo(() => bookedDates(roomSlug), [roomSlug])
  const first = today()

  const monthStart = new Date(first.getFullYear(), first.getMonth() + offset, 1)
  const gridStart = startOfGrid(monthStart)

  const days = Array.from({ length: 42 }, (_, i) => {
    const date = addDays(gridStart, i)
    const iso = toISODate(date)
    return {
      date,
      iso,
      inMonth: date.getMonth() === monthStart.getMonth(),
      isPast: date < first,
      isToday: iso === toISODate(first),
      isBooked: taken.has(iso),
    }
  })

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-[15px] font-medium text-black">{formatMonthYear(monthStart)}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOffset((value) => Math.max(0, value - 1))}
            disabled={offset === 0}
            aria-label="Previous month"
            className="flex h-8 w-8 items-center justify-center border border-line text-black transition-colors duration-300 hover:border-black disabled:opacity-30"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 1 3 7l6 6" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setOffset((value) => Math.min(months - 1, value + 1))}
            disabled={offset >= months - 1}
            aria-label="Next month"
            className="flex h-8 w-8 items-center justify-center border border-line text-black transition-colors duration-300 hover:border-black disabled:opacity-30"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>
      </div>

      <table className="mt-5 w-full border-collapse text-center">
        <caption className="sr-only">
          Availability for {formatMonthYear(monthStart)}. Dates marked unavailable are already reserved.
        </caption>
        <thead>
          <tr>
            {WEEKDAYS.map((day) => (
              <th key={day} scope="col" className="pb-2 text-[10px] font-medium uppercase tracking-label text-muted">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, week) => (
            <tr key={week}>
              {days.slice(week * 7, week * 7 + 7).map((day) => {
                const unavailable = day.isPast || day.isBooked
                return (
                  <td key={day.iso} className="p-0.5">
                    <span
                      className={[
                        'flex h-9 items-center justify-center text-[12px]',
                        !day.inMonth ? 'text-muted/30' : '',
                        day.isBooked ? 'bg-bronze/15 text-bronze line-through' : '',
                        day.isPast && !day.isBooked ? 'text-muted/35' : '',
                        !unavailable && day.inMonth ? 'text-black' : '',
                        day.isToday ? 'border border-black' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-label={
                        unavailable
                          ? `${day.iso} — unavailable`
                          : `${day.iso} — available`
                      }
                    >
                      {day.date.getDate()}
                    </span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-muted">
        <li className="flex items-center gap-2">
          <span className="h-3 w-3 border border-line" aria-hidden="true" /> Available
        </li>
        <li className="flex items-center gap-2">
          <span className="h-3 w-3 bg-bronze/25" aria-hidden="true" /> Already requested
        </li>
        <li className="flex items-center gap-2">
          <span className="h-3 w-3 border border-black" aria-hidden="true" /> Today
        </li>
      </ul>
    </div>
  )
}
