import LeftPanel from './components/LeftPanel'
import RightNavbar from './components/RightNavbar'
import Intro from './components/Intro'
import Projects from './components/Projects'
import Press from './components/Press'
import Experience from './components/Experience'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <div className="split-layout">
        <LeftPanel />
        <main className="right-panel right-panel-enter">
          <RightNavbar />
          <Intro />
          <Projects />
          <Press />
          <Experience />
        </main>
      </div>
    </ThemeProvider>
  )
}
