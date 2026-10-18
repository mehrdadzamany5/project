import { Link } from 'react-router-dom'
import { Icon } from './Icons.jsx'

export function EmptyState({ icon = 'bag', title, text, actionLabel, actionTo, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-line bg-white/60 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-ink-2">
        <Icon name={icon} size={22} />
      </span>
      <h3 className="mt-5 text-[19px]">{title}</h3>
      {text ? <p className="mt-2 max-w-sm text-[14px] text-ink-2">{text}</p> : null}
      {actionLabel && actionTo ? (
        <Link to={actionTo} className="btn btn-primary mt-6">
          {actionLabel}
        </Link>
      ) : null}
      {actionLabel && onAction ? (
        <button type="button" onClick={onAction} className="btn btn-quiet mt-6">
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}

/**
 * Used wherever the brand has not supplied real data or a live integration.
 * Never dresses a missing backend up as a working one.
 */
export function InfoNotice({ children, icon = 'sparkle', tone = 'neutral', className = '' }) {
  const tones = {
    neutral: 'border-line bg-sand/60 text-ink-2',
    draft: 'border-accent/25 bg-accent/[0.06] text-accent-dark',
  }
  return (
    <div
      className={`flex items-start gap-3 border px-4 py-3 text-[12.5px] leading-relaxed ${tones[tone]} ${className}`}
    >
      <Icon name={icon} size={16} className="mt-0.5 shrink-0" />
      <p>{children}</p>
    </div>
  )
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-3">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.to ? (
              <Link to={item.to} className="transition-colors hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-2">{item.label}</span>
            )}
            {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
