import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const features = [
  {
    outlet: 'Maui News',
    title: 'Students approve as summer STEM program doubles in size',
    project: 'Verizon Innovative Learning',
    url: 'https://www.mauinews.com/news/local-news/2025/07/students-approve-as-summer-stem-program-doubles-in-size/',
    date: 'Jul 2025',
    accent: '#E8622A',
    excerpt: 'Led by Sam Dameg and the Verizon Innovative Learning team, the free summer STEM program at University of Hawaii Maui College doubled its enrollment, serving 150+ middle school students across four tech tracks: AI/Robotics, 3D Printing, Coding, and AR/VR.',
  },
  {
    outlet: 'Hawaii Public Radio',
    title: 'Maui students explore community problems through tech, 3D printers, coding, AI',
    project: 'Verizon Innovative Learning',
    url: 'https://www.hawaiipublicradio.org/local-news/2025-07-18/maui-students-explore-community-problems-tech-3d-printers-coding-ai',
    date: 'Jul 2025',
    accent: '#F4914A',
    excerpt: 'Hawaii Public Radio featured the Verizon Innovative Learning program at UH Maui College, where middle school students integrate Hawaiian cultural practices with cutting-edge technology to tackle real community challenges.',
  },
  {
    outlet: 'Maui News',
    title: 'Maui recovers - UH Maui students turn tragedy into a community-building opportunity',
    project: 'Maui Fire Research',
    url: 'https://www.mauinews.com/news/local-news/2024/08/maui-recovers-uh-maui-students-turn-tragedy-into-a-community-building-opportunity/',
    date: 'Aug 2024',
    accent: '#E8622A',
    excerpt: 'A feature on the NSF RAPID-funded Maui Fire Research collaboration with University at Buffalo. UH Maui College students helped validate the SWUIFT fire spread model against the documented Lahaina fire progression.',
  },
  {
    outlet: 'Oceanit',
    title: 'Climate Change Toolkit student ambassadors graduate',
    project: 'Oceanit Climate Change Toolkit',
    url: 'https://oceanit.com/climate-change-toolkit-student-ambassadors-graduate/',
    date: 'May 2024',
    accent: '#F4A261',
    excerpt: '"Ambassadors Peyton Tokishi, Noah Munz, Sam Dameg, Dyther Jay Bugtong, and Llyw MacMillian presented their collaborative findings." The graduation ceremony celebrated 6 months of coastal erosion research at Paia Mantokuji Temple.',
  },
  {
    outlet: 'Oceanit Blog',
    title: "How students powered Maui's coastal community Climate Change Toolkit program",
    project: 'Oceanit Climate Change Toolkit',
    url: 'https://oceanit.com/how-students-powered-mauis-coastal-community-climate-change-toolkit-program/',
    date: '2024',
    accent: '#F4A261',
    excerpt: 'Oceanit\'s in-depth look at how student ambassadors used MATLAB, Python, drogue systems, and ReoLink cameras to build an environmental monitoring toolkit for the historic Paia Mantokuji Temple.',
  },
]

const recognition = [
  {
    label: 'NSF RAPID Grant',
    detail: 'Named contributor on Awards #2347372, #2345255, #2345256, #2345257',
    sub: 'Maui Fire Research, UH Manoa',
  },
  {
    label: 'Senator Hirono Briefing',
    detail: "Research briefed to Senator Mazie Hirono's office",
    sub: 'November 2023',
  },
  {
    label: 'Hawaii State Senate Recognition',
    detail: 'Senate certificate presented by Senator Lynn DeCoite for the Climate Change Toolkit project',
    sub: 'Oceanit, May 2024',
  },
  {
    label: 'Oceanit Certificate of Completion',
    detail: 'Recognized for outstanding performance and contributions to the Climate Change Toolkit Program at Mantokuji',
    sub: 'Oceanit Laboratories & Research Foundation, May 2024',
  },
  {
    label: 'University at Buffalo Collaboration',
    detail: 'Validated SWUIFT fire spread model with Prof. Negar Elhami-Khorasani',
    sub: 'Maui Fire Research',
  },
]

function PressItem({ item, index }) {
  const reveal = useScrollReveal(index * 60)
  return (
    <a
      ref={reveal.ref}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...reveal.style,
        display: 'block',
        padding: '14px 16px',
        borderRadius: '12px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${item.accent}`,
        textDecoration: 'none',
        transition: 'border-color 0.2s, transform 0.2s',
        marginBottom: '8px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = item.accent
        e.currentTarget.style.borderLeftColor = item.accent
        e.currentTarget.style.transform = 'translateX(3px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.borderLeftColor = item.accent
        e.currentTarget.style.transform = 'translateX(0)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', marginBottom: '4px' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: '700',
          color: item.accent,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          {item.outlet}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>
          {item.date}
        </span>
      </div>
      <p style={{
        fontSize: '14px',
        fontWeight: '600',
        color: 'var(--text)',
        margin: '0 0 4px',
        lineHeight: '1.4',
      }}>
        {item.title}
      </p>
      <p style={{
        fontSize: '11.5px',
        color: 'var(--text-muted)',
        margin: 0,
      }}>
        {item.project}
      </p>
    </a>
  )
}

function RecognitionItem({ item, index }) {
  const reveal = useScrollReveal(index * 50)
  return (
    <div
      ref={reveal.ref}
      style={{
        ...reveal.style,
        padding: '12px 14px',
        borderRadius: '10px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      <p style={{
        fontSize: '12px',
        fontWeight: '700',
        color: 'var(--accent)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        margin: '0 0 4px',
      }}>
        {item.label}
      </p>
      <p style={{
        fontSize: '13px',
        color: 'var(--text)',
        margin: '0 0 3px',
        lineHeight: '1.4',
      }}>
        {item.detail}
      </p>
      <p style={{
        fontSize: '11px',
        color: 'var(--text-muted)',
        margin: 0,
      }}>
        {item.sub}
      </p>
    </div>
  )
}

function FeaturedPressCarousel({ activeIndex, setActiveIndex }) {
  const item = features[activeIndex]
  const total = features.length
  const next = () => setActiveIndex((activeIndex + 1) % total)
  const prev = () => setActiveIndex((activeIndex - 1 + total) % total)

  return (
    <div style={{
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: `linear-gradient(135deg, ${item.accent}18 0%, var(--bg-card) 100%)`,
      marginBottom: '20px',
    }}>
      <div style={{ padding: '24px 60px 24px 28px' }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: '10px',
          marginBottom: '10px', flexWrap: 'wrap',
        }}>
          <span style={{
            padding: '3px 10px', borderRadius: '999px',
            background: item.accent, color: 'white',
            fontSize: '10px', fontWeight: '700',
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            {item.outlet}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {item.date}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            ·
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {item.project}
          </span>
        </div>

        <h3 style={{
          fontSize: '20px', fontWeight: '700',
          color: 'var(--text)', margin: '0 0 12px',
          lineHeight: '1.3',
          maxWidth: '780px',
        }}>
          {item.title}
        </h3>

        <p style={{
          fontSize: '14px', lineHeight: '1.65',
          color: 'var(--text-secondary)',
          margin: '0 0 16px',
          fontStyle: 'italic',
          borderLeft: `3px solid ${item.accent}`,
          paddingLeft: '14px',
          maxWidth: '760px',
        }}>
          {item.excerpt}
        </p>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '13px', fontWeight: '600',
            color: item.accent, textDecoration: 'none',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Read full article
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      {/* Counter badge */}
      <span style={{
        position: 'absolute', top: '14px', right: '60px',
        padding: '3px 10px', borderRadius: '999px',
        background: 'var(--bg)', border: '1px solid var(--border)',
        fontSize: '10px', fontWeight: '600',
        color: 'var(--text-muted)',
        letterSpacing: '0.06em',
      }}>
        {activeIndex + 1} / {total}
      </span>

      {/* Prev arrow */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous press item"
        style={{
          position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
          width: '34px', height: '34px', borderRadius: '50%',
          background: 'var(--bg)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          transition: 'all 0.15s',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          zIndex: 2,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = item.accent
          e.currentTarget.style.color = 'white'
          e.currentTarget.style.borderColor = item.accent
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--bg)'
          e.currentTarget.style.color = 'var(--text-secondary)'
          e.currentTarget.style.borderColor = 'var(--border)'
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={next}
        aria-label="Next press item"
        style={{
          position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
          width: '34px', height: '34px', borderRadius: '50%',
          background: 'var(--bg)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          transition: 'all 0.15s',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          zIndex: 2,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = item.accent
          e.currentTarget.style.color = 'white'
          e.currentTarget.style.borderColor = item.accent
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--bg)'
          e.currentTarget.style.color = 'var(--text-secondary)'
          e.currentTarget.style.borderColor = 'var(--border)'
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  )
}

function RecognitionCarousel() {
  const [index, setIndex] = useState(0)
  const item = recognition[index]
  const total = recognition.length
  const next = () => setIndex((index + 1) % total)
  const prev = () => setIndex((index - 1 + total) % total)
  const accent = 'var(--accent)'

  if (!item) return null

  return (
    <div style={{
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'linear-gradient(135deg, var(--accent-dim) 0%, var(--bg-card) 100%)',
      marginBottom: '16px',
    }}>
      <div style={{ padding: '22px 60px 22px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <span style={{
            padding: '3px 10px', borderRadius: '999px',
            background: 'var(--accent)', color: 'white',
            fontSize: '10px', fontWeight: '700',
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            Recognition
          </span>
          <span style={{
            padding: '3px 10px', borderRadius: '999px',
            background: 'var(--bg)', border: '1px solid var(--border)',
            fontSize: '10px', fontWeight: '600', color: 'var(--text-muted)',
            letterSpacing: '0.05em',
          }}>
            Featured · {index + 1} / {total}
          </span>
        </div>

        <h3 style={{
          fontSize: '18px', fontWeight: '700',
          color: 'var(--text)', margin: '0 0 8px',
          lineHeight: '1.3',
        }}>
          {item.label}
        </h3>

        <p style={{
          fontSize: '14px', lineHeight: '1.6',
          color: 'var(--text-secondary)',
          margin: '0 0 10px', maxWidth: '720px',
        }}>
          {item.detail}
        </p>

        <p style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
          margin: 0,
          fontStyle: 'italic',
        }}>
          {item.sub}
        </p>
      </div>

      <button type="button" onClick={prev} aria-label="Previous recognition" style={{
        position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
        width: '32px', height: '32px', borderRadius: '50%',
        background: 'var(--bg)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: 'var(--text-secondary)',
        transition: 'all 0.15s',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        zIndex: 2,
      }} onMouseEnter={e => {
        e.currentTarget.style.background = accent
        e.currentTarget.style.color = 'white'
        e.currentTarget.style.borderColor = accent
      }} onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--bg)'
        e.currentTarget.style.color = 'var(--text-secondary)'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button type="button" onClick={next} aria-label="Next recognition" style={{
        position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
        width: '32px', height: '32px', borderRadius: '50%',
        background: 'var(--bg)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: 'var(--text-secondary)',
        transition: 'all 0.15s',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        zIndex: 2,
      }} onMouseEnter={e => {
        e.currentTarget.style.background = accent
        e.currentTarget.style.color = 'white'
        e.currentTarget.style.borderColor = accent
      }} onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--bg)'
        e.currentTarget.style.color = 'var(--text-secondary)'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div style={{
        display: 'flex', justifyContent: 'center', gap: '6px',
        padding: '0 0 14px',
      }}>
        {recognition.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show recognition ${i + 1}`}
            style={{
              width: i === index ? '22px' : '7px',
              height: '7px',
              borderRadius: '999px',
              background: i === index ? 'var(--accent)' : 'var(--border)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Press() {
  const headerReveal = useScrollReveal(0)
  const recognitionHeaderReveal = useScrollReveal(0)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="press" className="panel-card" style={{ padding: '24px', scrollMarginTop: '72px' }}>
      <div ref={headerReveal.ref} style={{ ...headerReveal.style, marginBottom: '18px' }}>
        <p className="section-header" style={{ marginBottom: '4px' }}>Featured In</p>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text)', margin: 0 }}>
          Press & Publications
        </h2>
      </div>

      {/* Featured press carousel */}
      <FeaturedPressCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

      {/* Pagination dots */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '8px',
        marginBottom: '24px',
      }}>
        {features.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Show press item ${i + 1}`}
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


      <div ref={recognitionHeaderReveal.ref} style={{ ...recognitionHeaderReveal.style, marginBottom: '12px' }}>
        <p className="section-header">Recognition & Research</p>
      </div>

      {/* Featured recognition carousel */}
      <RecognitionCarousel />
    </section>
  )
}
