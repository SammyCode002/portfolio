import { useEffect, useState } from 'react'

function formatUtc(d) {
  const pad = n => String(n).padStart(2, '0')
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
      style={{
        display: 'flex', alignItems: 'center', gap: '5px',
        padding: '4px 8px', borderRadius: '6px',
        border: '1px solid var(--border)', background: 'var(--bg-card)',
        fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.06em',
        transition: 'all 0.2s', flexShrink: 0,
      }}
      title="Current UTC time"
    >
      <span className="pulse-dot" style={{
        width: '5px', height: '5px', borderRadius: '50%',
        background: 'var(--accent)', display: 'inline-block', flexShrink: 0,
      }} />
      <span style={{ color: 'var(--text-muted)' }}>UTC</span>
      <span style={{ color: 'var(--text-secondary)' }}>{formatUtc(now)}</span>
    </div>
  )
}
