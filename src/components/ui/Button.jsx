import { Link } from 'react-router-dom'

const VARIANTS = {
  solid: 'bg-black text-white hover:bg-forest',
  light: 'bg-white text-black hover:bg-stone',
  outline: 'border border-black/25 text-black hover:border-black hover:bg-black hover:text-white',
  outlineLight: 'border border-white/40 text-white hover:bg-white hover:text-black',
  quiet: 'text-black hover:text-bronze',
}

const SIZES = {
  sm: 'px-4 py-2 text-[10px]',
  md: 'px-6 py-3 text-[11px]',
  lg: 'px-8 py-4 text-[11px]',
}

function classesFor({ variant, size, block }) {
  return [
    'inline-flex items-center justify-center gap-2 font-medium uppercase tracking-label',
    'transition-colors duration-300 ease-editorial disabled:cursor-not-allowed disabled:opacity-45',
    VARIANTS[variant] || VARIANTS.solid,
    SIZES[size] || SIZES.md,
    block ? 'w-full' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

export default function Button({
  as: Tag = 'button',
  variant = 'solid',
  size = 'md',
  block = false,
  className = '',
  type,
  children,
  ...rest
}) {
  return (
    <Tag
      className={`${classesFor({ variant, size, block })} ${className}`}
      {...(Tag === 'button' ? { type: type || 'button' } : {})}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Same visual language, but renders a router link. */
export function ButtonLink({ to, variant = 'solid', size = 'md', block = false, className = '', children, ...rest }) {
  return (
    <Link to={to} className={`${classesFor({ variant, size, block })} ${className}`} {...rest}>
      {children}
    </Link>
  )
}
