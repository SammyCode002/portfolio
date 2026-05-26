import { useEffect, useState } from 'react'

const FULL = "Hi, I'm Sam"
const NAME_START = 8 // index of "Sam"
const NAME_END = 11

export default function Intro() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    let intervalId = null
    const start = setTimeout(() => {
      intervalId = setInterval(() => {
        i++
        setCount(i)
        if (i >= FULL.length) {
          clearInterval(intervalId)
          intervalId = null
          setDone(true)
        }
      }, 90)
    }, 500)
    return () => {
      clearTimeout(start)
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  const part1 = FULL.slice(0, Math.min(count, NAME_START))
  const part2 = FULL.slice(NAME_START, Math.min(count, NAME_END))

  return (
    <section
      id="intro"
      className="panel-card"
      style={{
        padding: '64px 32px 56px',
        textAlign: 'left',
        scrollMarginTop: '72px',
        animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: '800',
          color: 'var(--text)',
          margin: 0,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
        }}
      >
        <span>{part1}</span>
        <span style={{ color: 'var(--accent)' }}>{part2}</span>
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            marginLeft: '4px',
            color: 'var(--accent)',
            animation: done ? 'blink 1s step-end infinite' : 'none',
          }}
        >
          |
        </span>
      </h1>

    </section>
  )
}
