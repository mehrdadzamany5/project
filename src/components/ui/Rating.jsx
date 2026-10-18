import { useLang } from '../../i18n/LanguageContext.jsx'
import { formatNumber } from '../../lib/format.js'
import { Icon } from './Icons.jsx'

export default function Rating({ value = 0, count, size = 13, showValue = true, className = '' }) {
  const { t, lang } = useLang()
  const filled = Math.round(value)
  const oneDecimal = { minimumFractionDigits: 1, maximumFractionDigits: 1 }

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span
        className="flex items-center gap-[2px] text-accent"
        role="img"
        aria-label={t('a11y.ratedOutOf5', { value: formatNumber(value, lang, oneDecimal) })}
      >
        {[1, 2, 3, 4, 5].map((index) => (
          <Icon
            key={index}
            name={index <= filled ? 'star-filled' : 'star'}
            size={size}
            strokeWidth={1.2}
          />
        ))}
      </span>
      {showValue ? (
        <span className="text-[11px] text-ink-3" aria-hidden="true">
          {formatNumber(value, lang, oneDecimal)}
          {typeof count === 'number' ? ` (${formatNumber(count, lang)})` : ''}
        </span>
      ) : null}
    </div>
  )
}
