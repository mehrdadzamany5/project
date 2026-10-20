import { Link } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Img from '../components/ui/Img.jsx'
import Notice from '../components/ui/Notice.jsx'
import { ButtonLink } from '../components/ui/Button.jsx'
import { OFFERS } from '../data/offers.js'

export default function Offers() {
  return (
    <>
      <PageHeader
        eyebrow="Offers"
        title="Special offers"
        intro="Seasonal openings and direct-booking benefits. Every offer below is sample content until the retreat configures its real terms — no discount is applied automatically."
      />

      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <Container wide>
          <div className="space-y-20 lg:space-y-24">
            {OFFERS.map((offer, index) => (
              <article
                key={offer.slug}
                id={offer.slug}
                className="scroll-mt-28 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10"
              >
                <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Img
                    src={offer.image.src}
                    alt={offer.image.alt}
                    className="aspect-[16/11] w-full"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                  />
                </div>

                <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:pl-0' : 'lg:pl-8'}`}>
                  <span className="label text-bronze">{offer.kicker}</span>
                  <h2 className="mt-4 text-[24px] font-medium uppercase leading-[1.25] tracking-wide2 text-black sm:text-[30px]">
                    {offer.title}
                  </h2>
                  <p className="mt-5 max-w-lg text-[15px] leading-[1.9] text-muted">{offer.summary}</p>

                  <h3 className="label mt-8 text-muted">What it includes</h3>
                  <ul className="mt-4 space-y-2.5">
                    {offer.terms.map((term) => (
                      <li key={term} className="flex gap-3 text-[14px] leading-[1.8] text-ink">
                        <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-bronze" />
                        {term}
                      </li>
                    ))}
                  </ul>

                  <Notice tone="draft" className="mt-7">
                    {offer.note}
                  </Notice>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink to="/booking">Check availability</ButtonLink>
                    <ButtonLink to="/contact" variant="outline">
                      Ask about this offer
                    </ButtonLink>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-24 flex flex-col items-center gap-5 border-t border-line pt-14 text-center">
            <p className="max-w-lg text-[14px] leading-[1.85] text-muted">
              Offers are applied by the retreat when it confirms your reservation. Nothing is discounted
              automatically on this site.
            </p>
            <Link
              to="/rooms"
              className="inline-flex items-center justify-center border border-black/30 px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 ease-editorial hover:bg-black hover:text-white"
            >
              Browse all rooms
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
