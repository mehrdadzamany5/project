import { Link } from 'react-router-dom'
import { P } from '../data/images.js'
import { BRAND_VALUES } from '../data/content.js'
import { Icon } from '../components/ui/Icons.jsx'
import { Photo } from '../components/ui/SmartImage.jsx'

const PRINCIPLES = [
  {
    title: 'Honest materials',
    text: 'Solid timber, natural fibres and stone. Nothing veneered to look like something it is not.',
  },
  {
    title: 'Repairable by design',
    text: 'Bolted joinery, replaceable covers and finishes that can be refreshed at home rather than replaced.',
  },
  {
    title: 'Quiet proportions',
    text: 'Low, generous and unfussy — furniture that leaves the room feeling larger, not busier.',
  },
]

export default function About() {
  return (
    <>
      <section className="relative">
        <div className="relative h-[340px] overflow-hidden bg-sand sm:h-[420px] lg:h-[500px]">
          <Photo
            id={P.storyCraft}
            alt="Hand tools laid out for furniture making"
            priority
            sizes="100vw"
            widths={[800, 1200, 1600]}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5"
          />
          <div className="absolute inset-x-0 bottom-0">
            <div className="shell pb-10">
              <p className="eyebrow text-white/75">Our story</p>
              <h1 className="mt-2 max-w-2xl text-[30px] text-white sm:text-[40px] lg:text-[46px]">
                Furniture made slowly, for lives lived well
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="shell py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow">Philosophy</p>
            <h2 className="mt-3 text-[24px] sm:text-[28px]">Design that gets out of the way</h2>
          </div>
          <div className="space-y-4 text-[14.5px] leading-relaxed text-ink-2">
            <p>
              Nordic Living began with a simple frustration: most furniture is designed to be
              photographed, not lived with. We wanted the opposite — pieces that are comfortable on
              the first evening and still right a decade later.
            </p>
            <p>
              Everything starts with the material. If a timber or textile cannot take daily use and
              improve with it, it does not make it into the collection. That constraint shapes the
              proportions, the finishes and, honestly, the price.
            </p>
            <p>
              We work with a small number of long-standing workshops in Denmark, Germany and Poland,
              all audited annually, all paid on standard terms. Small runs, made properly.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <article key={principle.title} className="border border-line bg-white p-7">
              <span className="text-accent">
                <Icon name="sparkle" size={20} />
              </span>
              <h3 className="mt-5 text-[16px] font-medium">{principle.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{principle.text}</p>
            </article>
          ))}
        </div>
      </div>

      <section id="materials" className="border-y border-line bg-white py-14 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="img-box relative min-h-[280px] overflow-hidden">
            <Photo
              id={P.editorialDetail}
              alt="Woven textile detail in a warm neutral interior"
              sizes="(min-width: 1024px) 45vw, 100vw"
              widths={[600, 900, 1200]}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Our materials</p>
            <h2 className="mt-3 text-[24px] sm:text-[28px]">What we build with</h2>
            <dl className="mt-7 space-y-6">
              <div>
                <dt className="text-[14px] font-semibold text-ink">European oak &amp; beech</dt>
                <dd className="mt-1 text-[13.5px] leading-relaxed text-ink-2">
                  FSC-certified, sourced from managed forests in Germany, Denmark and Poland.
                  Finished with hard-wax oil or water-based lacquer.
                </dd>
              </div>
              <div>
                <dt className="text-[14px] font-semibold text-ink">Linen &amp; wool textiles</dt>
                <dd className="mt-1 text-[13.5px] leading-relaxed text-ink-2">
                  Heavyweight linen blends of at least 72% linen, and undyed wool where durability
                  matters more than drape.
                </dd>
              </div>
              <div>
                <dt className="text-[14px] font-semibold text-ink">Stoneware &amp; ceramics</dt>
                <dd className="mt-1 text-[13.5px] leading-relaxed text-ink-2">
                  Hand-thrown in small batches with food-safe matte glazes. Every piece varies
                  slightly, which is the point.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="sustainability" className="py-14 lg:py-20">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Sustainability</p>
            <h2 className="mt-3 text-[24px] sm:text-[28px]">Better homes, a brighter planet</h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink-2">
              We are not claiming to be carbon neutral, because we are not. Here is what we actually
              do, and what is still missing.
            </p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BRAND_VALUES.map((value) => (
              <li key={value.title} className="border-t border-line pt-5">
                <span className="text-olive">
                  <Icon name={value.icon} size={22} strokeWidth={1.3} />
                </span>
                <p className="mt-4 text-[14px] font-semibold text-ink">{value.title}</p>
                <p className="mt-1 text-[13px] text-ink-2">{value.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 max-w-3xl border border-line bg-white p-6">
            <h3 className="text-[15px] font-semibold">What is still missing</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
              We do not yet publish a verified product-level carbon footprint, and our packaging is
              plastic-free for furniture but not for every small accessory. Both are on the roadmap —
              we would rather say so than round up.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-sand/60 py-14 lg:py-16">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-[22px] sm:text-[26px]">Ready to see the collection?</h2>
            <p className="mt-2 text-[14px] text-ink-2">
              Browse every piece, or read the journal for styling ideas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop" className="btn btn-primary">
              Shop all products
            </Link>
            <Link to="/journal" className="btn btn-outline">
              Read the journal
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
