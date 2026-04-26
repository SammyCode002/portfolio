import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Specializations from './components/Specializations'
import Projects from './components/Projects'
import Upcoming from './components/Upcoming'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Specializations />
        <Projects />
        <Upcoming />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
