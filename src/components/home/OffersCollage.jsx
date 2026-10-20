import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import Img from '../ui/Img.jsx'
import { OFFERS } from '../../data/offers.js'

function OfferBlock({ offer, className = '', aspect = 'aspect-[16/11]' }) {
  return (
    <article className={`group ${className}`}>
      <Link to={`/offers#${offer.slug}`} className="block focus-visible:outline-none">
        <Img
          src={offer.image.src}
          alt={offer.image.alt}
          className={`w-full ${aspect}`}
          imgClassName="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
        />
      </Link>

      <div className="mt-6">
        <p className="label text-bronze">{offer.kicker}</p>
        <h3 className="mt-3 text-[19px] font-medium uppercase leading-[1.3] tracking-wide2 text-black sm:text-[21px]">
          <Link to={`/offers#${offer.slug}`} className="transition-colors duration-300 hover:text-bronze">
            {offer.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-md text-[14px] leading-[1.85] text-muted">{offer.summary}</p>
        <Link
          to={`/offers#${offer.slug}`}
          className="label mt-5 inline-flex items-center gap-2 text-black transition-colors duration-300 hover:text-bronze"
        >
          Discover offer
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

export default function OffersCollage() {
  const [offerA, offerB, offerC] = OFFERS

  return (
    <section className="bg-stone py-20 sm:py-24 lg:py-28">
      <Container wide>
        <div className="max-w-2xl">
          <span className="label mb-6 flex items-center gap-3 text-muted">
            <span className="h-px w-8 bg-bronze" aria-hidden="true" />
            Offers
          </span>
          <h2 className="text-[26px] font-medium uppercase leading-[1.25] tracking-wide2 text-black sm:text-[32px]">
            Our latest special offers
          </h2>
          <p className="mt-6 text-[15px] leading-[1.85] text-muted">
            Seasonal openings and direct-booking benefits, published here first. Every offer below is
            sample content until the retreat configures its real terms.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <OfferBlock offer={offerA} className="lg:col-span-7" aspect="aspect-[16/11]" />
          <OfferBlock offer={offerB} className="lg:col-span-4 lg:col-start-9 lg:mt-24" aspect="aspect-[4/5]" />
          <OfferBlock offer={offerC} className="lg:col-span-6 lg:col-start-4 lg:-mt-12" aspect="aspect-[16/11]" />
        </div>

        <div className="mt-20 flex flex-col items-center gap-4 border-t border-black/10 pt-12">
          <p className="text-[13px] text-muted">All current offers, with their full terms.</p>
          <Link
            to="/offers"
            className="inline-flex items-center justify-center border border-black/30 px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 ease-editorial hover:bg-black hover:text-white"
          >
            View all offers
          </Link>
        </div>
      </Container>
    </section>
  )
}
