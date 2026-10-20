import { useId, useState } from 'react'

/**
 * Accessible accordion built on native buttons: real keyboard support,
 * `aria-expanded` / `aria-controls`, and one panel open at a time per group.
 */
export default function Accordion({ items, allowMultiple = false }) {
  const groupId = useId()
  const [open, setOpen] = useState([])

  const toggle = (index) => {
    setOpen((current) => {
      if (current.includes(index)) return current.filter((i) => i !== index)
      return allowMultiple ? [...current, index] : [index]
    })
  }

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = open.includes(index)
        const panelId = `${groupId}-panel-${index}`
        const buttonId = `${groupId}-button-${index}`
        return (
          <div key={item.q}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span className="text-[15px] font-medium text-black">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`mt-1 shrink-0 text-bronze transition-transform duration-300 ease-editorial ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pr-10"
            >
              <p className="text-[14px] leading-[1.85] text-muted">{item.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
