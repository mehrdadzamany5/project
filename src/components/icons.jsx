export function FolderIcon({ size = 46 }) {
  return (
    <svg viewBox="0 0 48 42" width={size} height={(size * 42) / 48} aria-hidden="true" className="icon-art">
      <path d="M3 8h13l4 4h25a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" fill="#d9a022" />
      <path d="M3 8h13l3 3H3z" fill="#f0c14b" />
      <path d="M2 15h44a2 2 0 0 1 2 2v19a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V17a2 2 0 0 1 2-2z" fill="#ffd75e" />
      <path d="M2 15h44a2 2 0 0 1 2 2v3H0v-3a2 2 0 0 1 2-2z" fill="#ffe79a" />
      <path d="M4 22h40v14H4z" fill="#f7c948" opacity=".55" />
    </svg>
  )
}

const KIND_COLORS = {
  image: '#2f7fd4',
  video: '#8a44c9',
  pdf: '#c93a2e',
  website: '#1c8f5b',
  other: '#6b6a63',
}

const KIND_GLYPH = {
  image: 'IMG',
  video: 'VID',
  pdf: 'PDF',
  website: 'WWW',
  other: 'FILE',
}

export function FileIcon({ kind = 'other', thumb, size = 52 }) {
  const color = KIND_COLORS[kind] || KIND_COLORS.other
  return (
    <span className="file-preview" style={{ width: size, height: size * 0.87 }}>
      {thumb ? (
        <img src={thumb} alt="" loading="lazy" />
      ) : (
        <svg viewBox="0 0 40 44" width={size * 0.62} height={size * 0.68} aria-hidden="true">
          <path d="M6 2h19l9 9v31H6z" fill="#ffffff" stroke="#b9b5a6" />
          <path d="M25 2l9 9h-9z" fill="#d9d5c6" stroke="#b9b5a6" />
          <rect x="9" y="20" width="22" height="6" rx="1" fill={color} opacity=".16" />
          <text
            x="20"
            y="35"
            textAnchor="middle"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="9"
            fontWeight="700"
            fill={color}
          >
            {KIND_GLYPH[kind] || 'FILE'}
          </text>
        </svg>
      )}
    </span>
  )
}

export function IEGlobeIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#1f6fd0" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="#bfe0ff" strokeWidth="1.3" />
      <ellipse cx="12" cy="12" rx="4.4" ry="10" fill="none" stroke="#bfe0ff" strokeWidth="1.3" />
      <path d="M2.4 8.4c3 2.2 8.2 3.4 13.6 2.2 2.2-.5 4-1.3 5.3-2.2" fill="none" stroke="#bfe0ff" strokeWidth="1.1" />
    </svg>
  )
}

export function UserTileIcon({ guest = false, size = 30 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="5" fill={guest ? '#dfe7f2' : '#cfe3ff'} />
      <circle cx="16" cy="12" r="5.4" fill={guest ? '#8a97a8' : '#2a6fd0'} />
      <path d="M5.6 29c.6-5.4 5-8.6 10.4-8.6S25.8 23.6 26.4 29z" fill={guest ? '#8a97a8' : '#2a6fd0'} />
    </svg>
  )
}

export function WindowGlyph({ type }) {
  if (type === 'ie') return <IEGlobeIcon size={16} />
  if (type === 'explorer') return <FolderIcon size={16} />
  if (type === 'admin') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <circle cx="8" cy="8" r="6.4" fill="#e8b93a" stroke="#8e6b12" />
        <circle cx="8" cy="8" r="2.6" fill="#fdf6dd" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="2" fill="#4b90df" stroke="#1f4f88" />
      <path d="M5 6h6M5 9h6" stroke="#eaf4ff" strokeWidth="1.4" />
    </svg>
  )
}
