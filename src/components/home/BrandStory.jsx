import { Link } from 'react-router-dom'
import { P } from '../../data/images.js'
import { useContent } from '../../i18n/content.js'
import { useLang } from '../../i18n/LanguageContext.jsx'
import { Icon } from '../ui/Icons.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Photo } from '../ui/SmartImage.jsx'

export default function BrandStory() {
  const { SUSTAINABILITY_POINTS } = useContent()
  const { t } = useLang()

  return (
    <section id="sustainability" className="section pt-0">
      <div className="shell">
        <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr_1fr] lg:gap-6">
          <Reveal className="relative min-h-[300px] overflow-hidden bg-sand lg:min-h-[520px]">
            <Photo
              id={P.editorialDining}
              alt={t('alt.brandStory')}
              sizes="(min-width: 1024px) 34vw, 100vw"
              widths={[600, 900, 1200]}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </Reveal>

          <Reveal
            delay={80}
            className="flex flex-col justify-center bg-white px-7 py-10 lg:px-10 lg:py-12"
          >
            <p className="eyebrow text-accent">{t('home.brandEyebrow')}</p>
            <h2 className="mt-3 text-[26px] leading-tight sm:text-[30px]">{t('home.brandTitle')}</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-2">{t('home.brandText')}</p>
            <Link
              to="/about"
              className="group mt-7 inline-flex w-fit items-center gap-2 border-b border-ink pb-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {t('home.ourStory')}
              <Icon
                name="arrow-right"
                size={15}
                className="transition-transform duration-300 ease-smooth group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </Link>
          </Reveal>

          <Reveal delay={140} className="flex flex-col justify-center bg-olive px-7 py-10 lg:px-9 lg:py-12">
            <h2 className="text-[22px] leading-snug text-white sm:text-[25px]">
              {t('home.betterHomes')}
            </h2>
            <ul className="mt-7 space-y-5">
              {SUSTAINABILITY_POINTS.map((point) => (
                <li key={point.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                    <Icon name={point.icon} size={16} />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-white">
                      {point.title}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-white/75">
                      {point.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
