import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import Img from '../ui/Img.jsx'
import Notice from '../ui/Notice.jsx'
import { formatCurrency } from '../../lib/format.js'

/** Featured room: large architectural photograph beside a clean text panel. */
export default function FeaturedRoom({ room }) {
  if (!room) return null

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-shell grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Img
            src={room.images[0].src}
            alt={room.images[0].alt}
            className="h-full min-h-[320px] w-full lg:min-h-[600px]"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>

        <div className="flex items-center lg:col-span-5">
          <div className="w-full px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-20">
            <span className="label mb-6 flex items-center gap-3 text-muted">
              <span className="h-px w-8 bg-bronze" aria-hidden="true" />
              Featured room
            </span>

            <h2 className="text-[28px] font-medium uppercase leading-[1.2] tracking-wide2 text-black sm:text-[34px]">
              {room.name}
            </h2>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[24px] font-light text-black">
                {formatCurrency(room.baseRate)}
              </span>
              <span className="label text-muted">/ per night</span>
            </p>

            <p className="mt-6 max-w-md text-[15px] leading-[1.9] text-muted">{room.summary}</p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-6 text-[13px]">
              <div>
                <dt className="label text-muted">Sleeps</dt>
                <dd className="mt-1.5 text-black">{room.capacity} guests</dd>
              </div>
              <div>
                <dt className="label text-muted">Bed</dt>
                <dd className="mt-1.5 text-black">{room.beds}</dd>
              </div>
              <div>
                <dt className="label text-muted">Check-in</dt>
                <dd className="mt-1.5 text-black">from {room.checkIn}</dd>
              </div>
              <div>
                <dt className="label text-muted">Check-out</dt>
                <dd className="mt-1.5 text-black">by {room.checkOut}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={`/rooms/${room.slug}`}
                className="inline-flex items-center justify-center bg-black px-7 py-3.5 text-[11px] font-medium uppercase tracking-label text-white transition-colors duration-300 ease-editorial hover:bg-forest"
              >
                View room
              </Link>
              <Link
                to={`/booking?room=${room.slug}`}
                className="inline-flex items-center justify-center border border-black/25 px-7 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 ease-editorial hover:border-black hover:bg-black hover:text-white"
              >
                Check availability
              </Link>
            </div>

            <Notice tone="info" className="mt-8">
              <strong className="font-medium text-black">Sample rate.</strong> {formatCurrency(room.baseRate)} per
              night is illustrative until real pricing and seasonal rules are configured.
            </Notice>
          </div>
        </div>
      </div>
    </section>
  )
}
