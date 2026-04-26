import { useScrollFade } from '../hooks/useScrollFade'

const projects = [
  {
    title: 'STEM Achievers',
    description: 'Free summer STEM program for Maui middle schoolers at University of Hawaii Maui College. Powered by NACCE, the program covers AI, robotics, 3D printing, and coding. July 6–17, 2026.',
    tags: ['STEM Education', 'Curriculum Design', 'AI & Robotics', '3D Printing', 'NACCE'],
    githubUrl: null,
    primaryLink: { url: '/stem_achievers_flyer.png', label: 'View Flyer', type: 'news' },
    accentColor: '#f97316',
    bgGradient: 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(5,12,12,1) 50%, rgba(234,88,12,0.06) 100%)',
    preview: '/stem_achievers_flyer.png',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full opacity-20">
        <path d="M8 36 L24 12 L40 36 Z" stroke="#f97316" strokeWidth="1" />
        <circle cx="24" cy="22" r="5" stroke="#f97316" strokeWidth="0.8" />
        <line x1="16" y1="36" x2="32" y2="36" stroke="#f97316" strokeWidth="1" />
        <circle cx="12" cy="30" r="2" fill="#f97316" opacity="0.6" />
        <circle cx="36" cy="30" r="2" fill="#f97316" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: 'Maui Fire Research',
    description: 'Named contributor on NSF RAPID grant briefed to Senator Mazie Hirono\'s office (Nov 2023). Collaborated with University at Buffalo (Prof. Negar Elhami-Khorasani) to validate the SWUIFT fire spread model against documented Lahaina fire progression using NCAR high-resolution wind simulations. Geospatial modeling with ArcGIS Pro and HPC.',
    tags: ['ArcGIS Pro', 'HPC', 'Python', 'NSF RAPID', 'AI', 'Geospatial Analysis'],
    githubUrl: null,
    primaryLink: { url: 'https://maui-fire.ikewai.org/', label: 'Live Site', type: 'map' },
    secondaryLink: { url: 'https://www.mauinews.com/news/local-news/2024/08/maui-recovers-uh-maui-students-turn-tragedy-into-a-community-building-opportunity/', label: 'In the News', type: 'news' },
    accentColor: '#f97316',
    bgGradient: 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(5,12,12,1) 50%, rgba(220,38,38,0.06) 100%)',
    preview: '/nsf-rapid/slide_13.png',
    previewLabel: 'NSF RAPID',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full opacity-20">
        <path d="M24 6 C18 12, 10 16, 12 26 C13 32, 18 36, 24 38 C30 36, 35 32, 36 26 C38 16, 30 12, 24 6Z" stroke="#f97316" strokeWidth="1" />
        <path d="M24 18 C21 21, 18 24, 19 28 C20 31, 22 33, 24 34 C26 33, 28 31, 29 28 C30 24, 27 21, 24 18Z" stroke="#f97316" strokeWidth="0.8" />
        <circle cx="24" cy="28" r="3" fill="#f97316" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: 'Climate Change at Mantokuji',
    description: 'Interactive ArcGIS StoryMap documenting coastal erosion and sea level rise threatening the historic Mantokuji Mission in Paia, Maui. Covers GIS monitoring, shoreline analysis, and three preservation strategies: natural barriers, shoreline hardening, and beach nourishment.',
    tags: ['ArcGIS StoryMap', 'GIS', 'Coastal Erosion', 'Sea Level Rise', 'Conservation'],
    githubUrl: null,
    primaryLink: { url: 'https://arcg.is/0iifCz', label: 'View StoryMap', type: 'map' },
    accentColor: '#14b8a6',
    bgGradient: 'linear-gradient(135deg, rgba(20,184,166,0.12) 0%, rgba(5,12,12,1) 50%, rgba(8,145,178,0.06) 100%)',
    preview: '/mantokuji_storymap.png',
    previewLabel: 'ArcGIS StoryMap',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full opacity-20">
        <circle cx="24" cy="24" r="16" stroke="#14b8a6" strokeWidth="1" />
        <line x1="8" y1="24" x2="40" y2="24" stroke="#14b8a6" strokeWidth="0.8" />
        <path d="M24 8 C18 14, 18 34, 24 40 C30 34, 30 14, 24 8Z" stroke="#14b8a6" strokeWidth="0.8" />
        <path d="M10 16 Q24 20, 38 16" stroke="#14b8a6" strokeWidth="0.6" />
        <path d="M10 32 Q24 28, 38 32" stroke="#14b8a6" strokeWidth="0.6" />
      </svg>
    ),
  },
  {
    title: 'NASA Harvest',
    description: 'New NASA Harvest project under the Maui Strong Fellowship (May–Nov 2026). Coming Soon!',
    tags: ['Coming Soon'],
    githubUrl: null,
    primaryLink: { url: '#', label: 'Coming Soon', type: 'soon' },
    accentColor: '#a855f7',
    bgGradient: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(5,12,12,1) 50%, rgba(137,87,229,0.06) 100%)',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full opacity-20">
        <circle cx="24" cy="24" r="18" stroke="#a855f7" strokeWidth="1" />
        <path d="M24 14 L24 24 L32 28" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Coastal Erosion Monitor',
    description: 'Led Climate Change Toolkit at Oceanit protecting the historic Paia Mantokuji Temple from coastal erosion. Built automated environmental monitoring with Python, MATLAB, and ReoLink cameras. Earned Hawaii State Senate recognition.',
    tags: ['Python', 'MATLAB', 'Environmental Monitoring', 'ReoLink', 'Sensors'],
    githubUrl: null,
    primaryLink: { url: 'https://oceanit.com/how-students-powered-mauis-coastal-community-climate-change-toolkit-program/', label: 'Oceanit Blog', type: 'news' },
    secondaryLink: { url: 'https://www.civilbeat.org/2024/08/this-buddhist-temple-is-collapsing-into-the-sea-off-maui/', label: 'Civil Beat', type: 'news' },
    accentColor: '#14b8a6',
    bgGradient: 'linear-gradient(135deg, rgba(20,184,166,0.12) 0%, rgba(5,12,12,1) 50%, rgba(8,145,178,0.06) 100%)',
    preview: '/oceanit_team.jpg',
    previewLabel: 'Oceanit',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full opacity-20">
        <path d="M4 28 Q10 22, 16 28 Q22 34, 28 28 Q34 22, 40 28 Q46 34, 52 28" stroke="#14b8a6" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M4 34 Q10 28, 16 34 Q22 40, 28 34 Q34 28, 40 34 Q46 40, 52 34" stroke="#14b8a6" strokeWidth="0.7" strokeLinecap="round" opacity="0.6" />
        <path d="M20 28 L20 10 M24 26 L24 8 M28 28 L28 12" stroke="#14b8a6" strokeWidth="0.6" />
        <circle cx="24" cy="6" r="3" fill="#14b8a6" opacity="0.7" />
      </svg>
    ),
  },
]

export default function Projects() {
  const headerRef = useScrollFade(0)
  const gridRef = useScrollFade(120)

  return (
    <section
      id="projects"
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 70% 30%, rgba(0,212,212,0.04) 0%, transparent 60%), #050c0c',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a3232] to-transparent" />
      {/* Ambient blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00d4d4, transparent)' }} />
      <div className="absolute bottom-1/3 left-10 w-64 h-64 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #14b8a6, transparent)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <p className="text-[#00d4d4] text-sm font-medium tracking-widest uppercase mb-3">Featured Work</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#e8f4f4]">
              <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <a
            href="https://github.com/SammyCode002"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#7a9e9e] hover:text-[#00d4d4] transition-colors no-underline"
          >
            View all on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Projects grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-default"
              style={{ borderTop: `1px solid ${project.accentColor}22` }}
            >
              {/* Preview image (if present) */}
              {project.preview && (
                <div className="relative w-full h-40 overflow-hidden">
                  <img
                    src={project.preview}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#091414]" />
                  {project.previewLabel && (
                    <span
                      className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded-full border"
                      style={{ color: project.accentColor, borderColor: `${project.accentColor}44`, background: 'rgba(5,12,12,0.7)' }}
                    >
                      {project.previewLabel}
                    </span>
                  )}
                  {project.primaryLink?.type === 'map' && (
                    <span className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-full border border-green-500/40 text-green-400 bg-[rgba(5,12,12,0.7)] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                      Live
                    </span>
                  )}
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
              {/* Top row: folder icon + link icons */}
              <div className="flex items-center justify-between mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8" style={{ color: project.accentColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                </svg>
                <div className="flex items-center gap-3">
                  {/* Secondary link */}
                  {project.secondaryLink && (
                    <a
                      href={project.secondaryLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={project.secondaryLink.label}
                      className="text-[#4a6e6e] hover:text-[#00d4d4] transition-colors no-underline"
                    >
                      {project.secondaryLink.type === 'github' ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      )}
                    </a>
                  )}
                  {/* Primary link */}
                  <a
                    href={project.primaryLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={project.primaryLink.label}
                    className="transition-colors no-underline"
                    style={{ color: project.primaryLink.type === 'map' ? project.accentColor : '#4a6e6e' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = project.accentColor}
                    onMouseLeave={(e) => e.currentTarget.style.color = project.primaryLink.type === 'map' ? project.accentColor : '#4a6e6e'}
                  >
                    {project.primaryLink.type === 'github' ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    ) : project.primaryLink.type === 'map' ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    )}
                  </a>
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-[#e8f4f4] font-bold text-xl mb-3 group-hover:transition-colors"
                style={{ transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = project.accentColor}
                onMouseLeave={(e) => e.currentTarget.style.color = '#e8f4f4'}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[#7a9e9e] text-sm leading-relaxed flex-1 mb-6">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs text-[#4a6e6e] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
