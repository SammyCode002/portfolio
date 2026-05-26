import useScrollReveal from '../hooks/useScrollReveal'

const timeline = [
  {
    type: 'fellowship',
    title: 'NASA ACRES Research Fellow',
    org: 'NASA ACRES',
    period: 'May 2026 - Present',
    location: 'Maui County, HI · Hybrid',
    description: 'Lead fellow mapping wildfire and flood risk in Maui County using satellite remote sensing and AI. Funded by Maui Strong Fellowship in collaboration with NASA ACRES at Arizona State University.',
    tags: ['NASA', 'Remote Sensing', 'AI', 'GIS', 'Wildfire', 'Flood Risk'],
    accent: '#F4914A',
  },
  {
    type: 'work',
    title: 'STEM Achievers Instructor',
    org: 'NACCE',
    period: 'Mar 2026 - Present',
    location: 'Kahului, HI · On-site',
    description: 'Teaching a free two-week summer STEM program for Maui middle schoolers at University of Hawaii Maui College, powered by NACCE. Program curriculum covers AI, robotics, 3D printing, and coding. Part of a national initiative to bring hands-on technology education to underserved youth communities.',
    tags: ['STEM', 'AI & Robotics', '3D Printing', 'Coding', 'NACCE'],
    accent: '#E8622A',
  },
  {
    type: 'work',
    title: 'Data Processing User Support Technician II',
    org: 'Hawaiʻi State Department of Education',
    period: 'Jan 2026 - Present',
    location: 'Pukalani, HI · On-site',
    description: 'IT support and mobile device management for school district staff using Jamf and MDM solutions. Manages endpoint security using SentinelOne EDR, including threat detection, incident response, and remediation of suspicious activity on student and staff accounts. Administers Chromebook fleet via Google Workspace Admin Console including OU configuration, kiosk app deployment, policy management, and software updates across 100+ managed devices.',
    tags: ['MDM', 'Jamf', 'SentinelOne EDR', 'Google Workspace', 'IT Support'],
    accent: '#E8622A',
  },
  {
    type: 'education',
    title: 'BASc, Computer Science Cybersecurity',
    org: 'Oregon State University',
    period: 'Sep 2025 - Jun 2027',
    location: 'Remote',
    description: 'Bachelor of Applied Science in Computer Science with a Cybersecurity focus.',
    tags: ['Cybersecurity', 'Computer Science'],
    accent: '#F4914A',
  },
  {
    type: 'work',
    title: 'Verizon Innovative Learning Instructor',
    org: 'Verizon Innovative Learning',
    period: 'Jun 2024 - Jan 2026',
    location: 'University of Hawaii Maui College · On-site',
    description: 'Lead STEM instructor for 150+ middle school students across Maui, covering AI/Robotics, 3D Printing, Coding, and AR/VR. Integrated Hawaiian cultural practices with technology education. Featured in Hawaii Public Radio and Maui News.',
    tags: ['STEM', 'Robotics', '3D Printing', 'AR/VR', 'Micro:bit'],
    accent: '#E8622A',
    newsLinks: [
      { label: 'Maui News', url: 'https://www.mauinews.com/news/local-news/2025/07/students-approve-as-summer-stem-program-doubles-in-size/' },
      { label: 'Hawaii Public Radio', url: 'https://www.hawaiipublicradio.org/local-news/2025-07-18/maui-students-explore-community-problems-tech-3d-printers-coding-ai' },
    ],
  },
  {
    type: 'internship',
    title: 'Maui Fire Research Analyst',
    org: 'University of Hawaiʻi at Manoa',
    period: 'Oct 2023 - Oct 2025',
    location: 'Maui County, HI',
    description: "Named contributor on NSF RAPID grant research (Awards #2347372, #2345255, #2345256, #2345257) briefed to Senator Mazie Hirono's office (November 2023). Collaborated with the University at Buffalo (Prof. Negar Elhami-Khorasani) to validate the SWUIFT fire spread model against documented Lahaina fire progression using NCAR high-resolution wind simulations. Contributed to geospatial modeling with ArcGIS Pro and HPC clusters, community outreach, and image/video data collection for wildfire impact assessment and community resilience research.",
    tags: ['ArcGIS Pro', 'HPC', 'Python', 'NSF RAPID', 'Geospatial Analysis'],
    accent: '#F4914A',
    newsLinks: [
      { label: 'Live Research Site', url: 'https://maui-fire.ikewai.org/' },
      { label: 'In the News', url: 'https://www.mauinews.com/news/local-news/2024/08/maui-recovers-uh-maui-students-turn-tragedy-into-a-community-building-opportunity/' },
    ],
  },
  {
    type: 'education',
    title: 'GIS Conservation Field Studies',
    org: 'University of Wisconsin-Stevens Point',
    period: 'May 2025',
    location: 'Wisconsin',
    description: 'Intensive 2.5-week GIS conservation program combining hands-on fieldwork with technical mapping. Projects included trail restoration, shoreline restoration (planted 90+ native plants), water quality testing, and community mapping through the Connected Communities Initiative.',
    tags: ['GIS', 'Conservation', 'Cartographic Analysis', 'Web Mapping'],
    accent: '#F4914A',
    newsLinks: [
      { label: 'View on GitHub', url: 'https://github.com/SammyCode002/gis-conservation-wisconsin' },
    ],
  },
  {
    type: 'internship',
    title: 'CITRUS Program Research Intern',
    org: 'Hawaii Data Science Institute',
    period: 'May 2024 - Jun 2024',
    location: 'Hawaii · Remote',
    description: 'Completed the CITRUS (CyberInfrastructure TRaining for Undergraduates in Summer) program at the Hawaii Data Science Institute, an NSF-funded REU-style research experience focused on climate science and data infrastructure. Worked with HPC systems and climate datasets, building hands-on skills in data science, analytics, and visualization. Culminated in a research showcase presentation.',
    tags: ['Data Science', 'HPC', 'Climate Data', 'Visualization'],
    accent: '#F4914A',
  },
  {
    type: 'internship',
    title: 'Cyberinfrastructure REU',
    org: "University of Hawaiʻi System",
    period: 'Jan 2024 - May 2024',
    location: 'Remote',
    description: "REU researcher on the CC* KoaStore project, a high-performance research storage system at UH. Built on-demand applications (MATLAB, TensorBoard, Code-Server) and ran performance benchmarks to optimize the university's computing infrastructure.",
    tags: ['HPC', 'Research', 'On-Demand Apps', 'Infrastructure'],
    accent: '#F4914A',
  },
  {
    type: 'internship',
    title: 'Student Ambassador & Coastal Engineer',
    org: 'Oceanit',
    period: 'Nov 2023 - May 2024',
    location: 'Paia, HI · Hybrid',
    description: "Worked on Oceanit's Climate Change Toolkit project protecting the historic Paia Mantokuji Temple from coastal erosion. Built automated monitoring and data collection systems using MATLAB, Python, drogue systems, and ReoLink cameras. Earned official Senate recognition for the work.",
    tags: ['Python', 'MATLAB', 'ReoLink Cameras', 'Coastal Conservation'],
    accent: '#F4914A',
    newsLinks: [
      { label: 'View StoryMap', url: 'https://arcg.is/0iifCz' },
      { label: 'Oceanit Blog', url: 'https://oceanit.com/how-students-powered-mauis-coastal-community-climate-change-toolkit-program/' },
      { label: 'Civil Beat', url: 'https://www.civilbeat.org/2024/08/this-buddhist-temple-is-collapsing-into-the-sea-off-maui/' },
    ],
  },
  {
    type: 'education',
    title: 'Computer Science',
    org: 'University of Hawaiʻi Maui College',
    period: 'Aug 2023 - May 2025',
    location: 'Kahului, HI',
    description: "Natural Science, Information and Computer Sciences. GPA 3.85. Dean's List, STEM Academic Excellence Recognition.",
    tags: ["Dean's List", 'GPA 3.85', 'STEM Excellence'],
    accent: '#E8622A',
  },
]

const certifications = [
  {
    title: 'Google Cybersecurity Certificate',
    issuer: 'Google',
    date: 'Jul 2023',
    credentialId: 'P6Y5Z4PDPHZR',
    url: 'https://www.credly.com/earner/earned/badge/24a00bfa-5457-4e3a-a5db-e0cc5f917023',
    accent: '#E8622A',
  },
  {
    title: 'Certified in Cybersecurity (CC)',
    issuer: 'ISC2',
    date: 'Jul 2023',
    credentialId: 'EFP2GTJKV2TD',
    url: 'https://www.coursera.org/account/accomplishments/specialization/certificate/EFP2GTJKV2TD',
    accent: '#F4914A',
  },
  {
    title: 'Cybersecurity Operations Fundamentals',
    issuer: 'Cisco',
    date: 'Aug 2023',
    credentialId: 'TAL46GVTNNWA',
    url: 'https://www.coursera.org/account/accomplishments/specialization/certificate/TAL46GVTNNWA',
    accent: '#F4914A',
  },
]

function typeLabel(type) {
  if (type === 'education') return 'Education'
  if (type === 'internship') return 'Internship'
  if (type === 'fellowship') return 'Fellowship'
  return 'Work'
}

function TimelineItem({ item, index, isLast }) {
  const reveal = useScrollReveal(index * 35)

  return (
    <div ref={reveal.ref} style={{ ...reveal.style, display: 'flex', gap: '16px', paddingBottom: '20px' }}>
      {/* Dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '10px', height: '10px', borderRadius: '50%', marginTop: '5px',
          background: item.accent, boxShadow: `0 0 0 3px ${item.accent}22`,
          flexShrink: 0,
        }} />
        {!isLast && (
          <div style={{ width: '1px', flex: 1, background: 'var(--border)', marginTop: '6px' }} />
        )}
      </div>

      {/* Card */}
      <div style={{
        flex: 1, minWidth: 0, paddingBottom: '4px',
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '12px', padding: '14px 16px', marginBottom: '4px',
        transition: 'border-color 0.2s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', gap: '8px' }}>
          <span style={{
            fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em',
            padding: '2px 7px', borderRadius: '999px',
            background: `${item.accent}18`, color: item.accent,
          }}>
            {typeLabel(item.type)}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', flexShrink: 0 }}>{item.period}</span>
        </div>

        <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', margin: '0 0 2px' }}>
          {item.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: '500', color: item.accent }}>{item.org}</span>
          <span style={{ color: 'var(--border-bright)' }}>&middot;</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.location}</span>
        </div>

        <p style={{ fontSize: '13.5px', lineHeight: '1.65', color: 'var(--text-secondary)', margin: '0 0 10px' }}>
          {item.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: item.newsLinks ? '10px' : 0 }}>
          {item.tags.map(tag => (
            <span key={tag} style={{
              padding: '2px 7px', borderRadius: '999px',
              background: 'var(--bg-panel)', border: '1px solid var(--border)',
              fontSize: '11px', color: 'var(--text-muted)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {item.newsLinks && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {item.newsLinks.map(news => (
              <a
                key={news.url}
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  fontSize: '12px', fontWeight: '500', color: item.accent,
                  textDecoration: 'none', transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                {news.label}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
  const experienceHeaderReveal = useScrollReveal(0)
  const educationHeaderReveal = useScrollReveal(0)
  const certsReveal = useScrollReveal(0)

  const workItems = timeline.filter(item => item.type !== 'education')
  const educationItems = timeline.filter(item => item.type === 'education')

  return (
    <>
      <section id="experience" className="panel-card" style={{ padding: '24px', scrollMarginTop: '72px' }}>
        <div ref={experienceHeaderReveal.ref} style={{ ...experienceHeaderReveal.style, marginBottom: '24px' }}>
          <p className="section-header" style={{ marginBottom: '4px' }}>Background</p>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text)', margin: 0 }}>
            Experience
          </h2>
        </div>

        <div>
          {workItems.map((item, i) => (
            <TimelineItem
              key={`work-${i}`}
              item={item}
              index={i}
              isLast={i === workItems.length - 1}
            />
          ))}
        </div>
      </section>

      <section id="education" className="panel-card" style={{ padding: '24px', scrollMarginTop: '72px' }}>
        <div ref={educationHeaderReveal.ref} style={{ ...educationHeaderReveal.style, marginBottom: '24px' }}>
          <p className="section-header" style={{ marginBottom: '4px' }}>Learning</p>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text)', margin: 0 }}>
            Education
          </h2>
        </div>

        <div>
          {educationItems.map((item, i) => (
            <TimelineItem
              key={`edu-${i}`}
              item={item}
              index={i}
              isLast={i === educationItems.length - 1}
            />
          ))}
        </div>
      </section>

      <section
        id="certifications"
        ref={certsReveal.ref}
        className="panel-card"
        style={{ ...certsReveal.style, padding: '24px', scrollMarginTop: '72px' }}
      >
        <p className="section-header" style={{ marginBottom: '12px' }}>Certifications</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
          {certifications.map((cert, i) => (
            <CertCard key={cert.credentialId} cert={cert} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}

function CertCard({ cert, index }) {
  const reveal = useScrollReveal(index * 50)
  return (
    <div ref={reveal.ref} style={reveal.style}>
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block', padding: '14px 16px', borderRadius: '12px',
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        textDecoration: 'none',
        borderTop: `2px solid ${cert.accent}`,
        transition: 'border-color 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = cert.accent
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.borderTopColor = cert.accent
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '10px', fontWeight: '700', color: cert.accent, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {cert.issuer}
        </span>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{cert.date}</span>
      </div>
      <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)', margin: '0 0 6px', lineHeight: '1.4' }}>
        {cert.title}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
          ID: {cert.credentialId}
        </span>
        <span style={{ fontSize: '10px', fontWeight: '500', color: cert.accent }}>
          View &rarr;
        </span>
      </div>
    </a>
    </div>
  )
}
