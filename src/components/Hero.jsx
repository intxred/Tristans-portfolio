import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Github, Linkedin } from 'lucide-react'
import Ribbons from './Ribbons'
import FlowBg from './FlowBg'
import { Magnetic } from './fx'
import { easeInOut, easeOut, onFrame, progressOf, range } from '../hooks/useScroll'
import { profileLinks, stackCardsData } from '../data/content'

const base = import.meta.env.BASE_URL

const letters = (t) => [...t].map((c, i) => <span className="hl" key={i}>{c}</span>)

function ScreenProject({ card }) {
  const [name, ...rest] = card.title.split(' — ')
  const host = card.link.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <div className="scr-win" key={card.slug}>
      <div className="scr-win-bar">
        <i /><i /><i />
        <span className="scr-url">{host}</span>
      </div>
      <div className="scr-body" key={card.slug}>
        <div>
          <span className="scr-badge">{card.badgeMain.replace(/[❮❯]/g, '').trim().toLowerCase().replace(/^#1 /, '#1 ')}</span>
          <div className="scr-title">{name}</div>
          <div className="scr-sub">{rest.join(' — ')}</div>
          <p className="scr-desc">{card.desc}</p>
          <a className="scr-cta" href={card.link} target="_blank" rel="noopener noreferrer" tabIndex={0}>
            Visit live site <ArrowUpRight style={{ width: '1.4cqw', height: '1.4cqw' }} />
          </a>
        </div>
        <div className="scr-art">
          <img src={`${base}images/stack/${card.slug}/logo.jpg`} alt={`${name} logo`} />
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const lastTab = useRef(0)
  const [tab, setTab] = useState(0)
  const [reducedStatic] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const parRef = useRef(null)
  const spotRef = useRef(null)
  const copyRef = useRef(null)
  const cueRef = useRef(null)
  const bgRef = useRef(null)
  const lapRef = useRef(null)
  const lidRef = useRef(null)
  const glareRef = useRef(null)

  useEffect(() => {
    if (reducedStatic) return
    const sec = ref.current
    return onFrame(() => {
      const r = sec.getBoundingClientRect()
      const vh = window.innerHeight
      if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return
      const p = progressOf(sec, true)
      const copy = easeInOut(range(p, 0.05, 0.34))
      const rise = easeOut(range(p, 0.08, 0.44))
      const open = easeInOut(range(p, 0.2, 0.55))
      const zoom = easeInOut(range(p, 0.62, 0.9))
      const zMax = window.innerWidth < 641 ? 0.45 : 1.18
      // everything is composited transform/opacity only
      copyRef.current.style.opacity = Math.max(0, 1 - copy * 1.15).toFixed(3)
      copyRef.current.style.transform = `translate3d(0,${(-copy * 10).toFixed(2)}vh,0) scale(${(1 - copy * 0.1).toFixed(4)})`
      cueRef.current.style.opacity = Math.max(0, 1 - copy * 3).toFixed(3)
      bgRef.current.style.opacity = (1 - zoom * 0.85).toFixed(3)
      bgRef.current.style.transform = `translate3d(0,${(-p * 14).toFixed(2)}vh,0) scale(${(1 + p * 0.12).toFixed(4)})`
      // laptop zoom changes the real layout width (crisp text, no resampling); lid ends perfectly flat
      const small = window.innerWidth < 641
      const bw = Math.min(window.innerWidth * (small ? 0.94 : 0.86), 820, window.innerHeight * 1.12)
      lapRef.current.style.setProperty('--w', `${(bw * (1 + zoom * zMax)).toFixed(1)}px`)
      lapRef.current.style.transform = `translate3d(0,${((1 - rise) * 86).toFixed(2)}vh,0) rotateX(${((1 - open) * 3).toFixed(2)}deg)`
      lidRef.current.style.transform = `rotateX(${(open * 86 - 86).toFixed(2)}deg)`
      glareRef.current.style.transform = `translate3d(${((p - 0.5) * 90).toFixed(1)}%,0,0)`
      const t = Math.min(2, Math.floor(range(p, 0.62, 0.99) * 3))
      if (t !== lastTab.current) {
        lastTab.current = t
        setTab(t)
      }
    })
  }, [reducedStatic])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={ref}
      className={`hero ${reducedStatic ? 'hero-static' : ''}`}
      style={{ height: reducedStatic ? 'auto' : '420vh' }}
      aria-label="Introduction"
    >
      <div
        className="hero-pin"
        onPointerMove={(e) => {
          if (e.pointerType === 'touch') return
          const r = e.currentTarget.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width
          const y = (e.clientY - r.top) / r.height
          parRef.current?.style.setProperty('--px', `${((0.5 - x) * 60).toFixed(1)}px`)
          parRef.current?.style.setProperty('--py', `${((0.5 - y) * 40).toFixed(1)}px`)
          spotRef.current?.style.setProperty('--hx', `${e.clientX - r.left}px`)
          spotRef.current?.style.setProperty('--hy', `${e.clientY - r.top}px`)
        }}
        onPointerLeave={() => {
          parRef.current?.style.setProperty('--px', '0px')
          parRef.current?.style.setProperty('--py', '0px')
        }}
      >
        <div className="hero-bg" ref={bgRef} aria-hidden="true">
          <div className="hero-par" ref={parRef}>
            <FlowBg />
          </div>
        </div>
        <div className="hero-spot" ref={spotRef} aria-hidden="true" />
        <div className="hero-vignette" />

        <div className="hero-copy" ref={copyRef}>
          <span
            className="inline-flex items-center gap-2.5 rounded-full px-4 h-9 text-[13px] text-silver mb-7 bg-black/50 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-white" style={{ animation: 'pulseDot 2s infinite', boxShadow: '0 0 12px #fff' }} />
            Available for projects · Manila, GMT+8
          </span>
          <h1 className="t-hero silver-sweep">
            <span aria-hidden="true">
              {letters('Built')}
              <br className="sm:hidden" /> {letters('to')} {letters('ship.')}
            </span>
            <span className="sr-only">Built to ship.</span>
          </h1>
          <p className="t-lede max-w-[34ch] sm:max-w-[52ch] mt-7">
            Full-stack developer turning spreadsheets, DMs and manual busywork into fast, reliable software — from
            the interface to the server to the deploy pipeline.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <Magnetic>
              <a href="#projects" onClick={scrollTo('projects')} className="btn btn-silver">
                View selected work <ArrowRight size={16} />
              </a>
            </Magnetic>
            <a href="#contact" onClick={scrollTo('contact')} className="btn btn-line">
              Get in touch
            </a>
            <a href={profileLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="btn btn-line !w-12 !px-0">
              <Github size={18} />
            </a>
            <a href={profileLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="btn btn-line !w-12 !px-0">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {!reducedStatic && (
          <div className="hero-cue" ref={cueRef} aria-hidden="true">
            Scroll <i />
          </div>
        )}

        {/* ---- the 3D laptop ---- */}
        <div className="lap-stage">
          <div className="lap" ref={lapRef}>
            <div className="lap-shadow" />
            <div className="deck" style={{ backgroundImage: `url(${base}images/brand/deck.jpg)` }} />
            <div className="deck-front" />
            <div className="lid" ref={lidRef}>
              <div className="lid-face lid-front">
                <div
                  className="screen"
                  onPointerMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect()
                    e.currentTarget.style.setProperty('--sx', `${((e.clientX - r.left) / r.width) * 100}%`)
                    e.currentTarget.style.setProperty('--sy', `${((e.clientY - r.top) / r.height) * 100}%`)
                    const art = e.currentTarget.querySelector('.scr-art')
                    if (art) {
                      const x = (e.clientX - r.left) / r.width - 0.5
                      const y = (e.clientY - r.top) / r.height - 0.5
                      art.style.transform = `perspective(60cqw) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`
                    }
                  }}
                  onPointerLeave={(e) => {
                    const art = e.currentTarget.querySelector('.scr-art')
                    if (art) art.style.transform = ''
                  }}
                >
                  <div className="scr-spot" />
                  <div className="scr-wall">
                    <Ribbons />
                  </div>
                  <div className="notch" />
                  <div className="scr-menubar" aria-hidden="true">
                    <div>
                      <b>RED®</b>
                      <span>Projects</span>
                      <span>Live</span>
                      <span>Window</span>
                    </div>
                    <div>
                      <span>Quillio · Red &amp; Spice · TruthBot</span>
                    </div>
                  </div>
                  <ScreenProject card={stackCardsData[tab]} />
                  <div className="scr-dock" role="tablist" aria-label="Featured projects">
                    {stackCardsData.map((c, i) => (
                      <button
                        key={c.slug}
                        role="tab"
                        aria-selected={tab === i}
                        onClick={() => {
                          lastTab.current = i
                          setTab(i)
                        }}
                      >
                        {c.title.split(' — ')[0]}
                      </button>
                    ))}
                  </div>
                  <div className="scr-glare" ref={glareRef} />
                </div>
              </div>
              <div className="lid-face lid-back">
                <img src={`${base}images/brand/logo.jpg`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}