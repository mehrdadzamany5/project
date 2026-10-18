import { useLang } from '../../i18n/LanguageContext.jsx'

/**
 * Compact EN / FA segmented control. Language lives in its own storage key, so
 * switching never touches the cart, wishlist or any other user state.
 */
export default function LanguageSwitcher({ className = '', size = 'md' }) {
  const { lang, setLang, t } = useLang()

  const options = [
    { code: 'en', short: t('lang.enShort'), full: t('lang.en') },
    { code: 'fa', short: t('lang.faShort'), full: t('lang.fa') },
  ]

  const pad = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]'

  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className={`inline-flex shrink-0 items-center rounded-full border border-line bg-white/70 p-0.5 ${className}`}
    >
      {options.map((option) => {
        const active = lang === option.code
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={active}
            aria-label={option.full}
            className={`rounded-full font-semibold tracking-[0.08em] transition-colors ${pad} ${
              active ? 'bg-accent-dark text-white' : 'text-ink-2 hover:text-ink'
            }`}
          >
            {option.short}
          </button>
        )
      })}
    </div>
  )
}
