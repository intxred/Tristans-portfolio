import { useCallback, useEffect, useRef, useState } from 'react'
import Nav from './components/Nav'
import FlowBg from './components/FlowBg'
import Loader from './components/Loader'
import CommandPalette from './components/CommandPalette'
import Hero from './components/Hero'
import About from './components/About'
import Stack from './components/Stack'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Products from './components/Products'
import CaseStudies from './components/CaseStudies'
import Playground from './components/Playground'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Corkboard from './components/Corkboard'
import Automation from './components/Automation'
import { useScrollSpy } from './hooks/useScroll'
import { navSections } from './data/content'

const sectionIds = ['about', 'stack', 'experience', ...navSections.map((s) => s.id).filter((i) => i !== 'about'), 'playground', 'contact']
const HASH_TO_VIEW = { '#corkboard': 'corkboard', '#automation': 'automation' }
const viewFromHash = () => HASH_TO_VIEW[window.location.hash] || 'portfolio'
const logo = `${import.meta.env.BASE_URL}images/brand/logo.jpg`

export default function App() {
  const activeId = useScrollSpy(sectionIds)
  const [cmdkOpen, setCmdkOpen] = useState(false)
  const [view, setView] = useState(viewFromHash)
  const [veil, setVeil] = useState('idle') // idle | in | out
  const busy = useRef(false)
  const [loaded, setLoaded] = useState(false)

  /* Page transition: a black panel with a silver rim wipes up, the view swaps, then it wipes away. */
  const transition = useCallback((swap) => {
    if (busy.current) return
    busy.current = true
    setVeil('in')
    setTimeout(() => {
      swap()
      window.scrollTo({ top: 0, behavior: 'instant' })
      setVeil('out')
      setTimeout(() => {
        setVeil('idle')
        busy.current = false
      }, 650)
    }, 560)
  }, [])

  const openView = (name) =>
    transition(() => {
      window.history.pushState(null, '', `#${name}`)
      setView(name)
    })

  const backToPortfolio = (sectionId) =>
    transition(() => {
      window.history.pushState(null, '', '#home')
      setView('portfolio')
      if (typeof sectionId === 'string') {
        setTimeout(() => document.getElementById(sectionId)?.scrollIntoView(), 60)
      }
    })

  useEffect(() => {
    const onHash = () => setView(viewFromHash())
    window.addEventListener('popstate', onHash)
    window.addEventListener('hashchange', onHash)
    return () => {
      window.removeEventListener('popstate', onHash)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdkOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const inPortfolio = view === 'portfolio'

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Nav
        activeId={inPortfolio ? activeId : ''}
        onOpenCmdk={() => setCmdkOpen(true)}
        inPortfolio={inPortfolio}
        onHome={backToPortfolio}
      />
      <CommandPalette
        open={cmdkOpen}
        onClose={() => setCmdkOpen(false)}
        onThemeToggle={() => {}}
        onOpenCorkboard={() => openView('corkboard')}
        onOpenAutomation={() => openView('automation')}
      />

      <div className="flow-ambient" aria-hidden="true">
        <FlowBg simple />
      </div>
      <main id="main" className="relative z-[1]">
        {view === 'corkboard' && (
          <div className="theme-cork pt-20">
            <Corkboard onBack={() => backToPortfolio()} />
          </div>
        )}
        {view === 'automation' && <Automation onBack={() => backToPortfolio()} />}
        {inPortfolio && (
          <>
            <Hero />
            <About />
            <Stack />
            <Experience />
            <Projects />
            <Certifications />
            <Products />
            <CaseStudies />
            <Playground onOpenAutomation={() => openView('automation')} onOpenCorkboard={() => openView('corkboard')} />
            <Contact />
          </>
        )}
      </main>
      {inPortfolio && <Footer />}

      <div
        aria-hidden="true"
        className="fixed inset-0 z-[700] pointer-events-none grid place-items-center bg-black"
        style={{
          display: veil === 'idle' ? 'none' : 'grid',
          animation: veil === 'in' ? 'wipeIn .56s var(--ease-io) forwards' : veil === 'out' ? 'wipeOut .64s var(--ease-io) forwards' : 'none',
          boxShadow: '0 -2px 0 rgba(255,255,255,.55), 0 -40px 120px rgba(190,196,208,.35)',
        }}
      >
        <img src={logo} alt="" className="w-14 h-14 rounded-full ring-1 ring-white/30" />
      </div>
    </>
  )
}
