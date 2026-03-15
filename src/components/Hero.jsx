import { useEffect, useRef, useState } from 'react'

function GlobeAnimation() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ nx: 0, ny: 0 })
  const stateRef = useRef({ t: 0, satAngles: [0, 2.1, 4.3] })
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const W = 280, H = 310, cx = W / 2, cy = H / 2
    const R = 100

    // Globe dots: latitude rings + meridians
    const globeDots = []
    const latLines = [-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75]
    for (const lat of latLines) {
      const phi = (lat * Math.PI) / 180
      const count = Math.max(6, Math.round(60 * Math.abs(Math.cos(phi))))
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2
        globeDots.push({ phi, theta, isEquator: lat === 0 })
      }
    }
    for (let m = 0; m < 12; m++) {
      const theta = (m / 12) * Math.PI * 2
      for (let lat = -82; lat <= 82; lat += 5) {
        const phi = (lat * Math.PI) / 180
        globeDots.push({ phi, theta, isMeridian: true })
      }
    }

    // Orbital rings: inclination + longitude of ascending node
    const orbits = [
      { inc: 0.45, lan: 0.3, r: R * 1.35, speed: 0.009, color: '#00d4d4' },
      { inc: -0.8, lan: 2.0, r: R * 1.28, speed: 0.006, color: '#14b8a6' },
      { inc: 1.15, lan: 3.7, r: R * 1.42, speed: 0.013, color: '#06b6d4' },
    ]

    // Pre-compute static ring dot positions (no globe spin — rings are fixed in space)
    const orbitRings = orbits.map((orbit) => {
      const pts = []
      for (let a = 0; a < Math.PI * 2; a += 0.07) {
        pts.push({
          x: orbit.r * (Math.cos(orbit.lan) * Math.cos(a) - Math.sin(orbit.lan) * Math.sin(a) * Math.cos(orbit.inc)),
          y: orbit.r * (Math.sin(orbit.inc) * Math.sin(a)),
          z: orbit.r * (Math.sin(orbit.lan) * Math.cos(a) + Math.cos(orbit.lan) * Math.sin(a) * Math.cos(orbit.inc)),
        })
      }
      return pts
    })

    function getSatPos(orbit, angle) {
      return {
        x: orbit.r * (Math.cos(orbit.lan) * Math.cos(angle) - Math.sin(orbit.lan) * Math.sin(angle) * Math.cos(orbit.inc)),
        y: orbit.r * (Math.sin(orbit.inc) * Math.sin(angle)),
        z: orbit.r * (Math.sin(orbit.lan) * Math.cos(angle) + Math.cos(orbit.lan) * Math.sin(angle) * Math.cos(orbit.inc)),
      }
    }

    const rotY = (v, a) => ({
      x: v.x * Math.cos(a) + v.z * Math.sin(a),
      y: v.y,
      z: -v.x * Math.sin(a) + v.z * Math.cos(a),
    })
    const rotX = (v, a) => ({
      x: v.x,
      y: v.y * Math.cos(a) - v.z * Math.sin(a),
      z: v.y * Math.sin(a) + v.z * Math.cos(a),
    })

    function applyTilt(v) {
      return rotY(rotX(v, mouseRef.current.ny * 0.7), mouseRef.current.nx * 0.7)
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      const s = stateRef.current
      s.t += 0.004
      s.satAngles = s.satAngles.map((a, i) => a + orbits[i].speed)

      // Subtle background glow
      const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.15)
      bgGlow.addColorStop(0, 'rgba(0,212,212,0.07)')
      bgGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = bgGlow
      ctx.fillRect(0, 0, W, H)

      // Collect all elements for z-sorting
      const elements = []

      // Globe dots (spin with time t)
      for (const dot of globeDots) {
        const theta = dot.theta + s.t
        let v = {
          x: R * Math.cos(dot.phi) * Math.cos(theta),
          y: R * Math.sin(dot.phi),
          z: R * Math.cos(dot.phi) * Math.sin(theta),
        }
        v = applyTilt(v)
        elements.push({ kind: 'globe', ...v, isEquator: dot.isEquator, isMeridian: dot.isMeridian })
      }

      // Orbit ring dots (fixed in space, only tilt)
      for (let oi = 0; oi < orbits.length; oi++) {
        for (const pt of orbitRings[oi]) {
          const v = applyTilt(pt)
          elements.push({ kind: 'ring', ...v, oi })
        }
        const sv = applyTilt(getSatPos(orbits[oi], s.satAngles[oi]))
        elements.push({ kind: 'sat', ...sv, oi })
      }

      // Sort back to front
      elements.sort((a, b) => a.z - b.z)

      const maxR = R * 1.5
      for (const el of elements) {
        const nz = (el.z + maxR) / (maxR * 2) // 0=back, 1=front

        if (el.kind === 'globe') {
          if (el.z < -R * 0.05) continue
          const alpha = Math.pow(nz, 1.4) * 0.9
          const size = nz * 2.8 + 0.4
          ctx.globalAlpha = alpha * (el.isEquator ? 1.5 : 1)
          ctx.fillStyle = el.isEquator ? '#00ffff' : el.isMeridian ? '#14b8a6' : '#00d4d4'
          ctx.fillRect(cx + el.x - size / 2, cy - el.y - size / 2, size, size)

        } else if (el.kind === 'ring') {
          ctx.globalAlpha = nz * 0.2 + 0.04
          ctx.fillStyle = orbits[el.oi].color
          ctx.fillRect(cx + el.x - 1, cy - el.y - 1, 1.8, 1.8)

        } else if (el.kind === 'sat') {
          const alpha = nz * 0.7 + 0.3
          // Glow halo
          ctx.globalAlpha = alpha * 0.45
          const gr = ctx.createRadialGradient(cx + el.x, cy - el.y, 0, cx + el.x, cy - el.y, 11)
          gr.addColorStop(0, orbits[el.oi].color)
          gr.addColorStop(1, 'transparent')
          ctx.fillStyle = gr
          ctx.beginPath()
          ctx.arc(cx + el.x, cy - el.y, 11, 0, Math.PI * 2)
          ctx.fill()
          // Core dot
          ctx.globalAlpha = alpha
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(cx + el.x, cy - el.y, 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const onMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    mouseRef.current = {
      nx: (e.clientX - rect.left - 140) / 280,
      ny: (e.clientY - rect.top - 155) / 310,
    }
  }
  const onMouseLeave = () => { mouseRef.current = { nx: 0, ny: 0 } }

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={310}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'crosshair', display: 'block' }}
    />
  )
}

function TypewriterHeading() {
  const FULL = 'hi, Sam here.'
  // Segment boundaries: "hi, " = 0-4, "Sam" = 4-7, " here." = 7-13
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const delay = setTimeout(() => {
      const id = setInterval(() => {
        i++
        setCount(i)
        if (i >= FULL.length) {
          clearInterval(id)
          setDone(true)
        }
      }, 85)
      return () => clearInterval(id)
    }, 500)
    return () => clearTimeout(delay)
  }, [])

  const part1 = FULL.slice(0, Math.min(count, 4))
  const part2 = FULL.slice(4, Math.min(count, 7))
  const part3 = FULL.slice(7, Math.min(count, 13))

  return (
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
      <span className="text-[#e8f4f4]">{part1}</span>
      <span className="gradient-text glow-cyan-text">{part2}</span>
      <span className="text-[#e8f4f4]">{part3}</span>
      <span
        className="text-[#00d4d4]"
        style={{ animation: done ? 'blink 1s step-end infinite' : 'none' }}
      >|</span>
    </h1>
  )
}

export default function Hero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      setOffset({
        x: (e.clientX - cx) * 0.018,
        y: (e.clientY - cy) * 0.018,
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
      style={{ background: '#050c0c' }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00d4d4, transparent)' }}
      />
      <div
        className="absolute bottom-1/3 left-1/5 w-64 h-64 rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #14b8a6, transparent)' }}
      />
      <div
        className="absolute top-2/3 right-1/3 w-48 h-48 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-24">

        {/* Globe animation */}
        <div className="hidden lg:flex justify-center items-center">
          <div
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px)`,
              transition: 'transform 0.15s ease-out',
              willChange: 'transform',
              filter: 'drop-shadow(0 0 24px rgba(0,212,212,0.18))',
            }}
          >
            <GlobeAnimation />
          </div>
        </div>

        {/* Text content */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4d4]/5 border border-[#00d4d4]/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
            <span className="text-sm font-medium text-[#00d4d4]">Available for Work</span>
          </div>

          <TypewriterHeading />

          <p className="text-[#7a9e9e] text-lg max-w-lg mb-10 leading-relaxed">
            Computer Science student and IT professional specializing in{' '}
            <span className="text-[#00d4d4]">cybersecurity</span>,{' '}
            <span className="text-[#14b8a6]">software engineering</span>, and{' '}
            <span className="text-[#00d4d4]">GIS</span>. Based in Maui, Hawaii.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="group flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#00d4d4] text-[#050c0c] font-semibold text-sm hover:bg-[#00bcbc] transition-all no-underline glow-cyan"
            >
              View Projects
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl border border-[#1a3232] text-[#e8f4f4] font-semibold text-sm hover:border-[#00d4d4]/40 hover:bg-[#00d4d4]/5 transition-all no-underline"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[#4a6e6e] text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#4a6e6e] to-transparent" />
      </div>
    </section>
  )
}
