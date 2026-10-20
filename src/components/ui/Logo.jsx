/** Minimal abstract bird mark — the KEGALI symbol. */
export function BirdMark({ className = '', size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 21.5c4.6 0 8-2.6 9.8-6.2 1.5-3 3.6-5 6.9-5.6-1 1.4-1.4 2.6-1.3 4 2.6-.9 5.2-.6 8.6 1.2-3.4 1.1-5.4 2.4-6.6 4.1-2.3 3.4-6 6-10.8 6H4Z"
        fill="currentColor"
      />
      <circle cx="25.4" cy="9.2" r="1.5" fill="currentColor" />
    </svg>
  )
}

export default function Logo({ tone = 'light', showWordmark = true, className = '' }) {
  const color = tone === 'light' ? 'text-white' : 'text-black'
  return (
    <span className={`flex items-center gap-3 ${color} ${className}`}>
      <BirdMark />
      {showWordmark ? (
        <span className="text-[17px] font-semibold uppercase tracking-[0.34em] leading-none">
          KEGALI
        </span>
      ) : null}
    </span>
  )
}
