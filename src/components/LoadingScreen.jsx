import { useEffect, useRef, useState } from 'react'

const DURATION = 3400
const STAGES = [
  '> INITIALIZING NETWORK',
  '> AUTHENTICATING SAM.SYSTEM',
  '> COMPILING PROFILE 0X',
  '> RENDERING INTERFACE',
]

function pad(n, w = 2) {
  return String(n).padStart(w, '0')
}

const FINAL_HASH = 'a3:7f:c2:4b:8e:91:d4:5a:c8:e7:b2:f0:6d:91:47:3e'
const HEX_POOL = '0123456789abcdef'

function scrambleHash(elapsedMs) {
  const settled = Math.min(FINAL_HASH.length, Math.floor((elapsedMs / DURATION) * FINAL_HASH.length * 1.1))
  let out = ''
  for (let i = 0; i < FINAL_HASH.length; i++) {
    const c = FINAL_HASH[i]
    if (c === ':') { out += ':'; continue }
    if (i < settled) { out += c; continue }
    out += HEX_POOL[Math.floor(Math.random() * 16)]
  }
  return out
}

function formatTC(elapsedMs) {
  const totalFrames = Math.floor(elapsedMs * 0.02997)
  const h = Math.floor(totalFrames / (3600 * 30))
  const m = Math.floor((totalFrames / (60 * 30)) % 60)
  const s = Math.floor((totalFrames / 30) % 60)
  const f = totalFrames % 30
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`
}

function AudioBars() {
  const [bars, setBars] = useState(() => Array(14).fill(0).map(() => Math.random()))
  useEffect(() => {
    const id = setInterval(() => {
      setBars(Array(14).fill(0).map(() => Math.random()))
    }, 110)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex items-end gap-[2px] h-3">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[2px] bg-[#6bcce8]/70"
          style={{ height: `${20 + h * 80}%` }}
        />
      ))}
    </div>
  )
}

export default function LoadingScreen({ onComplete }) {
  const [elapsed, setElapsed] = useState(0)
  const [closing, setClosing] = useState(false)
  const startRef = useRef(null)
  const completedRef = useRef(false)

  useEffect(() => {
    startRef.current = performance.now()
    let raf

    const finish = () => {
      if (completedRef.current) return
      completedRef.current = true
      setClosing(true)
      setTimeout(onComplete, 320)
    }

    const tick = () => {
      const now = performance.now()
      const e = now - startRef.current
      setElapsed(e)
      if (e < DURATION) {
        raf = requestAnimationFrame(tick)
      } else {
        finish()
      }
    }
    raf = requestAnimationFrame(tick)

    const onKey = (ev) => {
      if (ev.key === 'Escape' || ev.key === 'Enter' || ev.key === ' ') finish()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
    }
  }, [onComplete])

  const progress = Math.min(100, (elapsed / DURATION) * 100)
  const stageIdx = Math.min(STAGES.length - 1, Math.floor((elapsed / DURATION) * STAGES.length))
  const tc = formatTC(elapsed)
  const today = new Date()
  const dateLabel = `${today.getFullYear().toString().slice(-2)}·${pad(today.getMonth() + 1)}·${pad(today.getDate())}`

  const skip = () => {
    if (completedRef.current) return
    completedRef.current = true
    setClosing(true)
    setTimeout(onComplete, 320)
  }

  return (
    <div
      onClick={skip}
      className={`fixed inset-0 z-[100] cursor-pointer select-none transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background: 'radial-gradient(ellipse at center, #122c52 0%, #0a1525 70%, #040b14 100%)',
      }}
    >
      {/* Scanline + grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(107,204,232,0.08) 0px, rgba(107,204,232,0.08) 1px, transparent 1px, transparent 3px)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 px-6 py-4 flex items-center justify-between font-mono text-[11px] tracking-widest text-[#9ebed4]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#6bcce8] animate-pulse-glow" />
          <span>BOOT · NODE-01 · LIVE</span>
        </div>
        <div className="hidden sm:block text-[#eaf6fb]">
          SAM·DAMEG // {dateLabel}
        </div>
        <AudioBars />
      </div>

      {/* Tracking block top-left */}
      <div className="absolute top-20 left-6 font-mono text-[10px] tracking-widest text-[#9ebed4] leading-relaxed">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block w-[3px] h-3 bg-[#6bcce8]" />
          <span className="text-[#eaf6fb]">TRACKING</span>
        </div>
        <div>LAT 20°47'N</div>
        <div>LON 156°19'W</div>
        <div className="text-[#6a8aa8]">NODE MAUI</div>
      </div>

      {/* Center auth scanner */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[320px] h-[360px] flex flex-col items-center">

          {/* Auth status label */}
          <div className="font-mono text-[11px] tracking-[0.35em] mb-3 text-[#6bcce8]">
            {progress > 92 ? '[ ACCESS GRANTED ]' : '[ AUTHENTICATING ]'}
          </div>

          {/* Hex frame */}
          <div className="relative w-[280px] h-[280px]">
            <svg viewBox="0 0 280 280" className="absolute inset-0 w-full h-full">
              {/* Outer hex */}
              <polygon
                points="75,15 205,15 270,140 205,265 75,265 10,140"
                fill="none"
                stroke="#6bcce8"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              {/* Inner hex */}
              <polygon
                points="95,40 185,40 230,140 185,240 95,240 50,140"
                fill="none"
                stroke="#6bcce8"
                strokeOpacity="0.2"
                strokeWidth="1"
              />
              {/* Vertex tick marks (lit progressively) */}
              {[
                [75, 15], [205, 15], [270, 140], [205, 265], [75, 265], [10, 140],
              ].map(([cx, cy], i) => {
                const lit = (elapsed / DURATION) * 6 > i
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={lit ? 4 : 2.5}
                    fill={lit ? '#b6e3f4' : '#1d3458'}
                    stroke="#6bcce8"
                    strokeWidth="1"
                    style={{
                      filter: lit ? 'drop-shadow(0 0 6px #6bcce8)' : 'none',
                      transition: 'r 200ms, fill 200ms',
                    }}
                  />
                )
              })}
              {/* Subtle grid inside hex */}
              <line x1="140" y1="40" x2="140" y2="240" stroke="#6bcce8" strokeOpacity="0.08" strokeWidth="1" />
              <line x1="50" y1="140" x2="230" y2="140" stroke="#6bcce8" strokeOpacity="0.08" strokeWidth="1" />
            </svg>

            {/* Scan beam (top -> bottom, looping) */}
            <div
              className="absolute left-[50px] right-[50px] h-[2px] pointer-events-none"
              style={{
                top: `${40 + ((elapsed % 1400) / 1400) * 200}px`,
                background: 'linear-gradient(90deg, transparent, #6bcce8, transparent)',
                boxShadow: '0 0 12px #6bcce8',
                opacity: 0.85,
              }}
            />

            {/* SD initials center with glow */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-[#eaf6fb] font-bold text-7xl tracking-tight leading-none"
                style={{ textShadow: '0 0 24px rgba(107,204,232,0.7), 0 0 48px rgba(107,204,232,0.4)' }}
              >
                SD
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#6a8aa8] mt-2">
                NODE-01
              </span>
            </div>
          </div>

          {/* SHA256 fingerprint scrambling */}
          <div className="font-mono text-[11px] tracking-wider mt-4 text-center max-w-[360px]">
            <div className="text-[#6a8aa8] text-[9px] tracking-[0.3em] mb-1">SHA256 FINGERPRINT</div>
            <div className="text-[#eaf6fb] break-all">
              {scrambleHash(elapsed)}
            </div>
            <div className="text-[#6a8aa8] text-[9px] tracking-[0.25em] mt-2">
              → ED25519 SIG · X25519 KEX · TLSv1.3 · AES-256-GCM
            </div>
          </div>
        </div>
      </div>

      {/* Status messages bottom-left */}
      <div className="absolute bottom-16 left-6 font-mono text-[11px] text-[#9ebed4] leading-loose tracking-wider">
        {STAGES.slice(0, stageIdx + 1).map((line, i) => (
          <div key={line} className={i === stageIdx ? 'text-[#eaf6fb]' : 'opacity-60'}>
            {line}
            {i === stageIdx && <span className="ml-1 animate-pulse">_</span>}
          </div>
        ))}
        <div className="mt-1 text-[#6a8aa8]">
          {`> BUFFER ${progress.toFixed(1)}%`}
        </div>
      </div>

      {/* Timecode bottom-right */}
      <div className="absolute bottom-16 right-6 font-mono text-right">
        <div className="text-[#eaf6fb] text-2xl tracking-widest">{tc}</div>
        <div className="text-[#6a8aa8] text-[10px] tracking-widest mt-1">TC · 29.97 NDF</div>
      </div>

      {/* Progress bar bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-4 flex items-center gap-4 font-mono text-[10px] tracking-widest text-[#9ebed4]">
        <span className="text-[#eaf6fb]">BOOTING</span>
        <div className="flex-1 h-1.5 bg-[#1d3458] rounded-sm overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#3aa9d4] via-[#6bcce8] to-[#b6e3f4]"
            style={{ width: `${progress}%`, boxShadow: '0 0 12px rgba(107,204,232,0.6)' }}
          />
        </div>
        <span className="text-[#eaf6fb] tabular-nums">{pad(Math.floor(progress), 3)}%</span>
      </div>

      {/* Skip hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.3em] text-[#6a8aa8] uppercase">
        click or press any key to skip
      </div>
    </div>
  )
}
