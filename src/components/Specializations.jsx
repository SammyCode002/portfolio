import { useScrollFade } from '../hooks/useScrollFade'

const skills = [
  'Python', 'JavaScript', 'React', 'Node.js', 'Bash', 'MATLAB', 'C++',
  'HTML5', 'CSS3', 'Tailwind CSS', 'Flask',
  'PyTorch', 'scikit-learn', 'MongoDB', 'SQL', 'Galileo Foundation Model',
  'ArcGIS Pro', 'ArcGIS Online', 'Google Earth Engine', 'Remote Sensing', 'QGIS',
  'Kali Linux', 'Wireshark', 'Nmap',
  'HPC / Slurm', 'Jamf MDM', 'Linux', 'Git',
]
const accent = '#6bcce8'

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
        background: 'radial-gradient(ellipse at 25% 50%, rgba(107,204,232,0.04) 0%, transparent 55%), #0a1525',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1d3458] to-transparent" />
      {/* Ambient blobs */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6bb8e8, transparent)' }} />

      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div ref={headerRef}>
          <h2 className="text-4xl md:text-5xl font-bold text-[#eaf6fb] mb-12 flex items-center gap-4">
            <span className="text-[#6bcce8] font-mono font-normal">/</span>
            <span>about <span className="gradient-text">me</span></span>
            <span className="flex-1 h-px bg-gradient-to-r from-[#1d3458] to-transparent ml-4 hidden sm:block" />
          </h2>
        </div>

        {/* Bio */}
        <div ref={bioRef}>
          <p className="text-[#c0d8e8] text-lg leading-relaxed mb-6">
            I am a <span className="text-[#eaf6fb] font-semibold">Computer Science</span> student at{' '}
            <span className="text-[#6bcce8] font-semibold">Oregon State University</span>, currently working as a{' '}
            <span className="text-[#eaf6fb] font-semibold">IT Specialist</span> at the{' '}
            <span className="text-[#6bcce8] font-semibold">Hawaii State Department of Education</span>.
            My background spans cybersecurity, climate tech, research computing, and IT.
          </p>
          <p className="text-[#c0d8e8] text-lg leading-relaxed mb-12">
            I have contributed to{' '}
            <span className="text-[#eaf6fb] font-semibold">NSF-funded wildfire research</span>,{' '}
            <span className="text-[#eaf6fb] font-semibold">coastal erosion monitoring</span> with Oceanit, and{' '}
            <span className="text-[#6bcce8] font-semibold">STEM education outreach</span> through Verizon Innovative Learning and STEM Achievers at the University of Hawaii Maui College.
          </p>
        </div>

        {/* Skills */}
        <div ref={skillsRef} className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: `${accent}0d`,
                  border: `1px solid ${accent}25`,
                  color: '#c0d8e8',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${accent}60`
                  e.currentTarget.style.color = accent
                  e.currentTarget.style.background = `${accent}18`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${accent}25`
                  e.currentTarget.style.color = '#c0d8e8'
                  e.currentTarget.style.background = `${accent}0d`
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Personal */}
        <p ref={footerRef} className="text-[#c0d8e8] text-lg leading-relaxed">
          Outside of tech, I love video games.
        </p>
      </div>
    </section>
  )
}
