import { Link } from 'react-router-dom'
import { P } from '../data/images.js'
import { useContent } from '../i18n/content.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { Icon } from '../components/ui/Icons.jsx'
import { Photo } from '../components/ui/SmartImage.jsx'

export default function About() {
  const { ABOUT_PRINCIPLES, BRAND_VALUES } = useContent()
  const { t } = useLang()

  return (
    <>
      <section className="relative">
        <div className="relative h-[340px] overflow-hidden bg-sand sm:h-[420px] lg:h-[500px]">
          <Photo
            id={P.storyCraft}
            alt={t('about.heroAlt')}
            priority
            sizes="100vw"
            widths={[800, 1200, 1600]}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5"
          />
          <div className="absolute inset-x-0 bottom-0">
            <div className="shell pb-10">
              <p className="eyebrow text-white/75">{t('about.heroEyebrow')}</p>
              <h1 className="mt-2 max-w-2xl text-[30px] text-white sm:text-[40px] lg:text-[46px]">
                {t('about.heroTitle')}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="shell py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow">{t('about.philosophyEyebrow')}</p>
            <h2 className="mt-3 text-[24px] sm:text-[28px]">{t('about.philosophyTitle')}</h2>
          </div>
          <div className="space-y-4 text-[14.5px] leading-relaxed text-ink-2">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {ABOUT_PRINCIPLES.map((principle) => (
            <article key={principle.title} className="border border-line bg-white p-7">
              <span className="text-accent">
                <Icon name="sparkle" size={20} />
              </span>
              <h3 className="mt-5 text-[16px] font-medium">{principle.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{principle.text}</p>
            </article>
          ))}
        </div>
      </div>

      <section id="materials" className="border-y border-line bg-white py-14 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="img-box relative min-h-[280px] overflow-hidden">
            <Photo
              id={P.editorialDetail}
              alt={t('about.materialsAlt')}
              sizes="(min-width: 1024px) 45vw, 100vw"
              widths={[600, 900, 1200]}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">{t('about.materialsEyebrow')}</p>
            <h2 className="mt-3 text-[24px] sm:text-[28px]">{t('about.materialsTitle')}</h2>
            <dl className="mt-7 space-y-6">
              <div>
                <dt className="text-[14px] font-semibold text-ink">{t('about.oakTitle')}</dt>
                <dd className="mt-1 text-[13.5px] leading-relaxed text-ink-2">
                  {t('about.oakText')}
                </dd>
              </div>
              <div>
                <dt className="text-[14px] font-semibold text-ink">{t('about.linenTitle')}</dt>
                <dd className="mt-1 text-[13.5px] leading-relaxed text-ink-2">
                  {t('about.linenText')}
                </dd>
              </div>
              <div>
                <dt className="text-[14px] font-semibold text-ink">{t('about.stonewareTitle')}</dt>
                <dd className="mt-1 text-[13.5px] leading-relaxed text-ink-2">
                  {t('about.stonewareText')}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="sustainability" className="py-14 lg:py-20">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">{t('about.sustainabilityEyebrow')}</p>
            <h2 className="mt-3 text-[24px] sm:text-[28px]">{t('about.sustainabilityTitle')}</h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink-2">
              {t('about.sustainabilityText')}
            </p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BRAND_VALUES.map((value) => (
              <li key={value.title} className="border-t border-line pt-5">
                <span className="text-olive">
                  <Icon name={value.icon} size={22} strokeWidth={1.3} />
                </span>
                <p className="mt-4 text-[14px] font-semibold text-ink">{value.title}</p>
                <p className="mt-1 text-[13px] text-ink-2">{value.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 max-w-3xl border border-line bg-white p-6">
            <h3 className="text-[15px] font-semibold">{t('about.missingTitle')}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
              {t('about.missingText')}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-sand/60 py-14 lg:py-16">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-[22px] sm:text-[26px]">{t('about.ctaTitle')}</h2>
            <p className="mt-2 text-[14px] text-ink-2">{t('about.ctaText')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop" className="btn btn-primary">
              {t('about.shopAll')}
            </Link>
            <Link to="/journal" className="btn btn-outline">
              {t('about.readJournal')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
