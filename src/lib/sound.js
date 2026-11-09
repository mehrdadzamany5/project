// Audio for the boot sequence. The reference design used three recorded files
// (TV static on power-up, dial-up modem, Windows XP startup chime). Drop those
// files into `public/sounds/` and set USE_RECORDED_SOUNDS = true to use them;
// otherwise the same cues are synthesised here so audio always works.
export const USE_RECORDED_SOUNDS = false

export const SOUND_FILES = {
  tv: '/sounds/tv-on.mp3',
  dialup: '/sounds/dial-up.mp3',
  startup: '/sounds/windows-xp-startup.mp3',
  type: '/sounds/typing.mp3',
}

let context = null
let master = null
let muted = false
const recordings = {}

function ensureContext() {
  if (typeof window === 'undefined') return null
  const Engine = window.AudioContext || window.webkitAudioContext
  if (!Engine) return null
  if (!context) {
    context = new Engine()
    master = context.createGain()
    master.gain.value = muted ? 0 : 1
    master.connect(context.destination)
  }
  if (context.state === 'suspended') context.resume().catch(() => {})
  return context
}

function noiseBuffer(ctx, seconds = 1) {
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * seconds), ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1
  return buffer
}

function recording(key) {
  if (!USE_RECORDED_SOUNDS || !SOUND_FILES[key]) return null
  if (!recordings[key]) {
    const audio = new Audio(SOUND_FILES[key])
    audio.preload = 'auto'
    recordings[key] = audio
  }
  return recordings[key]
}

export function unlockAudio() {
  ensureContext()
}

export function setMuted(value) {
  muted = value
  if (master && context) master.gain.setTargetAtTime(value ? 0 : 1, context.currentTime, 0.05)
}

export function isMuted() {
  return muted
}

let typing = null
let lastClick = -1

function prepareTyping() {
  const ctx = ensureContext()
  if (!ctx) return
  if (!typing) {
    const gain = ctx.createGain()
    gain.gain.value = 0.05
    gain.connect(master)
    typing = { gain, buffer: noiseBuffer(ctx, 0.035), ctx }
    const data = typing.buffer.getChannelData(0)
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.007))
    }
  }
  if (typing.ctx.state === 'suspended') typing.ctx.resume().catch(() => {})
}

export function playTypeClick() {
  const ctx = ensureContext()
  if (!ctx || muted) return
  prepareTyping()
  if (!typing || typing.ctx.state !== 'running') return
  const now = typing.ctx.currentTime
  if (now - lastClick < 0.025) return
  lastClick = now
  const source = typing.ctx.createBufferSource()
  source.buffer = typing.buffer
  const filter = typing.ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 1400 + Math.random() * 900
  filter.Q.value = 0.7
  source.connect(filter)
  filter.connect(typing.gain)
  source.onended = () => {
    source.disconnect()
    filter.disconnect()
  }
  source.start(now)
}

export function stopTyping() {
  if (typing?.gain && typing.ctx) typing.gain.gain.setValueAtTime(0, typing.ctx.currentTime)
}

// CRT power-on: a short burst of static with a falling whine.
export function playTvOn(duration = 1) {
  const file = recording('tv')
  if (file) {
    file.currentTime = 0
    file.volume = 0.7
    file.play().catch(() => {})
    setTimeout(() => file.pause(), duration * 1000)
    return
  }
  const ctx = ensureContext()
  if (!ctx || muted) return
  const now = ctx.currentTime
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.22, now + 0.04)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
  gain.connect(master)

  const staticSource = ctx.createBufferSource()
  staticSource.buffer = noiseBuffer(ctx, duration)
  const highpass = ctx.createBiquadFilter()
  highpass.type = 'highpass'
  highpass.frequency.value = 900
  staticSource.connect(highpass)
  highpass.connect(gain)
  staticSource.start(now)

  const whine = ctx.createOscillator()
  whine.type = 'sine'
  whine.frequency.setValueAtTime(760, now)
  whine.frequency.exponentialRampToValueAtTime(70, now + duration * 0.8)
  const whineGain = ctx.createGain()
  whineGain.gain.setValueAtTime(0.12, now)
  whineGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
  whine.connect(whineGain)
  whineGain.connect(master)
  whine.start(now)
  whine.stop(now + duration)
}

// Dial-up handshake. Returns a stop() function used when the boot is skipped.
export function playDialUp(duration = 12) {
  const file = recording('dialup')
  if (file) {
    file.currentTime = 0
    file.volume = 0.5
    file.play().catch(() => {})
    const timer = setTimeout(() => file.pause(), duration * 1000)
    return () => {
      clearTimeout(timer)
      file.pause()
    }
  }
  const ctx = ensureContext()
  if (!ctx || muted) return () => {}
  const now = ctx.currentTime
  const nodes = []

  const bed = ctx.createGain()
  bed.gain.setValueAtTime(0.0001, now)
  bed.gain.exponentialRampToValueAtTime(0.05, now + 0.4)
  bed.gain.setValueAtTime(0.05, now + duration - 0.6)
  bed.gain.exponentialRampToValueAtTime(0.0001, now + duration)
  bed.connect(master)
  nodes.push(bed)

  const hiss = ctx.createBufferSource()
  hiss.buffer = noiseBuffer(ctx, 3)
  hiss.loop = true
  const band = ctx.createBiquadFilter()
  band.type = 'bandpass'
  band.frequency.value = 1100
  band.Q.value = 0.6
  const lfo = ctx.createOscillator()
  lfo.type = 'sine'
  lfo.frequency.value = 0.35
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = 500
  lfo.connect(lfoGain)
  lfoGain.connect(band.frequency)
  hiss.connect(band)
  band.connect(bed)
  hiss.start(now)
  lfo.start(now)
  nodes.push(hiss, lfo)

  // Dial tones and the answering-modem squeal.
  const tones = [
    [0.15, 350, 440],
    [0.9, 480, 620],
    [1.6, 1100, 1300],
    [2.4, 2100, 2400],
    [3.2, 900, 1600],
    [4.4, 1750, 1750],
    [6.0, 2400, 1200],
    [8.2, 700, 1400],
    [9.8, 1800, 900],
  ]
  for (const [offset, start, end] of tones) {
    if (offset >= duration) break
    const osc = ctx.createOscillator()
    osc.type = 'square'
    osc.frequency.setValueAtTime(start, now + offset)
    osc.frequency.linearRampToValueAtTime(end, now + offset + 0.35)
    const toneGain = ctx.createGain()
    toneGain.gain.setValueAtTime(0.0001, now + offset)
    toneGain.gain.exponentialRampToValueAtTime(0.028, now + offset + 0.02)
    toneGain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.45)
    osc.connect(toneGain)
    toneGain.connect(master)
    osc.start(now + offset)
    osc.stop(now + offset + 0.5)
    nodes.push(osc)
  }

  return () => {
    try {
      for (const node of nodes) {
        if (node.stop) node.stop()
        if (node.disconnect) node.disconnect()
      }
    } catch {
      /* already stopped */
    }
  }
}

// Stylised Windows XP startup chime: four bell notes over a low pad.
export function playXpStartup(duration = 5.9) {
  const file = recording('startup')
  if (file) {
    file.currentTime = 0
    file.volume = 0.8
    file.play().catch(() => {})
    const timer = setTimeout(() => file.pause(), duration * 1000)
    return () => {
      clearTimeout(timer)
      file.pause()
    }
  }
  const ctx = ensureContext()
  if (!ctx || muted) return () => {}
  const now = ctx.currentTime
  const stops = []
  const notes = [
    [0, 523.25, 0.16],
    [0.22, 659.25, 0.14],
    [0.44, 783.99, 0.13],
    [0.68, 1046.5, 0.12],
    [1.1, 783.99, 0.07],
  ]
  for (const [offset, frequency, level] of notes) {
    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.value = frequency
    const sub = ctx.createOscillator()
    sub.type = 'sine'
    sub.frequency.value = frequency * 2
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, now + offset)
    gain.gain.exponentialRampToValueAtTime(level, now + offset + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 2.4)
    osc.connect(gain)
    sub.connect(gain)
    gain.connect(master)
    osc.start(now + offset)
    sub.start(now + offset)
    osc.stop(now + offset + 2.6)
    sub.stop(now + offset + 2.6)
    stops.push(osc, sub, gain)
  }

  const pad = ctx.createOscillator()
  pad.type = 'sine'
  pad.frequency.value = 130.81
  const padGain = ctx.createGain()
  padGain.gain.setValueAtTime(0.0001, now)
  padGain.gain.exponentialRampToValueAtTime(0.09, now + 0.6)
  padGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
  pad.connect(padGain)
  padGain.connect(master)
  pad.start(now)
  pad.stop(now + duration)
  stops.push(pad, padGain)

  return () => {
    try {
      for (const node of stops) {
        if (node.stop) node.stop()
        if (node.disconnect) node.disconnect()
      }
    } catch {
      /* already stopped */
    }
  }
}
