import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'

const SLIDES = [
  {
    id: 'cabin',
    image: '/images/hero-cabin.jpg',
    alt: 'Contemporary black timber cabin standing in dense forest',
    eyebrow: 'Switch life to Kegali',
    headline: 'Sweet home for your mind',
    description:
      'Discover a private architectural retreat where forest, fire and contemporary design come together in perfect harmony.',
    primary: { label: 'Explore our rooms', to: '/rooms' },
    secondary: { label: 'Discover the experience', to: '/experiences' },
  },
  {
    id: 'interior',
    image: '/images/hero-interior.jpg',
    alt: 'Interior with a wood burning stove and full-height glazing onto the forest',
    eyebrow: 'Fire, timber and glass',
    headline: 'Evenings that slow down',
    description:
      'Full-height glazing, a hearth at the centre of the room, and the treeline doubled in the glass after dark.',
    primary: { label: 'View the rooms', to: '/rooms' },
    secondary: { label: 'The experience', to: '/experiences' },
  },
  {
    id: 'lake',
    image: '/images/hero-lake.jpg',
    alt: 'Still forest lake at first light with trees reflected in the water',
    eyebrow: 'At the water’s edge',
    headline: 'Mornings beside the lake',
    description:
      'A freestanding cabin, its own jetty and the flat light of early morning on still water.',
    primary: { label: 'Explore the Lake Cabin', to: '/rooms/lake-cabin' },
    secondary: { label: 'Our story', to: '/about' },
  },
]

const ROTATION_MS = 7000

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const regionRef = useRef(null)
  const interactedRef = useRef(false)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const go = useCallback((next) => {
    setIndex((current) => (next + SLIDES.length) % SLIDES.length)
  }, [])

  const pause = useCallback(() => {
    interactedRef.current = true
    setPaused(true)
  }, [])

  // Restrained auto-rotation, stopped by interaction and by reduced-motion.
  useEffect(() => {
    if (paused || prefersReducedMotion) return undefined
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, ROTATION_MS)
    return () => window.clearInterval(timer)
  }, [paused, prefersReducedMotion])

  // Arrow-key control while the carousel has focus.
  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      pause()
      go(index + 1)
    } else if (event.key === 'ArrowLeft') {
      pause()
      go(index - 1)
    }
  }

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Kegali in three views"
      onKeyDown={onKeyDown}
      onMouseEnter={pause}
      onFocus={pause}
      className="relative isolate h-[88svh] min-h-[540px] w-full overflow-hidden bg-black"
    >
      {SLIDES.map((slide, slideIndex) => {
        const isActive = slideIndex === index
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-editorial ${
              isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              loading={slideIndex === 0 ? 'eager' : 'lazy'}
              decoding={slideIndex === 0 ? 'sync' : 'async'}
              fetchpriority={slideIndex === 0 ? 'high' : undefined}
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" aria-hidden="true" />
          </div>
        )
      })}

      <Container wide className="relative flex h-full items-end pb-20 sm:pb-24 lg:items-center lg:pb-0">
        <div className="max-w-2xl">
          <p className="label mb-6 flex items-center gap-3 text-white/70">
            <span className="h-px w-10 bg-bronze" aria-hidden="true" />
            {SLIDES[index].eyebrow}
          </p>

          <h1
            key={SLIDES[index].id}
            className="text-[34px] font-medium uppercase leading-[1.12] tracking-wide2 text-white sm:text-[46px] lg:text-[58px]"
          >
            {SLIDES[index].headline}
          </h1>

          <p className="mt-6 max-w-lg text-[15px] leading-[1.9] text-white/75 sm:text-[16px]">
            {SLIDES[index].description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to={SLIDES[index].primary.to}
              onClick={pause}
              className="inline-flex items-center justify-center bg-white px-7 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 ease-editorial hover:bg-stone"
            >
              {SLIDES[index].primary.label}
            </Link>
            <Link
              to={SLIDES[index].secondary.to}
              onClick={pause}
              className="inline-flex items-center justify-center border border-white/45 px-7 py-3.5 text-[11px] font-medium uppercase tracking-label text-white transition-colors duration-300 ease-editorial hover:bg-white hover:text-black"
            >
              {SLIDES[index].secondary.label}
            </Link>
          </div>
        </div>
      </Container>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-6 z-10">
        <Container wide className="flex items-end justify-between gap-6">
          <div className="flex items-center gap-3" role="tablist" aria-label="Choose a slide">
            {SLIDES.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={slideIndex === index}
                aria-label={`Slide ${slideIndex + 1} of ${SLIDES.length}: ${slide.headline}`}
                onClick={() => {
                  pause()
                  go(slideIndex)
                }}
                className="group flex h-6 items-center"
              >
                <span
                  className={`block h-px transition-all duration-500 ease-editorial ${
                    slideIndex === index ? 'w-12 bg-white' : 'w-6 bg-white/40 group-hover:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                pause()
                go(index - 1)
              }}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center border border-white/30 text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 1 3 7l6 6" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => {
                pause()
                go(index + 1)
              }}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center border border-white/30 text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </Container>
      </div>
    </section>
  )
}
