import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import GlobalClock from './GlobalClock'

const skills = [
  'Python', 'React', 'FastAPI', 'JavaScript', 'Bash', 'MATLAB', 'C++',
  'Tailwind CSS', 'ArcGIS Pro', 'Google Earth Engine', 'Remote Sensing',
  'Kali Linux', 'Wireshark', 'Jamf MDM', 'HPC / Slurm', 'Cybersecurity',
  'PyTorch', 'scikit-learn', 'MongoDB', 'SQL', 'Git', 'Linux', 'Node.js',
  'QGIS', 'SentinelOne', 'TypeScript',
]

const featured = [
  {
    title: 'NASA ACRES Research',
    desc: 'Mapping wildfire and flood risk in Maui County using satellite remote sensing and AI.',
    accent: '#F4914A',
    url: 'https://nasaacres.github.io/',
    preview: '/nasa-acres.png',
  },
  {
    title: 'Maui Fire Research',
    desc: 'NSF RAPID grant - wildfire spread model validated with NCAR wind data.',
    accent: '#F4914A',
    url: 'https://maui-fire.ikewai.org/',
    preview: '/maui-fire-research.png',
  },
  {
    title: 'Oceanit Climate Change Toolkit',
    desc: 'Environmental monitoring with Python, MATLAB & ReoLink cameras at Oceanit.',
    accent: '#F4A261',
    url: 'https://oceanit.com/how-students-powered-mauis-coastal-community-climate-change-toolkit-program/',
    preview: '/oceanit-logo.png',
    fit: 'contain',
    fitScale: 1.75,
  },
]

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light/dark mode"
      style={{
        display: 'flex', alignItems: 'center', gap: '5px',
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '999px', padding: '5px 8px', cursor: 'pointer',
        transition: 'all 0.15s', flexShrink: 0,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        style={{ color: !isDark ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 0.2s', flexShrink: 0 }}>
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      <div style={{
        position: 'relative', width: '34px', height: '18px',
        borderRadius: '999px', background: isDark ? 'var(--accent)' : 'var(--border-bright)',
        transition: 'background 0.25s', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: '2px', width: '14px', height: '14px',
          borderRadius: '50%', background: 'white',
          left: isDark ? '18px' : '2px',
          transition: 'left 0.25s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        }} />
      </div>

      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        style={{ color: isDark ? 'var(--accent)' : 'var(--text-muted)', transition: 'color 0.2s', flexShrink: 0 }}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  )
}

function ProfileCard() {
  return (
    <div
      className="panel-card"
      style={{ padding: '18px 20px 12px' }}
    >
      <img
        src="/sam-profile.jpg"
        alt="Sam Dameg"
        fetchPriority="high"
        decoding="async"
        style={{
          width: '108px', height: '108px', borderRadius: '18px',
          objectFit: 'cover', border: '2px solid var(--border)',
          marginBottom: '12px', display: 'block',
        }}
        onError={e => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.nextSibling.style.display = 'flex'
        }}
      />
      <div style={{
        display: 'none', width: '108px', height: '108px', borderRadius: '18px',
        background: 'var(--accent)', alignItems: 'center', justifyContent: 'center',
        fontSize: '30px', fontWeight: '800', color: 'white', marginBottom: '12px',
      }}>
        SD
      </div>

      <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text)', margin: '0 0 4px' }}>
        Sam Dameg
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
        <span className="pulse-dot" style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: '#22c55e', display: 'inline-block', flexShrink: 0,
        }} />
        <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '500' }}>
          Available for Work
        </span>
      </div>

      <p style={{ fontSize: '14px', lineHeight: '1.55', color: 'var(--text-secondary)', margin: '0 0 12px' }}>
        CS student at{' '}
        <strong style={{ color: 'var(--text)', fontWeight: '600' }}>Oregon State University</strong>{' '}
        and IT professional specializing in{' '}
        <strong style={{ color: 'var(--text)', fontWeight: '600' }}>cybersecurity</strong>,{' '}
        <strong style={{ color: 'var(--text)', fontWeight: '600' }}>software engineering</strong>, and{' '}
        <strong style={{ color: 'var(--accent)', fontWeight: '600' }}>AI & geospatial systems</strong>.
        Based in Maui, Hawaii.
      </p>

      {/* Skills marquee (bleeds to card edges) */}
      <div
        className="marquee-wrapper"
        style={{ margin: '0 -20px -12px', padding: '2px 0 10px' }}
      >
        <div className="marquee-track" style={{ gap: '6px', padding: '0 20px' }}>
          {[...skills, ...skills].map((s, i) => (
            <span key={i} style={{
              padding: '3px 10px',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              background: 'var(--bg-card)',
              transition: 'all 0.15s',
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeaturedCard() {
  return (
    <div
      className="panel-card"
      style={{
        padding: '14px 20px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <p className="section-header" style={{ marginBottom: '6px', flexShrink: 0 }}>Featured Work</p>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        minHeight: 0,
      }}>
      {featured.map((p, i) => (
        <a
          key={p.title}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', gap: '12px', alignItems: 'center',
            padding: '10px 0',
            borderBottom: i < featured.length - 1 ? '1px solid var(--border)' : 'none',
            textDecoration: 'none', transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <div style={{
            width: '52px', height: '52px', borderRadius: '10px', flexShrink: 0,
            overflow: 'hidden', border: '1px solid var(--border)',
            background: p.preview ? (p.fit === 'contain' ? '#ffffff' : undefined) : `${p.accent}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0,
          }}>
            {p.preview ? (
              <img
                src={p.preview}
                alt={p.title}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: p.fit || 'cover',
                  transform: p.fitScale ? `scale(${p.fitScale})` : undefined,
                }}
              />
            ) : (
              <span style={{ fontSize: '26px', fontWeight: '800', color: p.accent }}>
                {p.title[0]}
              </span>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', marginBottom: '3px' }}>
              {p.title}
            </div>
            <div style={{
              fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: '1.45',
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {p.desc}
            </div>
          </div>
        </a>
      ))}
      </div>
    </div>
  )
}

function ContactCard() {
  return (
    <div className="panel-card" style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text)', margin: '0 0 6px' }}>
        Let's Connect
      </h2>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: '1.65', marginTop: 0 }}>
        Open to opportunities in tech and research collaborations.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { label: 'Email', value: 'samvista808@gmail.com', href: 'mailto:samvista808@gmail.com' },
          { label: 'LinkedIn', value: 'linkedin.com/in/samdameg', href: 'https://www.linkedin.com/in/samdameg/' },
          { label: 'GitHub', value: 'github.com/SammyCode002', href: 'https://github.com/SammyCode002' },
          { label: 'Location', value: 'Maui, Hawaiʻi', href: null },
        ].map(({ label, value, href }) => (
          <div key={label} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{
              fontSize: '10px', color: 'var(--text-muted)', width: '52px', flexShrink: 0,
              fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              {label}
            </span>
            {href ? (
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                style={{ fontSize: '12.5px', color: 'var(--accent)', textDecoration: 'none' }}>
                {value}
              </a>
            ) : (
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const SUGGESTED_QUESTIONS = [
  "What got you into cybersecurity?",
  "Tell me about your NSF RAPID research.",
  "What's your favorite project so far?",
  "How can we collaborate?",
]

function PromptCard() {
  const [message, setMessage] = useState('')
  const [showQuestions, setShowQuestions] = useState(false)

  const send = e => {
    e.preventDefault()
    const body = message.trim()
    if (!body) return
    window.location.href = `mailto:samvista808@gmail.com?subject=${encodeURIComponent('Portfolio - Hello')}&body=${encodeURIComponent(body)}`
  }

  const pickQuestion = q => {
    setMessage(q)
    setShowQuestions(false)
  }

  return (
    <div
      className="panel-card"
      style={{
        flex: 1,
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 0,
      }}
    >
      {/* Heading */}
      <h3 style={{
        fontSize: '15px',
        fontWeight: '700',
        color: 'var(--text)',
        margin: '0 0 10px',
        position: 'relative',
        zIndex: 1,
      }}>
        Want to ask me a question?
      </h3>

      {/* Suggested question chips */}
      {showQuestions && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '14px',
          position: 'relative',
          zIndex: 2,
          animation: 'fadeInUp 0.35s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button
              key={q}
              type="button"
              onClick={() => pickQuestion(q)}
              style={{
                background: 'var(--accent)',
                border: 'none',
                color: 'white',
                fontSize: '12.5px',
                fontWeight: '500',
                fontFamily: 'Inter, sans-serif',
                padding: '9px 14px',
                borderRadius: '999px',
                cursor: 'pointer',
                textAlign: 'left',
                lineHeight: '1.35',
                width: 'fit-content',
                maxWidth: '78%',
                boxShadow: '0 2px 8px rgba(232, 98, 42, 0.25)',
                transition: 'transform 0.15s, box-shadow 0.15s',
                animation: `fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms both`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateX(3px)'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(232, 98, 42, 0.35)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(232, 98, 42, 0.25)'
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Hint when collapsed */}
      {!showQuestions && (
        <p style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
          margin: '0 0 12px',
          maxWidth: '55%',
          lineHeight: '1.5',
          position: 'relative',
          zIndex: 1,
        }}>
          Click me for suggestions <span style={{ color: 'var(--accent)' }}>↘</span>
        </p>
      )}

      {/* Character — clickable */}
      <button
        type="button"
        className="character-btn"
        onClick={() => setShowQuestions(v => !v)}
        aria-label={showQuestions ? 'Hide suggested questions' : 'Show suggested questions'}
        style={{
          position: 'absolute',
          right: '0px',
          bottom: '95px',
          width: '220px',
          height: 'auto',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          maxHeight: 'calc(100% - 145px)',
          transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1)',
          zIndex: 1,
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04) rotate(-2deg)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
      >
        <img
          src="/sam-character.png"
          alt="Sam character — click to see suggested questions"
          loading="lazy"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            pointerEvents: 'none',
            objectFit: 'contain',
          }}
        />
      </button>

      <form
        onSubmit={send}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '6px 8px 6px 16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '999px',
          transition: 'border-color 0.15s',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Ask, write or say hi..."
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text)', fontSize: '14px', padding: '10px 0',
            fontFamily: 'Inter, sans-serif',
            minWidth: 0,
          }}
        />
        <button
          type="submit"
          aria-label="Send message"
          disabled={!message.trim()}
          style={{
            width: '38px', height: '38px', borderRadius: '50%',
            border: 'none', background: message.trim() ? 'var(--accent)' : 'var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: message.trim() ? 'pointer' : 'not-allowed',
            flexShrink: 0,
            transition: 'background 0.15s, transform 0.15s',
          }}
          onMouseEnter={e => { if (message.trim()) e.currentTarget.style.transform = 'scale(1.08)' }}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  )
}

function FooterCard({ view, emailCopied, copyEmail }) {
  return (
    <div
      className="panel-card"
      style={{
        padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: '6px',
      }}
    >
      {view === 'contact' ? (
        <button
          onClick={copyEmail}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '5px 10px', cursor: 'pointer',
            fontSize: '11px', color: emailCopied ? 'var(--accent)' : 'var(--text-secondary)',
            fontFamily: 'Inter, sans-serif', transition: 'all 0.15s', minWidth: 0, overflow: 'hidden',
          }}
          title="Copy email"
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {emailCopied ? '✓ Copied!' : 'samvista808@gmail.com'}
          </span>
          {!emailCopied && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          )}
        </button>
      ) : (
        <span style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          fontWeight: '500',
          letterSpacing: '0.02em',
          paddingLeft: '4px',
        }}>
          Built & designed by <strong style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Sam Dameg</strong>
        </span>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px', flexShrink: 0 }}>
        {[
          {
            href: 'https://github.com/SammyCode002', label: 'GitHub',
            icon: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
          },
          {
            href: 'https://www.linkedin.com/in/samdameg/', label: 'LinkedIn',
            icon: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>,
          },
          {
            href: 'https://www.credly.com/users/sam-dameg/badges', label: 'Credly',
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><circle cx="12" cy="8" r="6" /><path d="M8.56 13.89L7 22l5-3 5 3-1.56-8.11" /></svg>,
          },
        ].map(({ href, label, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={{
              width: '28px', height: '28px', borderRadius: '7px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.15s',
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
  )
}

export default function LeftPanel() {
  const [view, setView] = useState('info')
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('samvista808@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <aside className="left-panel">
      {/* Toolbar - floating row above the cards */}
      <div className="panel-toolbar">
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'var(--accent)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '11px', fontWeight: '800',
          color: 'white', flexShrink: 0, letterSpacing: '0.02em',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
        }}>
          SD
        </div>

        <div className="toggle-pill">
          <button className={view === 'info' ? 'active' : ''} onClick={() => setView('info')}>
            Info {view === 'info' ? '⊖' : '⊕'}
          </button>
          <button className={view === 'contact' ? 'active' : ''} onClick={() => setView('contact')}>
            Contact {view === 'contact' ? '⊖' : '⊕'}
          </button>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <GlobalClock />
          <ThemeToggle />
        </div>
      </div>

      {/* Content cards */}
      {view === 'info' ? (
        <>
          <ProfileCard />
          <FeaturedCard />
        </>
      ) : (
        <>
          <ContactCard />
          <PromptCard />
        </>
      )}

      {/* Footer card */}
      <FooterCard view={view} emailCopied={emailCopied} copyEmail={copyEmail} />
    </aside>
  )
}
