import { useScrollFade } from '../hooks/useScrollFade'

const adventures = [
  {
    title: 'SANS San Francisco 2026',
    description: 'Attending one of the premier cybersecurity training events in the industry. Taking SEC401: Security Essentials covering network, endpoint, and cloud security toward GIAC certification. Nov 2 - 7, 2026 at the Hilton Financial District.',
    tags: ['SANS', 'SEC401', 'GIAC', 'Cybersecurity'],
    date: 'Nov 2026',
    location: 'San Francisco, CA',
    preview: '/sans_sf.png',
    accentColor: '#6bcce8',
    primaryLink: { url: 'https://www.sans.org/cyber-security-training-events/san-francisco-2026/', label: 'Event Info' },
  },
]

export default function Upcoming() {
  const headerRef = useScrollFade(0)
  const gridRef = useScrollFade(120)

  return (
    <section
      id="upcoming"
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, rgba(107,204,232,0.04) 0%, transparent 60%), #0a1525',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1d3458] to-transparent" />
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6bcce8, transparent)' }} />
      <div className="absolute bottom-1/3 right-0 w-72 h-72 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3aa9d4, transparent)' }} />

      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-16">
          <p className="text-[#6bcce8] text-sm font-medium tracking-widest uppercase mb-3">Coming Up</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#eaf6fb]">
            <span className="gradient-text">On the Horizon</span>
          </h2>
        </div>

        <div ref={gridRef} className={`grid gap-6 ${adventures.length > 1 ? 'md:grid-cols-2' : 'max-w-xl mx-auto'}`}>
          {adventures.map((item) => (
            <article
              key={item.title}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-default"
              style={{ borderTop: `1px solid ${item.accentColor}22` }}
            >
              {/* Preview image */}
              <div className="relative w-full h-44 overflow-hidden">
                <img
                  src={item.preview}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0e2548]" />
                {/* Upcoming badge */}
                <span
                  className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1"
                  style={{ color: item.accentColor, borderColor: `${item.accentColor}44`, background: 'rgba(10,21,37,0.75)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: item.accentColor }} />
                  Upcoming
                </span>
                <span
                  className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded-full border"
                  style={{ color: item.accentColor, borderColor: `${item.accentColor}44`, background: 'rgba(10,21,37,0.75)' }}
                >
                  {item.date}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      className="text-[#eaf6fb] font-bold text-xl mb-1"
                      style={{ transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = item.accentColor}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#eaf6fb'}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono" style={{ color: item.accentColor }}>{item.location}</p>
                  </div>
                  {item.primaryLink && (
                    <a
                      href={item.primaryLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors no-underline text-[#6a8aa8] hover:text-[#6bcce8] flex-shrink-0 ml-3"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  )}
                </div>

                <p className="text-[#9ebed4] text-sm leading-relaxed flex-1 mb-6">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs text-[#6a8aa8] font-mono">{tag}</span>
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
