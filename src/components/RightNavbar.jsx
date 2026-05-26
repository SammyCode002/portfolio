import { useEffect, useState } from 'react'

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/samdameg/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/SammyCode002',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:samvista808@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
]

const NAV_OFFSET = 72

const NAV_LINK_DEFS = [
  { id: 'projects', label: 'projects' },
  { id: 'press', label: 'press' },
  { id: 'experience', label: 'experience' },
  { id: 'education', label: 'education' },
]

export default function RightNavbar() {
  const [active, setActive] = useState('intro')

  useEffect(() => {
    const panel = document.querySelector('.right-panel')
    if (!panel) return

    const computeActive = () => {
      const introEl = document.getElementById('intro')
      const projectsEl = document.getElementById('projects')
      const pressEl = document.getElementById('press')
      const expEl = document.getElementById('experience')
      const eduEl = document.getElementById('education')
      const y = panel.scrollTop + NAV_OFFSET + 24
      if (eduEl && y >= eduEl.offsetTop) setActive('education')
      else if (expEl && y >= expEl.offsetTop) setActive('experience')
      else if (pressEl && y >= pressEl.offsetTop) setActive('press')
      else if (projectsEl && y >= projectsEl.offsetTop) setActive('projects')
      else if (introEl) setActive('intro')
    }

    computeActive() // initial sync (handles refresh-with-scroll, hash nav)
    panel.addEventListener('scroll', computeActive, { passive: true })
    window.addEventListener('resize', computeActive)
    return () => {
      panel.removeEventListener('scroll', computeActive)
      window.removeEventListener('resize', computeActive)
    }
  }, [])

  const scrollTo = (id) => {
    const panel = document.querySelector('.right-panel')
    const el = document.getElementById(id)
    if (!panel || !el) return
    panel.scrollTo({ top: el.offsetTop - NAV_OFFSET, behavior: 'smooth' })
  }

  const scrollTop = () => {
    const panel = document.querySelector('.right-panel')
    if (panel) panel.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinks = NAV_LINK_DEFS.map(link => ({
    ...link,
    action: link.external ? () => window.open(link.external, '_blank') : () => scrollTo(link.id),
  }))

  return (
    <nav
      className="panel-card"
      style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'var(--bg)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        flexShrink: 0,
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '0 20px', height: '56px', gap: '32px',
      }}>
        {/* Name / logo */}
        <button
          onClick={scrollTop}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '17px', fontWeight: '700', color: 'var(--accent)',
            fontFamily: 'Inter, sans-serif', padding: 0, flexShrink: 0,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Sam Dameg
        </button>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {navLinks.map(({ id, label, action }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={action}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '14px', fontWeight: isActive ? '600' : '400',
                  color: isActive ? 'var(--text)' : 'var(--text-muted)',
                  fontFamily: 'Inter, sans-serif', padding: '0 0 2px',
                  borderBottom: isActive ? '1.5px solid var(--accent)' : '1.5px solid transparent',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)'
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Social icons */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '2px' }}>
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: '32px', height: '32px', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', textDecoration: 'none',
                transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--accent)'
                e.currentTarget.style.background = 'var(--accent-dim)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-muted)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
