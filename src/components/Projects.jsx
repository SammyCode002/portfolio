const projects = [
  {
    title: 'Maui Alert Hub',
    description: 'Real-time hyperlocal dashboard for Maui residents. Aggregates road closures, NWS weather alerts, USGS earthquakes, NOAA surf, tsunami warnings, and EPA air quality into one mobile-first PWA. Web Push notifications fire when a saved route is affected.',
    tags: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind', 'Web Push', 'PWA'],
    primaryLink: { url: 'https://maui-alert-hub.vercel.app', label: 'Live Site' },
    secondaryLink: { url: 'https://github.com/SammyCode002/maui-alert-hub', label: 'GitHub' },
    accent: '#fb923c',
    preview: null,
    live: true,
  },
  {
    title: 'Sam Dameg Portfolio v3',
    description: 'The site you are looking at. Lofi anime aesthetic split-panel portfolio built with Vite and React 19. Features an interactive character with click-to-reveal suggested questions, scroll-triggered animations, light/dark theme via CSS variables, a featured project carousel with embedded ArcGIS maps, and a Cyberrunner Phaser sub-page.',
    tags: ['React 19', 'Vite 7', 'Tailwind CSS', 'CSS Variables', 'Phaser', 'IntersectionObserver'],
    primaryLink: { url: 'https://portfolio-hazel-eight-1eo8p12f3a.vercel.app/', label: 'Live Site' },
    secondaryLink: { url: 'https://github.com/SammyCode002/portfolio', label: 'GitHub' },
    accent: '#E8622A',
    preview: null,
    live: true,
  },
  {
    title: 'Lahaina Fire Timeline',
    description: "Time-aware geospatial reconstruction of the August 2023 Lahaina fire on Maui. Combines NWS weather warnings, Maui Fire Department response events from the FSRI Comprehensive Timeline Report (Kerber & Alkonis, 2024), and the official NIFC perimeter into one interactive ArcGIS StoryMap with a 24-second animation.",
    tags: ['ArcGIS Pro', 'StoryMap', 'Python', 'arcpy', 'FSRI', 'NIFC', 'Time-Aware Mapping'],
    primaryLink: { url: 'https://storymaps.arcgis.com/stories/3091de027daf4f98be72fd5a347486d2', label: 'View StoryMap' },
    secondaryLink: { url: 'https://uhmc.maps.arcgis.com/apps/mapviewer/index.html?webmap=9ec382f8da774a8e9f07a05e33b6c1b9', label: 'Web Map' },
    accent: '#F4A261',
    preview: null,
    live: true,
  },
]

import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import { useTheme } from '../context/ThemeContext'

function ExternalIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function GitHubIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function linkIcon(link, size) {
  const isGit = link?.label?.toLowerCase().includes('github') || link?.url?.includes('github.com')
  return isGit ? <GitHubIcon size={size} /> : <ExternalIcon size={size} />
}

function ProjectCard({ project, index }) {
  const reveal = useScrollReveal(index * 70)
  return (
    <div ref={reveal.ref} style={{ ...reveal.style, height: '100%' }}>
    <article className="proj-card">
      {/* Preview image */}
      {project.preview ? (
        <div style={{ position: 'relative', width: '100%', height: '160px', overflow: 'hidden' }}>
          <img
            src={project.preview}
            alt={project.title}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 50%, var(--bg) 100%)',
          }} />
          {/* Badges */}
          <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
            {project.live && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '2px 8px', borderRadius: '999px',
                background: 'rgba(15,15,15,0.75)', backdropFilter: 'blur(6px)',
                fontSize: '10px', fontWeight: '600', color: '#22c55e',
                border: '1px solid rgba(34,197,94,0.3)',
              }}>
                <span style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: '#22c55e', display: 'inline-block',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }} />
                Live
              </span>
            )}
            {project.soon && (
              <span style={{
                padding: '2px 8px', borderRadius: '999px',
                background: 'rgba(15,15,15,0.75)', backdropFilter: 'blur(6px)',
                fontSize: '10px', fontWeight: '600', color: 'var(--text-secondary)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                Coming Soon
              </span>
            )}
          </div>
        </div>
      ) : (
        /* Slim accent bar when no image */
        <div style={{
          height: '4px',
          background: project.accent,
        }} />
      )}

      {/* Content */}
      <div style={{ padding: '16px 18px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Accent line + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, marginBottom: '8px' }}>
          <div style={{ width: '3px', height: '16px', borderRadius: '2px', background: project.accent, flexShrink: 0 }} />
          <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text)', margin: 0 }}>
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '14px', lineHeight: '1.65', color: 'var(--text-secondary)',
          margin: '0 0 12px',
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              padding: '2px 8px', borderRadius: '999px',
              background: 'var(--bg-panel)', border: '1px solid var(--border)',
              fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {!project.soon && (
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '14px',
            paddingTop: '12px',
            borderTop: '1px solid var(--border)',
            marginTop: 'auto',
          }}>
            <a
              href={project.primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '12.5px', fontWeight: '600', color: project.accent,
                textDecoration: 'none', transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {linkIcon(project.primaryLink)}
              {project.primaryLink.label}
            </a>
            {project.secondaryLink && (
              <a
                href={project.secondaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '12.5px', fontWeight: '500', color: 'var(--text-secondary)',
                  textDecoration: 'none', transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = project.accent}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {linkIcon(project.secondaryLink)}
                {project.secondaryLink.label}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
    </div>
  )
}

// Featured projects shown in the carousel (separate from the bottom grid).
// Add `embed` for an interactive iframe; otherwise the hero accent gradient renders.
const featuredProjects = [
  {
    title: 'Lahaina Fire Timeline',
    description: "Interactive time-aware ArcGIS web map of the August 2023 Lahaina fire. Combines NWS weather warnings, Maui Fire Department response events from the FSRI Comprehensive Timeline Report (Kerber & Alkonis, 2024), and the official NIFC perimeter. Use the time slider at the bottom to scrub through events.",
    tags: ['ArcGIS Pro', 'Python', 'arcpy', 'FSRI', 'NIFC', 'Time-Aware Mapping'],
    primaryLink: { url: 'https://storymaps.arcgis.com/stories/3091de027daf4f98be72fd5a347486d2', label: 'View StoryMap' },
    secondaryLink: { url: 'https://uhmc.maps.arcgis.com/apps/mapviewer/index.html?webmap=9ec382f8da774a8e9f07a05e33b6c1b9', label: 'Open Full Map' },
    accent: '#F4A261',
    embedType: 'arcgis-map',
    arcgisItemId: '9ec382f8da774a8e9f07a05e33b6c1b9',
    arcgisCenter: '-156.62126978623857,20.891954755583107',
    arcgisScale: '72223.819286',
    arcgisPortal: 'https://uhmc.maps.arcgis.com',
    embedHeight: 520,
    live: true,
  },
  {
    title: 'Vault Password Manager',
    description: 'Local-only desktop password manager built in Python. AES-128-CBC encryption via Fernet, PBKDF2-SHA256 key derivation at 600,000 iterations, HMAC-SHA256 tamper detection. Includes password generator with entropy meter, CSV import/export, auto-lock on idle, and a clean Tkinter UI.',
    tags: ['Python', 'Cryptography', 'Fernet', 'PBKDF2', 'HMAC-SHA256', 'Tkinter', 'SQLite'],
    primaryLink: { url: 'https://github.com/SammyCode002/vault-password-manager', label: 'View on GitHub' },
    accent: '#E8622A',
    embedHeight: 360,
    live: false,
  },
]

function FeaturedCarousel({ activeIndex, setActiveIndex }) {
  const list = featuredProjects
  const project = list[activeIndex]
  const total = list.length
  const showArrows = total > 1
  const { theme } = useTheme()
  const next = () => setActiveIndex((activeIndex + 1) % total)
  const prev = () => setActiveIndex((activeIndex - 1 + total) % total)

  const renderEmbed = () => {
    if (project.embedType === 'arcgis-map') {
      // ArcGIS embeddable map component (loaded via script tag in index.html)
      return (
        <arcgis-embedded-map
          style={{ width: '100%', height: '100%', display: 'block' }}
          item-id={project.arcgisItemId}
          theme={theme === 'dark' ? 'dark' : 'light'}
          bookmarks-enabled=""
          heading-enabled=""
          legend-enabled=""
          information-enabled=""
          share-enabled=""
          basemap-gallery-enabled=""
          time-zone-label-enabled=""
          center={project.arcgisCenter}
          scale={project.arcgisScale}
          portal-url={project.arcgisPortal}
        />
      )
    }
    if (project.embed) {
      return (
        <iframe
          src={project.embed}
          title={`${project.title} live embed`}
          style={{
            width: '100%', height: '100%',
            border: 'none',
            display: 'block',
          }}
          loading="lazy"
          allow="fullscreen; geolocation"
          allowFullScreen
        />
      )
    }
    if (project.preview) {
      return (
        <img
          src={project.preview}
          alt={project.title}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: 0.7,
          }}
        />
      )
    }
    return null
  }

  return (
    <div style={{
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'var(--bg-card)',
      marginBottom: '24px',
    }}>
      {/* Hero area: interactive embed if available, else preview image, else accent gradient */}
      <div style={{
        height: (project.embedType || project.embed) ? `${project.embedHeight || 420}px` : '120px',
        background: `linear-gradient(135deg, ${project.accent}55 0%, ${project.accent}18 60%, var(--bg-card) 100%)`,
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}>
        {renderEmbed()}

        {/* Badges - floating over the hero/embed */}
        <div style={{
          position: 'absolute', top: '14px', left: '18px',
          display: 'flex', gap: '6px',
          pointerEvents: 'none',
          zIndex: 1,
        }}>
          {project.live && (
            <span style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '3px 10px', borderRadius: '999px',
              background: 'rgba(15,15,15,0.85)', backdropFilter: 'blur(6px)',
              fontSize: '10px', fontWeight: '600', color: '#22c55e',
              border: '1px solid rgba(34,197,94,0.3)',
            }}>
              <span style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: '#22c55e', display: 'inline-block',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
              Live
            </span>
          )}
          <span style={{
            padding: '3px 10px', borderRadius: '999px',
            background: project.accent,
            fontSize: '10px', fontWeight: '700', color: 'white',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}>
            {total > 1 ? `Featured · ${activeIndex + 1} / ${total}` : 'Featured'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 28px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{ width: '4px', height: '22px', borderRadius: '2px', background: project.accent }} />
          <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text)', margin: 0 }}>
            {project.title}
          </h3>
        </div>

        <p style={{
          fontSize: '14.5px', lineHeight: '1.65', color: 'var(--text-secondary)',
          margin: '0 0 14px', maxWidth: '780px',
        }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              padding: '3px 9px', borderRadius: '999px',
              background: 'var(--bg-panel)', border: '1px solid var(--border)',
              fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {!project.soon && (
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '16px',
            paddingTop: '14px',
            borderTop: '1px solid var(--border)',
          }}>
            <a
              href={project.primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '13px', fontWeight: '600', color: project.accent,
                textDecoration: 'none', transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {linkIcon(project.primaryLink)}
              {project.primaryLink.label}
            </a>
            {project.secondaryLink && (
              <a
                href={project.secondaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)',
                  textDecoration: 'none', transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = project.accent}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {linkIcon(project.secondaryLink)}
                {project.secondaryLink.label}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Left arrow */}
      {showArrows && <button
        type="button"
        onClick={prev}
        aria-label="Previous project"
        style={{
          position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
          width: '38px', height: '38px', borderRadius: '50%',
          background: 'var(--bg)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          transition: 'all 0.15s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          zIndex: 2,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = project.accent
          e.currentTarget.style.color = 'white'
          e.currentTarget.style.borderColor = project.accent
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--bg)'
          e.currentTarget.style.color = 'var(--text-secondary)'
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>}

      {/* Right arrow */}
      {showArrows && <button
        type="button"
        onClick={next}
        aria-label="Next project"
        style={{
          position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
          width: '38px', height: '38px', borderRadius: '50%',
          background: 'var(--bg)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          transition: 'all 0.15s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          zIndex: 2,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = project.accent
          e.currentTarget.style.color = 'white'
          e.currentTarget.style.borderColor = project.accent
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--bg)'
          e.currentTarget.style.color = 'var(--text-secondary)'
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>}
    </div>
  )
}

export default function Projects() {
  const headerReveal = useScrollReveal(0)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="projects" className="panel-card" style={{ padding: '24px', scrollMarginTop: '72px', overflow: 'visible' }}>
      {/* Header */}
      <div ref={headerReveal.ref} style={{
        ...headerReveal.style,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text)', margin: 0 }}>
            Projects
          </h2>
          <span style={{
            padding: '1px 8px', borderRadius: '999px',
            background: 'var(--accent-dim)', border: '1px solid var(--accent)',
            fontSize: '10px', fontWeight: '600', color: 'var(--accent)',
          }}>
            {projects.length}
          </span>
        </div>
        <a
          href="https://github.com/SammyCode002"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          View all on GitHub
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>

      {/* Featured carousel - showcase items with embeds */}
      <FeaturedCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

      {/* Pagination dots (only when multiple featured) */}
      {featuredProjects.length > 1 && (
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '8px',
          marginBottom: '24px',
        }}>
          {featuredProjects.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Show featured project ${i + 1}`}
              style={{
                width: i === activeIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '999px',
                background: i === activeIndex ? p.accent : 'var(--border)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Original 3-card grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
