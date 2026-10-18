export default function PolicySections({ sections, idPrefix = 'policy' }) {
  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <section key={section.heading} id={`${idPrefix}-${index + 1}`}>
          <h2 className="text-[20px] sm:text-[23px]">{section.heading}</h2>
          <div className="mt-3 space-y-3">
            {section.body.map((paragraph) => (
              <p key={paragraph} className="max-w-3xl text-[14px] leading-relaxed text-ink-2">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
