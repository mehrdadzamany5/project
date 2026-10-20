const ICONS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14.5 8.5h2.2V5.6h-2.6c-2.3 0-3.6 1.4-3.6 3.7v1.6H8.4v2.9h2.1V21h3v-7.2h2.3l.4-2.9h-2.7V9.6c0-.7.3-1.1 1-1.1Z" />,
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 10.5V17M8 7.6v.1M12 17v-3.6a2 2 0 0 1 4 0V17" />
    </>
  ),
  x: <path d="M5 5l14 14M19 5 5 19" />,
  youtube: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="M11 9.8l4 2.2-4 2.2V9.8Z" />
    </>
  ),
}

function Icon({ name }) {
  const path = ICONS[name] || ICONS.instagram
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}

/**
 * Renders configured social profiles only. Nothing is rendered when no profile
 * has been configured, because we never invent external URLs.
 */
export default function SocialLinks({ links = [], tone = 'light', className = '' }) {
  if (!links.length) return null
  const color = tone === 'light' ? 'text-white/70 hover:text-white' : 'text-muted hover:text-black'

  return (
    <ul className={`flex items-center gap-2 ${className}`} aria-label="Social profiles">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={link.label}
            className={`flex h-8 w-8 items-center justify-center rounded-full border border-current/25 transition-colors duration-300 ease-editorial ${color}`}
          >
            <Icon name={link.icon || link.label.toLowerCase()} />
          </a>
        </li>
      ))}
    </ul>
  )
}
