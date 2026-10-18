import { Link } from 'react-router-dom'
import { P } from '../../data/images.js'
import { Icon } from '../ui/Icons.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Photo } from '../ui/SmartImage.jsx'

const COLLAGE = [
  { id: P.editorialDetail, alt: 'Woven textile detail in a warm neutral interior' },
  { id: P.editorialPlant, alt: 'Indoor plant styled beside a warm timber wall' },
  { id: P.editorialVase, alt: 'Sideboard, round mirror and indoor trees' },
  { id: P.storyCraft, alt: 'Hand tools laid out for furniture making' },
]

export default function Inspiration() {
  return (
    <section className="section pt-0">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr_1fr] lg:gap-7">
          <Reveal className="relative min-h-[300px] overflow-hidden bg-sand lg:min-h-[540px]">
            <Photo
              id={P.editorialArmchair}
              alt="Living room with arched windows, a fireplace and soft armchairs"
              sizes="(min-width: 1024px) 34vw, 100vw"
              widths={[600, 900, 1200]}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </Reveal>

          <Reveal delay={80} className="flex flex-col justify-center px-0 py-4 lg:px-2 lg:py-10">
            <p className="eyebrow text-accent">Inspire your space</p>
            <h2 className="mt-3 text-[26px] leading-tight sm:text-[30px]">
              Small Changes Make a Big Difference
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-2">
              Explore creative ideas, styling tips and real homes with Nordic Living furniture — from
              a single lamp that changes an evening to a sofa that changes how a room is used.
            </p>
            <Link
              to="/journal"
              className="group mt-7 inline-flex w-fit items-center gap-2 border-b border-ink pb-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Get Inspired
              <Icon
                name="arrow-right"
                size={15}
                className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
              />
            </Link>
          </Reveal>

          <Reveal delay={140} className="flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-3">
              {COLLAGE.map((item) => (
                <div key={item.id} className="img-box group overflow-hidden">
                  <div className="aspect-square w-full overflow-hidden">
                    <Photo
                      id={item.id}
                      alt={item.alt}
                      sizes="(min-width: 1024px) 16vw, 40vw"
                      widths={[320, 480, 640]}
                      className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center font-script text-[26px] leading-none text-accent sm:text-[30px]">
              Good Design. Better Days.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
