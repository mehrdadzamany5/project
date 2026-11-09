import { useCallback, useRef } from 'react'
import { WindowGlyph } from './icons.jsx'

function isSmallScreen() {
  return typeof window !== 'undefined' && window.innerWidth <= 760
}

export default function XpWindow({
  win,
  active,
  onFocus,
  onClose,
  onMinimize,
  onToggleMax,
  onMove,
  onResize,
  children,
}) {
  const drag = useRef(null)
  const small = isSmallScreen()
  const maximized = win.maximized || small

  const geometry = maximized
    ? { left: 0, top: 0, width: '100%', height: `calc(100% - ${small ? 46 : 44}px)` }
    : { left: win.x, top: win.y, width: win.w, height: win.h }

  const startDrag = useCallback(
    (event) => {
      if (event.button !== undefined && event.button !== 0) return
      if (maximized) return
      onFocus()
      event.preventDefault()
      drag.current = { mode: 'move', startX: event.clientX, startY: event.clientY, x: win.x, y: win.y }
      const move = (moveEvent) => {
        const state = drag.current
        if (!state || state.mode !== 'move') return
        onMove(win.id, {
          x: Math.min(Math.max(-win.w + 120, state.x + moveEvent.clientX - state.startX), window.innerWidth - 120),
          y: Math.min(Math.max(0, state.y + moveEvent.clientY - state.startY), window.innerHeight - 120),
        })
      }
      const up = () => {
        drag.current = null
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
        window.removeEventListener('pointercancel', up)
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
      window.addEventListener('pointercancel', up)
    },
    [maximized, onFocus, onMove, win.h, win.id, win.w, win.x, win.y],
  )

  const startResize = useCallback(
    (event) => {
      if (maximized) return
      event.preventDefault()
      event.stopPropagation()
      onFocus()
      drag.current = { mode: 'resize', startX: event.clientX, startY: event.clientY, w: win.w, h: win.h }
      const move = (moveEvent) => {
        const state = drag.current
        if (!state || state.mode !== 'resize') return
        onResize(win.id, {
          w: Math.max(300, state.w + (moveEvent.clientX - state.startX)),
          h: Math.max(200, state.h + (moveEvent.clientY - state.startY)),
        })
      }
      const up = () => {
        drag.current = null
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
        window.removeEventListener('pointercancel', up)
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
      window.addEventListener('pointercancel', up)
    },
    [maximized, onFocus, onResize, win.h, win.id, win.w],
  )

  return (
    <section
      className={`xp-window ${maximized ? 'maximized' : ''} ${active ? 'active' : 'inactive'}`}
      style={{ ...geometry, zIndex: win.z }}
      onPointerDown={onFocus}
      aria-label={win.title}
    >
      <header
        className="xp-titlebar"
        onPointerDown={startDrag}
        onDoubleClick={() => onToggleMax(win.id)}
      >
        <span className="xp-title-icon">
          <WindowGlyph type={win.type} />
        </span>
        <span className="xp-title">{win.title}</span>
        <span className="xp-controls">
          <button type="button" className="xp-control" title="کوچک‌کردن" onClick={() => onMinimize(win.id)}>
            ─
          </button>
          <button
            type="button"
            className="xp-control"
            title={maximized ? 'بازگرداندن' : 'بزرگ‌کردن'}
            onClick={() => onToggleMax(win.id)}
          >
            {maximized ? '❐' : '□'}
          </button>
          <button type="button" className="xp-control close" title="بستن" onClick={() => onClose(win.id)}>
            ✕
          </button>
        </span>
      </header>

      <div className="xp-window-body">{children}</div>

      {!maximized ? <span className="resize-handle" onPointerDown={startResize} role="presentation" /> : null}
    </section>
  )
}
