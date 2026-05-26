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
    title: 'Vault Password Manager',
    description: 'Local-only desktop password manager built in Python. AES-128-CBC encryption via Fernet, PBKDF2-SHA256 key derivation at 600,000 iterations, HMAC-SHA256 tamper detection. Includes password generator with entropy meter, CSV import/export, and auto-lock.',
    tags: ['Python', 'Cryptography', 'Fernet', 'PBKDF2', 'Tkinter', 'SQLite'],
    primaryLink: { url: 'https://github.com/SammyCode002/vault-password-manager', label: 'GitHub' },
    accent: '#E8622A',
    preview: null,
    live: false,
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

import useScrollReveal from '../hooks/useScrollReveal'

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

export default function Projects() {
  const headerReveal = useScrollReveal(0)
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

      {/* Grid */}
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
