import Container from './Container.jsx'

/** Dark editorial page banner used by every inner page. */
export default function PageHeader({ eyebrow, title, intro, children, align = 'left' }) {
  return (
    <header className="bg-black pb-14 pt-[calc(var(--header-height)+56px)] text-white sm:pb-20 sm:pt-[calc(var(--header-height)+72px)]">
      <Container>
        <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
          {eyebrow ? (
            <span className="label mb-6 flex items-center gap-3 text-white/60">
              <span className="h-px w-8 bg-bronze" aria-hidden="true" />
              {eyebrow}
            </span>
          ) : null}
          <h1 className="text-[30px] font-medium uppercase leading-[1.2] tracking-wide2 sm:text-[40px] lg:text-[48px]">
            {title}
          </h1>
          {intro ? <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-white/70">{intro}</p> : null}
          {children}
        </div>
      </Container>
    </header>
  )
}
