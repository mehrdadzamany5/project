import { useEffect, useRef } from 'react'

export default function ContextMenu({ x, y, items, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!ref.current?.contains(event.target)) onClose()
    }
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('pointerdown', onPointerDown, true)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown, true)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const width = 210
  const left = Math.min(x, window.innerWidth - width - 8)
  const top = Math.min(y, window.innerHeight - Math.min(items.length, 9) * 30 - 12)

  return (
    <div ref={ref} className="context-menu" style={{ left, top, width }} role="menu">
      {items.map((item, index) =>
        item.divider ? (
          // eslint-disable-next-line react/no-array-index-key
          <hr key={`divider-${index}`} />
        ) : (
          <button
            key={item.label}
            type="button"
            role="menuitem"
            disabled={item.disabled}
            onClick={() => {
              onClose()
              item.onClick()
            }}
          >
            <span aria-hidden="true" style={{ width: 14, textAlign: 'center' }}>
              {item.glyph || ''}
            </span>
            <span>{item.label}</span>
          </button>
        ),
      )}
    </div>
  )
}
