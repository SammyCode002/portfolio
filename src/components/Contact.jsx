import { useState } from 'react'

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Location',
    value: 'Maui, Hawaii',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'samuel.dameg@k12.hi.us',
    href: 'mailto:samuel.dameg@k12.hi.us',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/SammyCode002',
    href: 'https://github.com/SammyCode002',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/samdameg',
    href: 'https://www.linkedin.com/in/samdameg/',
  },
]

function InputField({ label, id, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-[#7a9e9e]">
        {label} {required && <span className="text-[#00d4d4]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl bg-[#091414] border border-[#1a3232] text-[#e8f4f4] placeholder-[#4a6e6e] text-sm outline-none transition-all focus:border-[#00d4d4]/50 focus:ring-1 focus:ring-[#00d4d4]/20 hover:border-[#1a4040]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      />
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(null), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(null), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(null), 4000)
    }
  }

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1a3232] to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[#00d4d4] text-sm font-medium tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#e8f4f4]">
            Let's{' '}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-[#7a9e9e] text-lg mt-4 max-w-xl">
            Open to new opportunities, collaborations, and conversations about tech in Hawaii and beyond.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact form — 3 cols */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-[#e8f4f4] font-semibold text-lg mb-6">Send a Message</h3>

              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#00d4d4]/10 border border-[#00d4d4]/30 flex items-center justify-center animate-pulse-glow">
                    <svg className="w-7 h-7 text-[#00d4d4]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[#e8f4f4] font-medium">Message sent!</p>
                  <p className="text-[#7a9e9e] text-sm text-center">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField
                      label="Name"
                      id="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange('name')}
                      required
                    />
                    <InputField
                      label="Email"
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange('email')}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-[#7a9e9e]">
                      Message <span className="text-[#00d4d4]">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="What's on your mind?"
                      value={form.message}
                      onChange={handleChange('message')}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#091414] border border-[#1a3232] text-[#e8f4f4] placeholder-[#4a6e6e] text-sm outline-none transition-all focus:border-[#00d4d4]/50 focus:ring-1 focus:ring-[#00d4d4]/20 hover:border-[#1a4040] resize-none"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#00d4d4] text-[#050c0c] font-semibold text-sm hover:bg-[#00bcbc] transition-all disabled:opacity-60 disabled:cursor-not-allowed glow-cyan"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : status === 'error' ? (
                      <>Something went wrong — try emailing directly.</>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact info — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="glass-card rounded-2xl p-6 mb-2">
              <h3 className="text-[#e8f4f4] font-semibold text-base mb-5">Contact Details</h3>
              <div className="flex flex-col gap-4">
                {contactInfo.map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#00d4d4]/8 border border-[#00d4d4]/15 flex items-center justify-center flex-shrink-0 text-[#00d4d4]">
                      {icon}
                    </div>
                    <div>
                      <p className="text-[#4a6e6e] text-xs mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-[#7a9e9e] text-sm hover:text-[#00d4d4] transition-colors no-underline"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-[#7a9e9e] text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="glass-card rounded-2xl p-6 border border-[#00d4d4]/15">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
                <span className="text-[#00d4d4] text-sm font-medium">Available for Work</span>
              </div>
              <p className="text-[#7a9e9e] text-sm leading-relaxed">
                Currently seeking full-time or internship opportunities in tech and STEM.
              </p>
              <div className="mt-4 pt-4 border-t border-[#1a3232]">
                <p className="text-[#4a6e6e] text-xs">Response time</p>
                <p className="text-[#e8f4f4] text-sm font-medium mt-0.5">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
