import { Link } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'

export default function NotFound() {
  return (
    <section className="bg-black pb-24 pt-[calc(var(--header-height)+80px)] text-white">
      <Container>
        <div className="max-w-xl">
          <span className="label mb-6 flex items-center gap-3 text-white/60">
            <span className="h-px w-8 bg-bronze" aria-hidden="true" />
            Error 404
          </span>
          <h1 className="text-[30px] font-medium uppercase leading-[1.2] tracking-wide2 sm:text-[40px]">
            This path leads nowhere
          </h1>
          <p className="mt-6 text-[15px] leading-[1.85] text-white/70">
            The page you were looking for is not here. It may have been moved, or the link may be out of
            date.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-white px-7 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 hover:bg-stone"
            >
              Back to home
            </Link>
            <Link
              to="/rooms"
              className="inline-flex items-center justify-center border border-white/40 px-7 py-3.5 text-[11px] font-medium uppercase tracking-label text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              Browse rooms
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
