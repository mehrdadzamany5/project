import { useRef } from 'react'
import { useContent } from '../../i18n/content.js'
import { useLang } from '../../i18n/LanguageContext.jsx'
import { Icon } from '../ui/Icons.jsx'
import Rating from '../ui/Rating.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { InfoNotice } from '../ui/StateBlocks.jsx'

export default function Testimonials() {
  const { TESTIMONIALS } = useContent()
  const { t, isRtl } = useLang()
  const scrollerRef = useRef(null)

  const scrollByCard = (direction) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const card = scroller.querySelector('[data-card]')
    const amount = card ? card.getBoundingClientRect().width + 24 : scroller.clientWidth * 0.85
    // Reading order, not physical direction: in RTL "next" scrolls the other way.
    scroller.scrollBy({ left: (isRtl ? -1 : 1) * direction * amount, behavior: 'smooth' })
  }

  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow={t('home.testimonialsEyebrow')}
          title={t('home.testimonialsTitle')}
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="mt-10 flex items-end justify-between gap-4 lg:mt-12">
          <InfoNotice icon="sparkle" className="max-w-2xl">
            {t('home.testimonialsNotice')}
          </InfoNotice>

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label={t('home.prevTestimonials')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <Icon name="chevron-left" size={16} className="rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label={t('home.nextTestimonials')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <Icon name="chevron-right" size={16} className="rtl:rotate-180" />
            </button>
          </div>
        </div>

        <ul
          ref={scrollerRef}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal
              as="li"
              key={testimonial.id}
              delay={index * 70}
              data-card
              className="w-[86%] shrink-0 snap-start border border-line bg-white p-7 sm:w-[47%] lg:w-[calc((100%-3rem)/3)]"
            >
              <span className="text-accent/40">
                <Icon name="quote" size={26} strokeWidth={0} />
              </span>
              <Rating value={testimonial.rating} showValue={false} size={14} className="mt-4" />
              <blockquote className="mt-4 text-[14px] leading-relaxed text-ink-2">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-[12px] font-semibold tracking-wide text-ink-2"
                >
                  {testimonial.initials}
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-ink">
                    {testimonial.name}
                  </span>
                  <span className="block text-[11.5px] text-ink-3">{testimonial.location}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label={t('home.prevTestimonials')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
          >
            <Icon name="chevron-left" size={16} className="rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label={t('home.nextTestimonials')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
          >
            <Icon name="chevron-right" size={16} className="rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  )
}
