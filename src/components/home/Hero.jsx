import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HERO_METRICS, HERO_SLIDES } from '../../data/content.js'
import { Icon } from '../ui/Icons.jsx'
import { Photo } from '../ui/SmartImage.jsx'

const AUTOPLAY_MS = 7000

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reduceMotion || paused) return undefined
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % HERO_SLIDES.length),
      AUTOPLAY_MS,
    )
    return () => window.clearInterval(timer)
  }, [reduceMotion, paused])

  const go = useCallback((next) => {
    setPaused(true)
    setIndex((current) => (next + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  const slide = HERO_SLIDES[index]

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
    >
      <div className="relative h-[540px] overflow-hidden bg-sand sm:h-[560px] lg:h-[600px]">
        {HERO_SLIDES.map((item, slideIndex) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-smooth ${
              slideIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={slideIndex !== index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${HERO_SLIDES.length}: ${item.caption}`}
          >
            <Photo
              id={item.image}
              alt={item.alt}
              priority={slideIndex === 0}
              sizes="100vw"
              widths={[800, 1200, 1600, 2000]}
              className="h-full w-full object-cover"
            />
          </div>
        ))}

        {/* Scrim keeps the editorial card legible over any photograph */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/30 lg:bg-gradient-to-r lg:from-black/55 lg:via-black/20 lg:to-transparent"
        />
      </div>

      {/* Content */}
      <div className="pointer-events-none absolute inset-0 flex items-end pb-8 lg:items-center lg:pb-0">
        <div className="shell w-full">
          <div className="pointer-events-auto w-full max-w-[430px] bg-cream/95 p-6 shadow-panel backdrop-blur-sm sm:p-8">
            <p className="eyebrow text-accent">{slide.eyebrow}</p>
            <h1
              id="hero-heading"
              className="mt-3 text-[30px] leading-[1.12] sm:text-[38px] lg:text-[44px]"
            >
              {slide.title}
            </h1>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-2">{slide.text}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to={slide.primary.to} className="btn btn-primary">
                {slide.primary.label}
              </Link>
              <Link
                to={slide.secondary.to}
                className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent"
              >
                {slide.secondary.label}
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>

            <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-5">
              {HERO_METRICS.map((metric) => (
                <div key={metric.label}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <span className="block font-display text-[16px] font-semibold text-ink">
                      {metric.value}
                    </span>
                    <span className="mt-0.5 block text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
                      {metric.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 lg:bottom-7">
        <div className="shell flex items-center justify-between gap-4">
          <div className="pointer-events-auto flex items-center gap-2" aria-hidden="true">
            {HERO_SLIDES.map((item, dotIndex) => (
              <button
                key={item.id}
                type="button"
                tabIndex={-1}
                onClick={() => go(dotIndex)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dotIndex === index ? 'w-7 bg-white' : 'w-1.5 bg-white/55 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          <div className="pointer-events-auto flex items-center gap-3">
            <span className="text-[11px] font-medium tracking-[0.16em] text-white/85 tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/45 text-white transition-colors hover:bg-white hover:text-ink"
              >
                <Icon name="chevron-left" size={16} />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/45 text-white transition-colors hover:bg-white hover:text-ink"
              >
                <Icon name="chevron-right" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Announce slide changes to assistive tech without hijacking focus */}
      <p className="sr-only" aria-live="polite">
        {`Slide ${index + 1} of ${HERO_SLIDES.length}: ${slide.caption}`}
      </p>
    </section>
  )
}
