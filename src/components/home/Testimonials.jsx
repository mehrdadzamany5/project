import { useState } from 'react'
import Container from '../ui/Container.jsx'
import { TESTIMONIALS } from '../../data/testimonials.js'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const total = TESTIMONIALS.length
  const active = TESTIMONIALS[index]

  const go = (next) => setIndex((next + total) % total)

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="label mb-6 inline-flex items-center gap-3 text-muted">
            <span className="h-px w-8 bg-bronze" aria-hidden="true" />
            Guests
          </span>
          <h2 className="text-[26px] font-medium uppercase leading-[1.25] tracking-wide2 text-black sm:text-[32px]">
            What our guests say
          </h2>
          <p className="mt-5 text-[15px] leading-[1.85] text-muted">
            Notes left in the visitors’ book, and the things people mention most often when they leave.
          </p>
        </div>

        <div
          className="mx-auto mt-14 max-w-3xl text-center"
          aria-roledescription="carousel"
          aria-label="Guest reviews"
        >
          <span
            aria-hidden="true"
            className="block font-display text-[72px] leading-[0.5] text-bronze/60 sm:text-[96px]"
          >
            &ldquo;
          </span>

          <blockquote aria-live="polite" className="mt-8">
            <p className="font-display text-[22px] font-light leading-[1.6] text-ink sm:text-[27px]">
              {active.quote}
            </p>
            <footer className="mt-8">
              <p className="label text-black/70">{active.name}</p>
              <p className="mt-2 text-[12px] text-muted">
                {active.verified ? 'Verified booking' : active.detail}
              </p>
            </footer>
          </blockquote>

          <span className="mx-auto mt-10 block h-px w-12 bg-bronze" aria-hidden="true" />

          {total > 1 ? (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous review"
                className="flex h-9 w-9 items-center justify-center border border-line text-black transition-colors duration-300 hover:border-black"
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M9 1 3 7l6 6" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>

              <div className="flex items-center gap-2" role="tablist" aria-label="Choose a review">
                {TESTIMONIALS.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={itemIndex === index}
                    aria-label={`Review ${itemIndex + 1} of ${total}`}
                    onClick={() => setIndex(itemIndex)}
                    className="flex h-6 items-center"
                  >
                    <span
                      className={`block h-px transition-all duration-500 ease-editorial ${
                        itemIndex === index ? 'w-9 bg-black' : 'w-5 bg-line'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next review"
                className="flex h-9 w-9 items-center justify-center border border-line text-black transition-colors duration-300 hover:border-black"
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </div>
          ) : null}

          <p className="mt-8 text-[12px] text-muted">
            Sample reviews shown for demonstration — not verified customer data.
          </p>
        </div>
      </Container>
    </section>
  )
}
