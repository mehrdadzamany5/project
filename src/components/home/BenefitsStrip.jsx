import { useContent } from '../../i18n/content.js'
import { useLang } from '../../i18n/LanguageContext.jsx'
import { Icon } from '../ui/Icons.jsx'
import Reveal from '../ui/Reveal.jsx'

export default function BenefitsStrip() {
  const { BENEFITS } = useContent()
  const { t } = useLang()

  return (
    <section aria-label={t('home.whyShop')} className="border-b border-line bg-white">
      <div className="shell">
        <ul className="grid grid-cols-2 gap-y-6 py-7 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-line">
          {BENEFITS.map((benefit, index) => (
            <Reveal
              as="li"
              key={benefit.title}
              delay={index * 60}
              className="flex items-start gap-3 px-0 lg:px-7 lg:first:ps-0 lg:last:pe-0"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-accent">
                <Icon name={benefit.icon} size={17} />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-ink">{benefit.title}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-ink-2">{benefit.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
