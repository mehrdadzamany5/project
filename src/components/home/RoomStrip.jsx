import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import RoomCard from '../rooms/RoomCard.jsx'
import { ROOMS } from '../../data/rooms.js'

export default function RoomStrip() {
  return (
    <section className="bg-paper py-20 sm:py-24 lg:py-28">
      <Container wide>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="label mb-5 flex items-center gap-3 text-muted">
              <span className="h-px w-8 bg-bronze" aria-hidden="true" />
              The collection
            </span>
            <h2 className="text-[26px] font-medium uppercase leading-[1.25] tracking-wide2 text-black sm:text-[32px]">
              Five ways to stay
            </h2>
          </div>
          <Link
            to="/rooms"
            className="label self-start text-black/60 transition-colors duration-300 hover:text-bronze sm:self-auto"
          >
            All rooms
          </Link>
        </div>
      </Container>

      <Container wide className="mt-12">
        <ul
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0"
          aria-label="Room collection"
        >
          {ROOMS.map((room) => (
            <li
              key={room.slug}
              className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto lg:shrink"
            >
              <RoomCard room={room} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
