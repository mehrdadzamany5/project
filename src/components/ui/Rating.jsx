import { Icon } from './Icons.jsx'

export default function Rating({ value = 0, count, size = 13, showValue = true, className = '' }) {
  const filled = Math.round(value)
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span
        className="flex items-center gap-[2px] text-accent"
        role="img"
        aria-label={`Rated ${value} out of 5 stars`}
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
          {value.toFixed(1)}
          {typeof count === 'number' ? ` (${count})` : ''}
        </span>
      ) : null}
    </div>
  )
}
