import { Link } from 'react-router-dom'
import { Icon } from './Icons.jsx'

/**
 * Shared section header: eyebrow, heading and an optional trailing link.
 * Keeps left/right alignment identical across every homepage section.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  actionLabel,
  actionTo,
  align = 'left',
  as: Heading = 'h2',
  className = '',
}) {
  const centered = align === 'center'
  return (
    <div
      className={`flex flex-col gap-4 ${
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      } ${className}`}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-xl'}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {title ? (
          <Heading className="mt-2 text-[26px] leading-tight sm:text-[32px] lg:text-[38px]">
            {title}
          </Heading>
        ) : null}
        {description ? <p className="mt-3 text-[14px] text-ink-2">{description}</p> : null}
      </div>
      {actionLabel && actionTo ? (
        <Link
          to={actionTo}
          className="group inline-flex shrink-0 items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent"
        >
          {actionLabel}
          <Icon
            name="arrow-right"
            size={16}
            className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
          />
        </Link>
      ) : null}
    </div>
  )
}
