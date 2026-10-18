import { Link } from 'react-router-dom'
import { useContent } from '../../i18n/content.js'
import { useLang } from '../../i18n/LanguageContext.jsx'
import { Icon } from '../ui/Icons.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Photo } from '../ui/SmartImage.jsx'

export default function CollectionBanners() {
  const { COLLECTION_BANNERS } = useContent()
  const { t } = useLang()

  return (
    <section aria-label={t('hero.carousel')} className="pb-4">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-7">
          {COLLECTION_BANNERS.map((banner, index) => (
            <Reveal key={banner.id} delay={index * 90}>
              <article className="group relative overflow-hidden bg-sand">
                <div className="relative h-[380px] sm:h-[420px] lg:h-[460px]">
                  <Photo
                    id={banner.image}
                    alt={banner.alt}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    widths={[600, 900, 1200]}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="eyebrow text-white/75">{banner.eyebrow}</p>
                  <h3 className="mt-2 max-w-sm text-[22px] text-white sm:text-[26px]">
                    {banner.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-white/85">
                    {banner.text}
                  </p>
                  <Link
                    to={banner.to}
                    className="mt-5 inline-flex items-center gap-2 border border-white/60 px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-ink"
                  >
                    {banner.cta}
                    <Icon name="arrow-right" size={15} className="rtl:rotate-180" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
