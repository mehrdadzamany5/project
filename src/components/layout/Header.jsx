import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LANGUAGES, NAV_LINKS, SOCIAL_LINKS } from '../../data/site.js'
import Logo from '../ui/Logo.jsx'
import SocialLinks from '../ui/SocialLinks.jsx'

function LanguageSelect({ tone = 'light', id }) {
  const [value, setValue] = useState('en')
  const color =
    tone === 'light'
      ? 'border-white/25 text-white/80 hover:border-white/60'
      : 'border-line text-muted hover:border-black/40'

  return (
    <div className={`relative border ${color} transition-colors duration-300`}>
      <label htmlFor={id} className="sr-only">
        Language
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="cursor-pointer appearance-none bg-transparent py-2 pl-3 pr-8 text-[10px] font-medium uppercase tracking-label outline-none"
      >
        {LANGUAGES.map((language) => (
          <option
            key={language.code}
            value={language.code}
            disabled={!language.enabled}
            className="text-ink"
          >
            {language.code}
            {language.enabled ? '' : ' — soon'}
          </option>
        ))}
      </select>
      <svg
        width="9"
        height="6"
        viewBox="0 0 9 6"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
      >
        <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    </div>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const panelRef = useRef(null)
  const toggleRef = useRef(null)

  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const solid = scrolled || !isHome || menuOpen

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-[12px] focus:uppercase focus:tracking-label focus:text-black"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-editorial ${
          solid ? 'bg-black' : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-6 px-5 sm:px-8 lg:h-[76px] lg:px-12">
          <Link to="/" className="shrink-0" aria-label="KEGALI — home">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className="text-[11px] font-medium uppercase tracking-wide2"
                  >
                    {({ isActive }) => (
                      <span
                        data-active={isActive}
                        className={`nav-link transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {link.label}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSelect tone="light" id="lang-desktop" />
            </div>
            <SocialLinks links={SOCIAL_LINKS} className="hidden xl:flex" />

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
            >
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              <span className="flex w-6 flex-col gap-[6px]" aria-hidden="true">
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ease-editorial ${
                    menuOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-opacity duration-200 ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ease-editorial ${
                    menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet navigation panel */}
      <div
        id="mobile-nav"
        ref={panelRef}
        tabIndex={-1}
        hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-black pt-16 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex h-full flex-col overflow-y-auto px-5 pb-12 pt-8 sm:px-8">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.to} className="border-b border-white/10">
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className="block py-4 text-[15px] font-medium uppercase tracking-wide2 text-white/85"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between gap-4">
            <LanguageSelect tone="light" id="lang-mobile" />
            <SocialLinks links={SOCIAL_LINKS} />
          </div>

          <Link
            to="/booking"
            className="mt-10 inline-flex w-full items-center justify-center border border-white/40 px-6 py-3 text-[11px] font-medium uppercase tracking-label text-white"
          >
            Check availability
          </Link>
        </nav>
      </div>
    </>
  )
}
