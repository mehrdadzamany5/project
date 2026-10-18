import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCatalog } from '../../i18n/catalog.js'
import { useLang } from '../../i18n/LanguageContext.jsx'
import { useStore } from '../../context/StoreContext.jsx'
import { Icon } from '../ui/Icons.jsx'
import LanguageSwitcher from '../ui/LanguageSwitcher.jsx'

function Counter({ value }) {
  return (
    <span
      className="absolute -end-1.5 -top-1.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-none text-white"
      aria-hidden="true"
    >
      {value > 99 ? '99+' : value}
    </span>
  )
}

function IconButton({ to, onClick, label, count, children }) {
  const classes =
    'relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand hover:text-accent'
  const content = (
    <>
      {children}
      {count > 0 ? <Counter value={count} /> : null}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={classes} aria-label={count > 0 ? `${label}, ${count}` : label}>
        {content}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={classes} aria-label={label}>
      {content}
    </button>
  )
}

export default function Header() {
  const { cartCount, wishlist } = useStore()
  const { CATEGORIES } = useCatalog()
  const { t } = useLang()
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef(null)

  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  const SHOP_MENU = [
    { label: t('nav.allProducts'), to: '/shop' },
    ...CATEGORIES.map((category) => ({ label: category.name, to: `/category/${category.slug}` })),
  ]

  const COLLECTION_MENU = [
    { label: t('nav.modernLivingRoom'), to: '/category/living-room' },
    { label: t('nav.restfulBedroom'), to: '/category/bedroom' },
    { label: t('nav.gatherDine'), to: '/category/dining-room' },
    { label: t('nav.newArrivals'), to: '/shop?sort=newest' },
    { label: t('nav.bestsellers'), to: '/shop?sort=rating' },
  ]

  const NAV = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.shop'), to: '/shop', menu: SHOP_MENU },
    { label: t('nav.collections'), to: '/shop', menu: COLLECTION_MENU },
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.inspiration'), to: '/journal' },
    { label: t('nav.contact'), to: '/contact' },
  ]

  // Close every overlay on navigation.
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setOpenMenu(null)
      setMobileOpen(false)
      setSearchOpen(false)
    }
    const onClickAway = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) setOpenMenu(null)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onClickAway)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onClickAway)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const submitSearch = (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    setQuery('')
    setSearchOpen(false)
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b bg-cream/95 backdrop-blur transition-shadow duration-300 ${
          scrolled ? 'border-line shadow-[0_1px_0_rgba(36,35,31,0.04)]' : 'border-transparent'
        }`}
      >
        <div className="shell">
          <div
            className={`flex items-center justify-between gap-3 transition-all duration-300 ${
              scrolled ? 'h-[62px]' : 'h-[72px]'
            }`}
          >
            {/* Brand */}
            <Link to="/" className="flex shrink-0 flex-col leading-none" aria-label={t('header.home')}>
              <span className="font-display text-[17px] font-semibold tracking-[0.22em] text-ink sm:text-[19px]">
                NORDIC LIVING
              </span>
              <span className="mt-1 hidden text-[10px] uppercase tracking-[0.24em] text-ink-3 sm:block">
                {t('header.tagline')}
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav ref={navRef} aria-label={t('header.mainNav')} className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV.map((item) => (
                  <li key={item.label} className="relative">
                    {item.menu ? (
                      <div
                        className="flex items-center"
                        onMouseEnter={() => setOpenMenu(item.label)}
                        onMouseLeave={() => setOpenMenu((current) => (current === item.label ? null : current))}
                      >
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `px-3 py-2 text-[13px] tracking-[0.04em] transition-colors hover:text-accent ${
                              isActive ? 'text-accent' : 'text-ink'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu((current) => (current === item.label ? null : item.label))
                          }
                          aria-expanded={openMenu === item.label}
                          aria-haspopup="true"
                          aria-controls={`nav-menu-${item.label}`}
                          aria-label={t('header.menu', { label: item.label })}
                          className="-ms-2 flex h-8 w-6 items-center justify-center text-ink-3 transition-colors hover:text-accent"
                        >
                          <Icon name="chevron-down" size={13} />
                        </button>

                        <div
                          id={`nav-menu-${item.label}`}
                          role="menu"
                          aria-label={t('header.submenu', { label: item.label })}
                          className={`absolute start-0 top-full w-60 origin-top-left border border-line bg-white py-2 shadow-lift transition-all duration-200 ease-smooth ${
                            openMenu === item.label
                              ? 'visible translate-y-0 opacity-100'
                              : 'invisible -translate-y-1 opacity-0'
                          }`}
                        >
                          {item.menu.map((entry) => (
                            <Link
                              key={entry.label}
                              to={entry.to}
                              role="menuitem"
                              className="block px-4 py-2 text-[13px] text-ink-2 transition-colors hover:bg-cream hover:text-accent"
                            >
                              {entry.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) =>
                          `block px-3 py-2 text-[13px] tracking-[0.04em] transition-colors hover:text-accent ${
                            isActive ? 'text-accent' : 'text-ink'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Utilities */}
            <div className="flex items-center gap-0.5">
              <LanguageSwitcher className="me-1" />
              <IconButton onClick={() => setSearchOpen((open) => !open)} label={t('header.searchProducts')}>
                <Icon name="search" size={19} />
              </IconButton>
              <div className="hidden sm:block">
                <IconButton to="/account" label={t('header.account')}>
                  <Icon name="user" size={19} />
                </IconButton>
              </div>
              <div className="hidden sm:block">
                <IconButton to="/wishlist" label={t('header.wishlist')} count={wishlist.length}>
                  <Icon name="heart" size={19} />
                </IconButton>
              </div>
              <IconButton to="/cart" label={t('header.bag')} count={cartCount}>
                <Icon name="bag" size={19} />
              </IconButton>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label={t('header.openMenu')}
                aria-expanded={mobileOpen}
                className="ms-1 flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand lg:hidden"
              >
                <Icon name="menu" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Search panel */}
        <div
          className={`overflow-hidden border-line bg-white transition-[max-height,opacity] duration-300 ease-smooth ${
            searchOpen ? 'max-h-40 border-t opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="shell py-4">
            <form onSubmit={submitSearch} role="search" className="flex items-center gap-3">
              <label htmlFor="header-search" className="sr-only">
                {t('header.searchProducts')}
              </label>
              <Icon name="search" size={18} className="text-ink-3" />
              <input
                id="header-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('header.searchPlaceholder')}
                className="h-10 flex-1 border-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3"
                autoComplete="off"
              />
              <button type="submit" className="btn btn-primary">
                {t('header.search')}
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('header.siteMenu')}
          className={`absolute inset-y-0 end-0 flex w-[88%] max-w-sm flex-col bg-cream shadow-panel transition-transform duration-300 ease-smooth ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <span className="font-display text-[15px] font-semibold tracking-[0.2em]">
              NORDIC LIVING
            </span>
            <div className="flex items-center gap-2">
              <LanguageSwitcher size="sm" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={t('header.closeMenu')}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
              >
                <Icon name="close" size={19} />
              </button>
            </div>
          </div>

          <nav aria-label={t('header.mobileNav')} className="flex-1 overflow-y-auto px-5 py-5">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `block py-2.5 font-display text-[17px] transition-colors ${
                        isActive ? 'text-accent' : 'text-ink'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-8">{t('header.shopByCategory')}</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="block py-1.5 text-[13.5px] text-ink-2 transition-colors hover:text-accent"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-line px-5 py-4">
            <div className="flex items-center gap-2">
              <Link to="/wishlist" className="btn btn-quiet flex-1">
                {t('header.wishlistCount', { count: wishlist.length })}
              </Link>
              <Link to="/cart" className="btn btn-primary flex-1">
                {t('header.bagCount', { count: cartCount })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
