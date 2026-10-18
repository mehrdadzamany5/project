import { useState } from 'react'
import { Icon } from './Icons.jsx'

/**
 * Accessible disclosure used for product details, FAQs and policy sections.
 * Real <button> + aria-expanded + aria-controls, keyboard operable.
 */
export default function Accordion({ items, defaultOpen = -1, allowMultiple = false, className = '' }) {
  const [open, setOpen] = useState(() => (defaultOpen >= 0 ? [defaultOpen] : []))

  const isOpen = (index) => open.includes(index)
  const toggle = (index) =>
    setOpen((current) => {
      if (current.includes(index)) return current.filter((value) => value !== index)
      return allowMultiple ? [...current, index] : [index]
    })

  return (
    <div className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((item, index) => {
        const expanded = isOpen(index)
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={expanded}
                aria-controls={`accordion-panel-${index}`}
                id={`accordion-trigger-${index}`}
                className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-accent"
              >
                <span className="text-[14.5px] font-medium">{item.question}</span>
                <Icon
                  name="chevron-down"
                  size={17}
                  className={`shrink-0 text-ink-3 transition-transform duration-300 ease-smooth ${
                    expanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <div
              id={`accordion-panel-${index}`}
              role="region"
              aria-labelledby={`accordion-trigger-${index}`}
              hidden={!expanded}
              className="pb-5 pr-8"
            >
              <p className="text-[13.5px] leading-relaxed text-ink-2">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
