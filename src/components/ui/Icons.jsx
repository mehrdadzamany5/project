/**
 * Thin-stroke line icon set used consistently across navigation, feature rows,
 * forms and social links. Single 24×24 grid, currentColor, 1.4 stroke.
 */
const PATHS = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.6-3.6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="7.5" r="3.8" />
      <path d="M4.5 20.5v-1.6a4.4 4.4 0 0 1 4.4-4.4h6.2a4.4 4.4 0 0 1 4.4 4.4v1.6" />
    </>
  ),
  heart: <path d="M12 20.4 4.7 13a4.6 4.6 0 0 1 6.5-6.5l.8.8.8-.8A4.6 4.6 0 0 1 19.3 13Z" />,
  'heart-filled': <path d="M12 20.4 4.7 13a4.6 4.6 0 0 1 6.5-6.5l.8.8.8-.8A4.6 4.6 0 0 1 19.3 13Z" />,
  bag: (
    <>
      <path d="M6.2 8h11.6l1 12H5.2Z" />
      <path d="M9.2 8V6.2a2.8 2.8 0 0 1 5.6 0V8" />
    </>
  ),
  menu: <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  'chevron-left': <path d="m14 5.5-6.5 6.5L14 18.5" />,
  'chevron-right': <path d="m10 5.5 6.5 6.5L10 18.5" />,
  'chevron-down': <path d="m5.5 9.5 6.5 6.5 6.5-6.5" />,
  'arrow-right': <path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5" />,
  'arrow-left': <path d="M19.5 12h-15M11 5.5 4.5 12l6.5 6.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  trash: <path d="M4 7h16M9.5 7V4.8h5V7M6.5 7l1 13h9l1-13" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  star: <path d="m12 3.6 2.6 5.5 5.9.8-4.3 4.1 1.1 5.9L12 17l-5.3 2.9 1.1-5.9L3.5 9.9l5.9-.8Z" />,
  'star-filled': <path d="m12 3.6 2.6 5.5 5.9.8-4.3 4.1 1.1 5.9L12 17l-5.3 2.9 1.1-5.9L3.5 9.9l5.9-.8Z" />,
  leaf: (
    <>
      <path d="M4.5 19.5C4.5 10.8 11 4.5 20 4.5c0 9-6.3 15.5-15.5 15Z" />
      <path d="M4.5 19.5c2.8-5.6 6.8-8.8 11.5-10.8" />
    </>
  ),
  truck: (
    <>
      <path d="M2.8 7h9.4v9.2H2.8z" />
      <path d="M12.2 10h3.6l3.4 3.4v2.8h-7z" />
      <circle cx="6.5" cy="18.4" r="1.8" />
      <circle cx="16.5" cy="18.4" r="1.8" />
    </>
  ),
  return: (
    <>
      <path d="M4 9.5a8.5 8.5 0 1 1 2.4 7.3" />
      <path d="M4 4.5v5h5" />
    </>
  ),
  lock: (
    <>
      <path d="M5.8 11h12.4v9.2H5.8z" />
      <path d="M9 11V7.8a3 3 0 0 1 6 0V11" />
    </>
  ),
  recycle: (
    <>
      <path d="M4.6 10.5A8 8 0 0 1 18.4 7.6" />
      <path d="M19.4 13.5A8 8 0 0 1 5.6 16.4" />
      <path d="M18.4 3.6v4.2h-4.2" />
      <path d="M5.6 20.4v-4.2h4.2" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.2" />
      <path d="m8.6 13.4-1.4 7.2 4.8-2.4 4.8 2.4-1.4-7.2" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
    </>
  ),
  tree: (
    <>
      <path d="M12 3 6.4 11h2.9l-3 5h11.4l-3-5h2.9Z" />
      <path d="M12 16v5" />
    </>
  ),
  drop: <path d="M12 3.2s6 6.6 6 10.6a6 6 0 0 1-12 0c0-4 6-10.6 6-10.6Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M3.2 12h17.6" />
      <path d="M12 3.2a14 14 0 0 1 0 17.6 14 14 0 0 1 0-17.6Z" />
    </>
  ),
  mail: (
    <>
      <path d="M3 6h18v12H3z" />
      <path d="m3.6 7 8.4 5.6L20.4 7" />
    </>
  ),
  sliders: (
    <>
      <path d="M3.5 7.5h9M17 7.5h3.5M3.5 16.5h3.5M11.5 16.5h9" />
      <circle cx="14.8" cy="7.5" r="2.2" />
      <circle cx="9.2" cy="16.5" r="2.2" />
    </>
  ),
  grid: <path d="M4 4h6.6v6.6H4zM13.4 4H20v6.6h-6.6zM4 13.4h6.6V20H4zM13.4 13.4H20V20h-6.6z" />,
  quote: (
    <path d="M9.4 6.6c-2.6 0-4.2 1.9-4.2 4.2 0 1.9 1.3 3.2 3 3.2.6 0 1.1-.2 1.5-.5-.3 1.7-1.6 2.8-3.2 3.2l.5 1.6c3.2-.9 5.1-3.3 5.1-6.8 0-2.8-1.2-4.9-2.7-4.9Zm7.9 0c-2.6 0-4.2 1.9-4.2 4.2 0 1.9 1.3 3.2 3 3.2.6 0 1.1-.2 1.5-.5-.3 1.7-1.6 2.8-3.2 3.2l.5 1.6c3.2-.9 5.1-3.3 5.1-6.8 0-2.8-1.2-4.9-2.7-4.9Z" />
  ),
  instagram: (
    <>
      <path d="M4 8.4A4.4 4.4 0 0 1 8.4 4h7.2A4.4 4.4 0 0 1 20 8.4v7.2a4.4 4.4 0 0 1-4.4 4.4H8.4A4.4 4.4 0 0 1 4 15.6Z" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.9 7.1h.01" />
    </>
  ),
  facebook: <path d="M15 3.5h-2.2A4.3 4.3 0 0 0 8.5 7.8V10H6.4v3h2.1v7.5h3.2V13h2.4l.5-3h-2.9V8.2a1.2 1.2 0 0 1 1.2-1.2H15Z" />,
  pinterest: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M10.2 17.6 12.4 8" />
      <path d="M9.8 12.4a2.9 2.9 0 0 0 4.7 1.3c1.3-1 1.6-3.1.2-4.4-1.4-1.3-4-1-4.8.7" />
    </>
  ),
  sparkle: <path d="m12 3 1.9 5.3L19 10.2l-5.1 1.9L12 17.4l-1.9-5.3L5 10.2l5.1-1.9Z" />,
  refresh: (
    <>
      <path d="M20 11.5A8 8 0 0 0 6.3 6.8L4 9" />
      <path d="M4 4.5V9h4.5" />
      <path d="M4 12.5a8 8 0 0 0 13.7 4.7L20 15" />
      <path d="M20 19.5V15h-4.5" />
    </>
  ),
}

const FILLED = new Set(['star-filled', 'heart-filled'])

export function Icon({ name, size = 20, strokeWidth = 1.4, className = '', title, ...rest }) {
  const glyph = PATHS[name]
  if (!glyph) return null
  const filled = FILLED.has(name)
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {glyph}
    </svg>
  )
}

export default Icon
