import { Link } from 'react-router-dom'
import { SITE } from '../../data/content.js'
import { useCatalog } from '../../i18n/catalog.js'
import { useLang } from '../../i18n/LanguageContext.jsx'
import { useStore } from '../../context/StoreContext.jsx'
import { Icon } from '../ui/Icons.jsx'

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
  const { CATEGORIES } = useCatalog()
  const { t } = useLang()
  const year = new Date().getFullYear()

  const handleSocial = (label, url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
    notify(t('footer.linkNotConfigured', { label }))
  }

  const aboutLinks = [
    { label: t('footer.ourStory'), to: '/about' },
    { label: t('footer.sustainability'), to: '/about#sustainability' },
    { label: t('footer.materials'), to: '/about#materials' },
    { label: t('footer.journal'), to: '/journal' },
    { label: t('footer.contact'), to: '/contact' },
  ]

  const careLinks = [
    { label: t('footer.trackOrder'), to: '/account' },
    { label: t('footer.returnsExchanges'), to: '/shipping-returns#returns' },
    { label: t('footer.shippingInfo'), to: '/shipping-returns' },
    { label: t('footer.faqs'), to: '/faq' },
    { label: t('footer.privacy'), to: '/privacy' },
    { label: t('footer.terms'), to: '/terms' },
  ]

  const shopLinks = [
    { label: t('nav.allProducts'), to: '/shop' },
    ...CATEGORIES.map((category) => ({ label: category.name, to: `/category/${category.slug}` })),
  ]

  return (
    <footer className="mt-auto border-t border-line bg-sand/60">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div>
            <p className="font-display text-[18px] font-semibold tracking-[0.22em] text-ink">
              NORDIC LIVING
            </p>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-ink-2">
              {t('footer.tagline')}
            </p>

            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((social) => (
                <button
                  key={social.key}
                  type="button"
                  onClick={() => handleSocial(social.label, SITE.social[social.key])}
                  aria-label={
                    SITE.social[social.key]
                      ? t('footer.socialNewTab', { label: social.label })
                      : t('footer.socialUnconfigured', { label: social.label })
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/70 text-ink-2 transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon name={social.icon} size={16} />
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-ink-3">{t('footer.socialNote')}</p>
          </div>

          <LinkColumn title={t('footer.shop')} links={shopLinks} />
          <LinkColumn title={t('footer.about')} links={aboutLinks} />
          <LinkColumn title={t('footer.customerCare')} links={careLinks} />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-[11.5px] text-ink-3 sm:flex-row">
          <p>{t('footer.rights', { year })}</p>
          <p className="flex items-center gap-2 text-center">
            <Icon name="leaf" size={14} className="text-olive" />
            {t('footer.pledge')}
          </p>
        </div>
      </div>
    </footer>
  )
}
