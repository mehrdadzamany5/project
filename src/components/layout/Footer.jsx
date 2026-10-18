import { Link } from 'react-router-dom'
import { SITE } from '../../data/content.js'
import { CATEGORIES } from '../../data/products.js'
import { useStore } from '../../context/StoreContext.jsx'
import { Icon } from '../ui/Icons.jsx'

const ABOUT_LINKS = [
  { label: 'Our Story', to: '/about' },
  { label: 'Sustainability', to: '/about#sustainability' },
  { label: 'Our Materials', to: '/about#materials' },
  { label: 'Journal', to: '/journal' },
  { label: 'Contact', to: '/contact' },
]

const CARE_LINKS = [
  { label: 'Track Order', to: '/account' },
  { label: 'Returns & Exchanges', to: '/shipping-returns#returns' },
  { label: 'Shipping Info', to: '/shipping-returns' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]

const SOCIALS = [
  { key: 'instagram', label: 'Instagram', icon: 'instagram' },
  { key: 'facebook', label: 'Facebook', icon: 'facebook' },
  { key: 'pinterest', label: 'Pinterest', icon: 'pinterest' },
]

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-[13.5px] text-ink-2 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const { notify } = useStore()
  const year = new Date().getFullYear()

  const handleSocial = (label, url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
    notify(`${label} link is not configured yet`)
  }

  return (
    <footer className="mt-auto border-t border-line bg-sand/60">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div>
            <p className="font-display text-[18px] font-semibold tracking-[0.22em] text-ink">
              NORDIC LIVING
            </p>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-ink-2">{SITE.tagline}</p>

            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((social) => (
                <button
                  key={social.key}
                  type="button"
                  onClick={() => handleSocial(social.label, SITE.social[social.key])}
                  aria-label={
                    SITE.social[social.key]
                      ? `${social.label} (opens in a new tab)`
                      : `${social.label} — link not configured`
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/70 text-ink-2 transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon name={social.icon} size={16} />
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-ink-3">
              Social profiles are added once configured in site settings.
            </p>
          </div>

          <LinkColumn
            title="Shop"
            links={[
              { label: 'All Products', to: '/shop' },
              ...CATEGORIES.map((category) => ({
                label: category.name,
                to: `/category/${category.slug}`,
              })),
            ]}
          />
          <LinkColumn title="About" links={ABOUT_LINKS} />
          <LinkColumn title="Customer Care" links={CARE_LINKS} />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-[11.5px] text-ink-3 sm:flex-row">
          <p>© {year} Nordic Living. All rights reserved.</p>
          <p className="flex items-center gap-2 text-center">
            <Icon name="leaf" size={14} className="text-olive" />
            FSC-certified timber · Carbon-conscious delivery · Built to be repaired
          </p>
        </div>
      </div>
    </footer>
  )
}
