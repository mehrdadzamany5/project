import { useContent } from '../../i18n/content.js'
import { useLang } from '../../i18n/LanguageContext.jsx'
import { Icon } from '../ui/Icons.jsx'
import Reveal from '../ui/Reveal.jsx'

export default function ValuesStrip() {
  const { BRAND_VALUES } = useContent()
  const { t } = useLang()

  return (
    <section aria-label={t('home.brandValues')} className="border-y border-line bg-white">
      <div className="shell">
        <ul className="grid grid-cols-2 gap-y-7 py-8 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-line">
          {BRAND_VALUES.map((value, index) => (
            <Reveal
              as="li"
              key={value.title}
              delay={index * 55}
              className="flex items-start gap-3 px-0 lg:px-7 lg:first:ps-0 lg:last:pe-0"
            >
              <span className="mt-0.5 text-accent">
                <Icon name={value.icon} size={22} strokeWidth={1.3} />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-ink">{value.title}</p>
                <p className="mt-0.5 text-[12px] text-ink-2">{value.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
