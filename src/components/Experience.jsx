import { useScrollFade } from '../hooks/useScrollFade'

const timeline = [
  {
    type: 'work',
    title: 'Data Processing User Support Technician',
    org: 'Hawaiʻi State Department of Education',
    period: 'Jan 2026 - Present',
    location: 'Pukalani, HI · On-site',
    description: 'IT support and mobile device management for school district staff using Jamf and MDM solutions.',
    tags: ['MDM', 'Jamf', 'IT Support', 'Windows'],
    accent: '#00d4d4',
  },
  {
    type: 'education',
    title: 'BASc, Computer Science Cybersecurity',
    org: 'Oregon State University',
    period: 'Sep 2025 - Jun 2027',
    location: 'Remote',
    description: 'Bachelor of Applied Science in Computer Science with a Cybersecurity focus.',
    tags: ['Cybersecurity', 'Computer Science'],
    accent: '#14b8a6',
  },
  {
    type: 'education',
    title: 'GIS Conservation Field Studies',
    org: 'University of Wisconsin-Stevens Point',
    period: 'May 2025',
    location: 'Wisconsin',
    description: 'Completed intensive 2.5-week GIS conservation program combining hands-on fieldwork with technical mapping. Projects included trail restoration at Schmeeckle Reserve, shoreline restoration (planted 90+ native plants), water quality testing, and community mapping with local stakeholders through the Connected Communities Initiative (Maui-Wisconsin).',
    tags: ['GIS', 'Conservation', 'Cartographic Analysis', 'Web Mapping', 'Environmental Education'],
    accent: '#2dd4bf',
  },
  {
    type: 'work',
    title: 'Verizon Innovative Learning Instructor',
    org: 'Verizon Innovative Learning',
    period: 'Jun 2024 - Present',
    location: 'Maui County, HI · On-site',
    description: 'Leading STEM program serving 150+ middle school students across Maui in four tech tracks: AI/Robotics, 3D Printing, Coding, and AR/VR. Integrating Hawaiian cultural practices with technology education.',
    tags: ['STEM', 'Robotics', '3D Printing', 'AR/VR', 'Micro:bit'],
    accent: '#06b6d4',
    newsLinks: [
      { label: 'Maui News', url: 'https://www.mauinews.com/news/local-news/2025/07/students-approve-as-summer-stem-program-doubles-in-size/' },
      { label: 'Hawaii Public Radio', url: 'https://www.hawaiipublicradio.org/local-news/2025-07-18/maui-students-explore-community-problems-tech-3d-printers-coding-ai' },
    ],
  },
  {
    type: 'internship',
    title: 'CITRUS Program Research Intern',
    org: 'Hawaii Data Science Institute',
    period: 'May 2024 - Jun 2024',
    location: 'Hawaii · Remote',
    description: 'Completed intensive CyberInfrastructure Training for Undergraduates in Summer (CITRUS) program. Developed skills in data science, analytics, and visualization applied to climate and environmental research.',
    tags: ['Data Science', 'HPC', 'Climate Data', 'Visualization'],
    accent: '#2dd4bf',
  },
  {
    type: 'work',
    title: 'STEM Squared Mentor',
    org: 'University of Hawaiʻi at Manoa',
    period: 'Mar 2024 - Present',
    location: 'Hybrid',
    description: 'Implementing trauma-informed STEM education for post-wildfire community recovery. Conducting weekly robotics, mathematics, and technology lessons at Ka Hale A Ke Ola shelter. Contributing to NSF RAPID grant research on community resilience.',
    tags: ['STEM', 'NSF RAPID', 'Trauma-Informed Education', 'Robotics'],
    accent: '#00d4d4',
  },
  {
    type: 'internship',
    title: 'Cyberinfrastructure REU',
    org: 'University of Hawaiʻi System',
    period: 'Jan 2024 - May 2024',
    location: 'Remote',
    description: 'Contributed to CC* Data Storage KoaStore HPC project. Developed on-demand applications including MATLAB, TensorBoard, and Code-Server for the UH Koa HPC cluster.',
    tags: ['HPC', 'MATLAB', 'Bash', 'Research Infrastructure'],
    accent: '#14b8a6',
  },
  {
    type: 'internship',
    title: 'Student Ambassador & Coastal Engineer',
    org: 'Oceanit',
    period: 'Nov 2023 - May 2024',
    location: 'Paia, HI · Hybrid',
    description: 'Led Climate Change Toolkit project protecting the historic Paia Mantokuji Temple from coastal erosion. Conducted environmental monitoring using MATLAB, Python, automated data collection systems, and ReoLink monitoring system cameras. Earned Hawaii State Senate recognition for environmental leadership.',
    tags: ['Python', 'MATLAB', 'ReoLink Cameras', 'Coastal Conservation'],
    accent: '#06b6d4',
  },
  {
    type: 'work',
    title: 'Maui Fire Research Analyst',
    org: 'University of Hawaiʻi at Manoa',
    period: 'Oct 2023 - Present',
    location: 'Maui County, HI',
    description: 'Contributing to NSF RAPID grant research analyzing 2023 Maui wildfire impacts and community resilience. Using HPC and ArcGIS Pro for wildfire data analysis and geospatial modeling.',
    tags: ['ArcGIS Pro', 'HPC', 'Geospatial Analysis', 'NSF RAPID'],
    accent: '#2dd4bf',
  },
  {
    type: 'education',
    title: 'Computer Science',
    org: 'University of Hawaiʻi Maui College',
    period: 'Aug 2023 - May 2025',
    location: 'Kahului, HI',
    description: "Natural Science — Information and Computer Sciences. GPA 3.85. Dean's List, STEM Academic Excellence Recognition.",
    tags: ["Dean's List", 'GPA 3.85', 'STEM Excellence', 'Computer Science'],
    accent: '#00d4d4',
  },
]

function TimelineIcon({ type, accent }) {
  if (type === 'education') {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: accent }}>
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg>
    )
  }
  if (type === 'internship') {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: accent }}>
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
        <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: accent }}>
      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
    </svg>
  )
}

function typeLabel(type) {
  if (type === 'education') return 'Education'
  if (type === 'internship') return 'Internship'
  return 'Work'
}

function TimelineItem({ item, index }) {
  const itemRef = useScrollFade(index * 60)
  return (
    <div ref={itemRef} className="relative flex gap-8 pb-10 last:pb-0">
      {/* Icon dot */}
      <div className="relative z-10 flex-shrink-0 flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `${item.accent}12`,
            border: `1px solid ${item.accent}30`,
          }}
        >
          <TimelineIcon type={item.type} accent={item.accent} />
        </div>
      </div>

      {/* Card */}
      <div className="glass-card rounded-2xl p-6 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-1 flex-wrap">
          <div>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded uppercase tracking-wide"
              style={{ background: `${item.accent}12`, color: item.accent }}
            >
              {typeLabel(item.type)}
            </span>
          </div>
          <span className="text-[#4a6e6e] text-xs font-medium">{item.period}</span>
        </div>

        <h3 className="text-[#e8f4f4] font-semibold text-lg mt-2 mb-0.5">{item.title}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-medium text-sm" style={{ color: item.accent }}>{item.org}</span>
          <span className="text-[#4a6e6e]">·</span>
          <span className="text-[#4a6e6e] text-sm">{item.location}</span>
        </div>

        <p className="text-[#7a9e9e] text-sm leading-relaxed mb-4">{item.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs bg-[#0a1a1a] border border-[#1a3232] text-[#4a6e6e]"
            >
              {tag}
            </span>
          ))}
        </div>

        {item.newsLinks && (
          <div className="flex flex-wrap gap-3">
            {item.newsLinks.map((news) => (
              <a
                key={news.url}
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium no-underline transition-colors"
                style={{ color: item.accent }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                {news.label}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  const headerRef = useScrollFade(0)

  return (
    <section
      id="experience"
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 15% 40%, rgba(6,182,212,0.04) 0%, transparent 55%), #050c0c',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a3232] to-transparent" />
      {/* Ambient blobs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00d4d4, transparent)' }} />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full opacity-[0.025] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #14b8a6, transparent)' }} />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <p className="text-[#00d4d4] text-sm font-medium tracking-widest uppercase mb-3">Background</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#e8f4f4]">
            Experience &{' '}
            <span className="gradient-text">Education</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-[#00d4d4] via-[#1a3232] to-transparent" />
          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
