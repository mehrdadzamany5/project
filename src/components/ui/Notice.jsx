const TONES = {
  info: 'border-line bg-paper text-ink',
  draft: 'border-bronze/50 bg-bronze/10 text-ink',
  dark: 'border-white/15 bg-white/5 text-white/80',
}

export default function Notice({ tone = 'info', title, children, className = '' }) {
  return (
    <div className={`border px-4 py-3 text-[13px] leading-[1.7] ${TONES[tone] || TONES.info} ${className}`}>
      {title ? <p className="label mb-1.5">{title}</p> : null}
      <div>{children}</div>
    </div>
  )
}
