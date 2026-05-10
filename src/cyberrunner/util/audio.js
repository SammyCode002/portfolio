let ctx = null

function getCtx() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    try {
      const Ctor = window.AudioContext || window.webkitAudioContext
      if (Ctor) ctx = new Ctor()
    } catch {
      ctx = null
    }
  }
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }
  return ctx
}

export function beep(_scene, freq, duration = 0.1, type = 'square', gain = 0.05, delay = 0) {
  const c = getCtx()
  if (!c) return
  const t0 = c.currentTime + delay
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  g.gain.setValueAtTime(0, t0)
  g.gain.linearRampToValueAtTime(gain, t0 + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(g)
  g.connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.02)
}
