import { useScrollFade } from '../hooks/useScrollFade'

const skillGroups = [
  {
    label: 'Languages',
    color: '#00d4d4',
    skills: ['Python', 'JavaScript', 'React', 'Bash', 'MATLAB'],
  },
  {
    label: 'Geospatial',
    color: '#14b8a6',
    skills: ['ArcGIS Pro', 'Google Earth Engine', 'Remote Sensing', 'QGIS'],
  },
  {
    label: 'ML / AI',
    color: '#06b6d4',
    skills: ['PyTorch', 'scikit-learn', 'Galileo Foundation Model'],
  },
  {
    label: 'Infrastructure',
    color: '#2dd4bf',
    skills: ['HPC / Slurm', 'Jamf MDM', 'Linux', 'Git'],
  },
]

export default function Specializations() {
  const headerRef = useScrollFade(0)
  const bioRef = useScrollFade(100)
  const skillsRef = useScrollFade(200)
  const footerRef = useScrollFade(280)

  return (
    <section
      id="about"
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 25% 50%, rgba(0,212,212,0.04) 0%, transparent 55%), #050c0c',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a3232] to-transparent" />
      {/* Ambient blobs */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #14b8a6, transparent)' }} />

      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div ref={headerRef}>
          <h2 className="text-4xl md:text-5xl font-bold text-[#e8f4f4] mb-12 flex items-center gap-4">
            <span className="text-[#00d4d4] font-mono font-normal">/</span>
            <span>about <span className="gradient-text">me</span></span>
            <span className="flex-1 h-px bg-gradient-to-r from-[#1a3232] to-transparent ml-4 hidden sm:block" />
          </h2>
        </div>

        {/* Bio */}
        <div ref={bioRef}>
          <p className="text-[#b0cece] text-lg leading-relaxed mb-6">
            I am a <span className="text-[#e8f4f4] font-semibold">Computer Science</span> student at{' '}
            <span className="text-[#00d4d4] font-semibold">Oregon State University</span>, currently working as a{' '}
            <span className="text-[#e8f4f4] font-semibold">Data Processing User Support Technician</span> at the{' '}
            <span className="text-[#00d4d4] font-semibold">Hawaii State Department of Education</span>.
            My background spans cybersecurity, GIS, research computing, and IT.
          </p>
          <p className="text-[#b0cece] text-lg leading-relaxed mb-12">
            I have contributed to{' '}
            <span className="text-[#e8f4f4] font-semibold">NSF-funded wildfire research</span>,{' '}
            <span className="text-[#e8f4f4] font-semibold">coastal erosion monitoring</span> with Oceanit, and{' '}
            <span className="text-[#00d4d4] font-semibold">NASA Harvest</span> food security analysis.
            I also mentor students in STEM during the summer at the University of Hawaii Maui College.
          </p>
        </div>

        {/* Skills */}
        <div ref={skillsRef} className="space-y-6 mb-12">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: group.color }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: group.color }}>
                  {group.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: `${group.color}0d`,
                      border: `1px solid ${group.color}25`,
                      color: '#b0cece',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${group.color}60`
                      e.currentTarget.style.color = group.color
                      e.currentTarget.style.background = `${group.color}18`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${group.color}25`
                      e.currentTarget.style.color = '#b0cece'
                      e.currentTarget.style.background = `${group.color}0d`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Personal */}
        <p ref={footerRef} className="text-[#b0cece] text-lg leading-relaxed">
          Outside of tech, I love video games.
        </p>
      </div>
    </section>
  )
}
