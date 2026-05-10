import { useEffect, useState } from 'react'

function formatUtc(d) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`
}

export default function GlobalClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#1d3458] bg-[#0a1525]/60 font-mono text-[11px] tracking-widest"
      title="Current UTC time"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#6bcce8] animate-pulse-glow" />
      <span className="text-[#6a8aa8]">[UTC]</span>
      <span className="text-[#eaf6fb]">{formatUtc(now)}</span>
    </div>
  )
}
