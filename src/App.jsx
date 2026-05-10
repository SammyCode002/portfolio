import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Specializations from './components/Specializations'
import Projects from './components/Projects'
import Upcoming from './components/Upcoming'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import { NavProvider, useNav } from './context/NavContext'

const PAGES = {
  hero: Hero,
  about: Specializations,
  projects: Projects,
  upcoming: Upcoming,
  experience: Experience,
  contact: Contact,
}

function ActivePage({ ready }) {
  const { page } = useNav()
  const Component = PAGES[page] || Hero
  return (
    <main
      key={page}
      className="page-fade flex-1 overflow-y-auto pt-16"
    >
      <Component ready={ready} />
      <Footer />
    </main>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <NavProvider>
      <div className="relative h-full flex flex-col">
        <Navbar />
        <ActivePage ready={!loading} />
      </div>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
    </NavProvider>
  )
}
