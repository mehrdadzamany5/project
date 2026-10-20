export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  level = 2,
  className = '',
  children,
}) {
  const Heading = `h${level}`
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  const titleColor = tone === 'light' ? 'text-white' : 'text-black'
  const introColor = tone === 'light' ? 'text-white/70' : 'text-muted'

  return (
    <div className={`flex flex-col ${alignment} ${align === 'center' ? 'max-w-2xl' : ''} ${className}`}>
      {eyebrow ? (
        <span
          className={`label mb-5 flex items-center gap-3 ${tone === 'light' ? 'text-white/70' : 'text-muted'}`}
        >
          <span className="h-px w-8 bg-bronze" aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}
      {title ? (
        <Heading
          className={`${titleColor} text-[26px] font-medium uppercase leading-[1.25] tracking-wide2 sm:text-[32px] lg:text-[38px]`}
        >
          {title}
        </Heading>
      ) : null}
      {intro ? (
        <p className={`mt-6 max-w-xl text-[15px] leading-[1.85] ${introColor}`}>{intro}</p>
      ) : null}
      {children}
    </div>
  )
}
