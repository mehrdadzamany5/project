import { useCallback, useEffect, useRef, useState } from 'react'
import { playDialUp, playTvOn, playTypeClick, playXpStartup, stopTyping, unlockAudio } from '../lib/sound.js'

const TERMINAL_DURATION = 12000
const XP_INTRO_DURATION = 3800

const LINES = [
  { t: 'GALLERY | INTERACTIVE PORTFOLIO SYSTEM', c: 'dim', d: 260 },
  { t: 'نمایشگاه دیجیتال نمونه‌کارها', c: 'white', d: 280 },
  { t: '', c: '', d: 120 },
  { t: 'BIOS v4.51PG — GALLERY EDITION', c: 'dim', d: 260 },
  { t: 'Memory test: 524288K OK', c: 'white', d: 240 },
  { t: 'Detecting display adapter ... OK', c: 'white', d: 260 },
  { t: 'Mounting /gallery/desktop ... OK', c: 'white', d: 280 },
  { t: 'Initializing visitor identity ... OK', c: 'white', d: 320 },
  { t: 'Loading portfolio folders ... OK', c: 'white', d: 320 },
  { t: 'Reading published projects ... READY', c: 'white', d: 340 },
  { t: '', c: '', d: 120 },
  { t: 'Starting Windows XP shell ... OK', c: 'white', d: 300 },
  { t: 'Loading Internet Explorer engine ... OK', c: 'white', d: 330 },
  { t: 'Opening dial-up connection ... LINK', c: 'white', d: 420 },
  { t: '', c: '', d: 140 },
  { t: 'GALLERY — نمایشگاه نمونه‌کارها', c: 'white', d: 640 },
  { t: 'در حال ورود به محیط ویندوز…', c: 'dim', d: 520 },
]

function decorate(text, cls) {
  const match = /(?:OK|READY|LINK)$/.exec(text)
  if (match) {
    return { text: text.slice(0, match.index), cls, status: match[0] }
  }
  return { text, cls, status: '' }
}

export default function BootSequence({ onDone }) {
  const [phase, setPhase] = useState('prompt')
  const [rows, setRows] = useState([])
  const timers = useRef([])
  const raf = useRef(0)
  const stopDial = useRef(null)
  const stopStartup = useRef(null)
  const lastSignature = useRef('')
  const finished = useRef(false)

  const cleanup = useCallback(() => {
    timers.current.forEach((id) => clearTimeout(id))
    timers.current = []
    cancelAnimationFrame(raf.current)
    stopTyping()
    stopDial.current?.()
    stopStartup.current?.()
  }, [])

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    cleanup()
    onDone()
  }, [cleanup, onDone])

  const startTerminal = useCallback(() => {
    setPhase('terminal')
    stopDial.current = playDialUp(TERMINAL_DURATION / 1000)

    const totalWeight = LINES.reduce((sum, line) => sum + line.t.length * 27.5 + line.d, 0)
    const scale = (TERMINAL_DURATION - 250) / totalWeight
    let offset = 0
    const schedule = LINES.map((line) => {
      const entry = {
        line,
        start: offset,
        typing: line.t.length * 27.5 * scale,
      }
      offset += (line.t.length * 27.5 + line.d) * scale
      return entry
    })

    setRows(LINES.map((line) => ({ text: '', cls: line.c, status: '', done: false })))

    const startedAt = performance.now()

    const draw = (elapsed, audible) => {
      const next = []
      let signature = ''
      for (const entry of schedule) {
        if (elapsed < entry.start) break
        const count = entry.typing
          ? Math.min(entry.line.t.length, Math.floor(((elapsed - entry.start) / entry.typing) * entry.line.t.length))
          : 0
        signature += `${count},`
        if (count === entry.line.t.length) {
          const text = entry.line.t.length ? decorate(entry.line.t, entry.line.c) : { text: '', cls: entry.line.c, status: '' }
          next.push({ ...text, done: true })
        } else {
          if (audible && /\S/.test(entry.line.t.slice(0, count))) playTypeClick()
          next.push({ text: entry.line.t.slice(0, count), cls: entry.line.c, status: '', done: false })
        }
        if (count < entry.line.t.length) break
      }
      if (signature !== lastSignature.current) {
        lastSignature.current = signature
        setRows(next)
      }
    }

    const frame = () => {
      const elapsed = performance.now() - startedAt
      draw(elapsed, true)
      if (elapsed < TERMINAL_DURATION) raf.current = requestAnimationFrame(frame)
    }
    frame()

    timers.current.push(
      setTimeout(() => {
        cancelAnimationFrame(raf.current)
        stopDial.current?.()
        stopTyping()
        draw(TERMINAL_DURATION, false)
        setPhase('windows')
        stopStartup.current = playXpStartup(XP_INTRO_DURATION / 1000)
        timers.current.push(setTimeout(finish, XP_INTRO_DURATION))
      }, TERMINAL_DURATION),
    )
  }, [finish])

  const startSystem = useCallback(() => {
    if (phase !== 'prompt') return
    unlockAudio()
    setPhase('lamp')
    playTvOn(1)
    timers.current.push(setTimeout(startTerminal, 900))
  }, [phase, startTerminal])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        startSystem()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [startSystem])

  useEffect(() => cleanup, [cleanup])

  return (
    <div className="boot-stage">
      {phase === 'prompt' ? (
        <div className="boot-prompt" onPointerDown={startSystem}>
          <h2>
            [ CLICK OR TAP TO ENTER ]
            <br />
            <span lang="fa" dir="rtl">
              برای ورود، لمس کنید یا کلیک کنید
            </span>
          </h2>
        </div>
      ) : null}

      <div className={`boot-crt ${phase === 'prompt' ? '' : 'lamp-tv-on'}`}>
        <div className={`boot-terminal ${phase === 'terminal' ? 'active' : ''}`}>
          <div className="boot-lines" aria-live="polite">
            {rows.map((row, index) => (
              <div
                key={index}
                className={`term-line ${row.cls || ''}`}
                dir={/[\u0600-\u06ff]/.test(row.text) ? 'rtl' : 'ltr'}
              >
                {row.text}
                {!row.done && row.text !== undefined ? <span className="cursor" /> : null}
                {row.status ? <span className="term-status">{row.status}</span> : null}
              </div>
            ))}
          </div>
        </div>

        <div className={`boot-wordmark ${phase === 'windows' ? 'active' : ''}`}>
          <div className="boot-wordmark-inner">
            <p className="boot-wordmark-title">GALLERY</p>
            <p className="boot-wordmark-sub">نمایشگاه</p>
          </div>
        </div>
      </div>

      {phase !== 'prompt' ? (
        <button type="button" className="boot-skip show" onClick={finish}>
          ورود مستقیم · SKIP ↵
        </button>
      ) : null}
    </div>
  )
}
