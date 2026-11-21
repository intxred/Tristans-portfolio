import { useEffect, useRef, useState } from 'react'
import { ribbonOutlines, RIBBON_VIEWBOX } from '../data/ribbonPaths'

const logo = `${import.meta.env.BASE_URL}images/brand/logo.jpg`
const MIN_MS = 2600

/* Intro: the ribbon outlines draw themselves, a light streak flows along them, a counter climbs,
   then the whole panel lifts away. Locks scroll while visible. */
export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [phase, setPhase] = useState('run') // run | out | gone
  const reduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  /* Bullet-proof lifecycle: every exit path goes through finish(), which is idempotent and
     driven by plain timers (not rAF or animation events), so a background tab, a missed
     `load` event, a slow font or a skipped animation can never leave the loader on screen
     or scroll locked. */
  useEffect(() => {
    const min = reduced.current ? 400 : MIN_MS
    const HARD = reduced.current ? 1500 : 4200 // absolute ceiling, no matter what
    const t0 = Date.now()
    let ready = document.readyState === 'complete'
    let done = false
    let raf = 0
    let shown = 0
    const timers = []

    const unlock = () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    const finish = () => {
      if (done) return
      done = true
      cancelAnimationFrame(raf)
      setPct(100)
      setPhase('out')
      timers.push(
        setTimeout(() => {
          unlock()
          setPhase('gone')
          onDone?.()
        }, reduced.current ? 50 : 900)
      )
      // scrolling is allowed as soon as the panel starts lifting
      timers.push(setTimeout(unlock, 250))
    }

    const markReady = () => (ready = true)
    if (!ready) window.addEventListener('load', markReady, { once: true })
    ;(document.fonts?.ready ?? Promise.resolve()).then(() => {}, () => {})
    timers.push(setTimeout(markReady, 3000))

    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    const tick = () => {
      const elapsed = Date.now() - t0
      const timeP = Math.min(1, elapsed / min)
      const target = ready ? timeP : Math.min(timeP, 0.92)
      shown += ((1 - Math.pow(1 - target, 2.2)) - shown) * 0.2
      setPct(Math.min(99, Math.round(shown * 100)))
      if (ready && elapsed >= min) return finish()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // independent of rAF (paused in hidden tabs): a steady check + the hard ceiling
    const poll = setInterval(() => {
      const elapsed = Date.now() - t0
      if ((ready && elapsed >= min) || elapsed >= HARD || document.hidden) finish()
    }, 200)
    timers.push(setTimeout(finish, HARD))
    const onVis = () => document.hidden && finish()
    document.addEventListener('visibilitychange', onVis)

    return () => {
      // StrictMode / unmount safety: never leave the page locked
      cancelAnimationFrame(raf)
      clearInterval(poll)
      timers.forEach(clearTimeout)
      window.removeEventListener('load', markReady)
      document.removeEventListener('visibilitychange', onVis)
      if (!done) unlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (phase === 'gone') return null

  return (
    <div className={`loader ${phase === 'out' ? 'loader-out' : ''}`} role="status" style={phase === 'out' ? { pointerEvents: 'none' } : undefined} aria-live="polite" aria-label="Loading">
      <svg className="loader-svg" viewBox={RIBBON_VIEWBOX} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="ld-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset=".6" stopColor="#9aa0ae" />
            <stop offset="1" stopColor="#4d5059" />
          </linearGradient>
        </defs>
        {ribbonOutlines.map((d, i) => (
          <g key={i}>
            {/* the outline draws in */}
            <path d={d} pathLength="1" className="ld-draw" style={{ animationDelay: `${0.15 + i * 0.35}s` }} />
            {/* soft glow twin + travelling highlight */}
            <path d={d} pathLength="1" className="ld-glow" style={{ animationDelay: `${0.15 + i * 0.35}s` }} />
            <path d={d} pathLength="1" className="ld-flow" style={{ animationDelay: `${1.2 + i * 0.5}s` }} />
          </g>
        ))}
      </svg>
      <div className="loader-center">
        <img src={logo} alt="" className="loader-logo" />
        <div className="loader-word">RED®</div>
        <div className="loader-count" aria-hidden="true">
          <span className="tabular-nums">{String(pct).padStart(3, '0')}</span>
        </div>
        <div className="loader-bar" aria-hidden="true">
          <i style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
      </div>
    </div>
  )
}
