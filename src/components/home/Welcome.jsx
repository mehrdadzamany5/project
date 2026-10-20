import Container from '../ui/Container.jsx'
import Img from '../ui/Img.jsx'
import { ButtonLink } from '../ui/Button.jsx'

export default function Welcome() {
  return (
    <section className="bg-paper py-20 sm:py-24 lg:py-32">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Editorial text */}
          <div className="lg:col-span-5 lg:pr-10">
            <span className="label mb-6 flex items-center gap-3 text-muted">
              <span className="h-px w-8 bg-bronze" aria-hidden="true" />
              Welcome
            </span>

            <h2 className="text-[26px] font-medium uppercase leading-[1.3] tracking-wide2 text-black sm:text-[32px] lg:text-[34px]">
              Welcome to your mind.
              <br />
              Kegali homestay in forest
            </h2>

            <div className="mt-7 space-y-5 text-[15px] leading-[1.9] text-muted">
              <p>
                KEGALI is a small collection of contemporary houses set inside working forest. Each one
                was drawn around the trees that were already there, then clad in blackened timber so the
                buildings recede and the landscape stays the subject.
              </p>
              <p>
                Days here are unhurried. A long breakfast, a walk on the ridge, an afternoon with a book
                by the glass wall, and a fire lit at dusk. The architecture is deliberately quiet: warm
                concrete underfoot, deep sills, and rooms that hold the light rather than compete with it.
              </p>
              <p>
                What we offer is privacy, a well-made bed, and the sense that the forest is doing the
                entertaining.
              </p>
            </div>

            <ButtonLink to="/about" variant="outline" className="mt-9">
              Discover our story
            </ButtonLink>
          </div>

          {/* Asymmetrical image composition */}
          <div className="lg:col-span-7">
            <div className="relative">
              <Img
                src="/images/welcome-exterior.jpg"
                alt="Timber cabin standing among tall forest trees"
                className="aspect-[16/11] w-full"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="mt-4 grid grid-cols-12 gap-4">
                <Img
                  src="/images/welcome-interior.jpg"
                  alt="Kitchen and living area in dark cabinetry with natural wood"
                  className="col-span-7 aspect-[4/3] w-full"
                  sizes="(max-width: 1024px) 55vw, 33vw"
                />
                <Img
                  src="/images/welcome-detail.jpg"
                  alt="Detail of natural timber cabinetry and joinery"
                  className="col-span-5 aspect-[4/3] w-full"
                  sizes="(max-width: 1024px) 40vw, 24vw"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
