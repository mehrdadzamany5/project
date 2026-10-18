import Container from './Container.jsx'

export default function PageHeader({ eyebrow, title, intro, children, className = '' }) {
  return (
    <header className={`border-b border-line bg-white ${className}`}>
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="mt-2 text-[30px] leading-tight sm:text-[38px] lg:text-[44px]">{title}</h1>
          {intro ? <p className="mt-4 text-[14.5px] leading-relaxed text-ink-2">{intro}</p> : null}
        </div>
        {children}
      </Container>
    </header>
  )
}
