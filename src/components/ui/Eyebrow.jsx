export default function Eyebrow({ children, tone = 'dark', className = '' }) {
  return (
    <span
      className={`label flex items-center gap-3 ${
        tone === 'light' ? 'text-white/75' : 'text-muted'
      } ${className}`}
    >
      <span className={`h-px w-8 ${tone === 'light' ? 'bg-bronze' : 'bg-bronze'}`} aria-hidden="true" />
      {children}
    </span>
  )
}
