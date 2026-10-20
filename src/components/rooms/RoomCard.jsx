import { Link } from 'react-router-dom'
import Img from '../ui/Img.jsx'
import { formatCurrency } from '../../lib/format.js'

/**
 * Room card: large landscape photograph, a dark translucent label near the top
 * carrying the room name and rate, and a gentle image zoom on hover/focus.
 */
export default function RoomCard({ room, className = '' }) {
  return (
    <article className={`group relative ${className}`}>
      <Link
        to={`/rooms/${room.slug}`}
        className="block focus-visible:outline-none"
        aria-label={`${room.name} — ${formatCurrency(room.baseRate)} per night`}
      >
        <Img
          src={room.images[0].src}
          alt={room.images[0].alt}
          className="aspect-[4/3] w-full"
          imgClassName="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <div className="bg-black/70 px-3.5 py-2.5 backdrop-blur-[2px] transition-colors duration-500 group-hover:bg-black/85">
            <h3 className="text-[12px] font-medium uppercase tracking-wide2 text-white">{room.name}</h3>
            <p className="mt-1 text-[11px] text-white/65">
              {formatCurrency(room.baseRate)} / night
            </p>
          </div>
          <span className="label bg-white/85 px-2.5 py-1.5 text-black/70">{room.type}</span>
        </div>

        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" aria-hidden="true" />
      </Link>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-4">
        <p className="text-[12px] text-muted">
          Sleeps {room.capacity} · {room.size} m²
        </p>
        <Link
          to={`/rooms/${room.slug}`}
          className="label text-black/60 transition-colors duration-300 hover:text-bronze"
        >
          View room
        </Link>
      </div>
    </article>
  )
}
