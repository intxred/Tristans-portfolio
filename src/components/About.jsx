import { useEffect, useRef, useState } from 'react'
import { Clock, MapPin, Zap, Layers, Briefcase } from 'lucide-react'
import { Rv, Tilt, Counter, SectionLabel } from './fx'
import { resultsStats } from '../data/content'
import { useScene } from '../hooks/useScroll'

const base = import.meta.env.BASE_URL

const STATEMENT =
  "I build practical tools for small businesses — the spreadsheet nobody trusted, the order lost in a chat thread — and ship them as software people open every day."

function ManilaClock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const f = () =>
      setT(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    f()
    const id = setInterval(f, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{t}</span>
}

function Bento({ className = '', children, d = 0 }) {
  return (
    <Rv d={d} dir="s" className={className}>
      <Tilt max={4} className="panel h-full p-6 sm:p-7 group" glare={false}>
        {children}
      </Tilt>
    </Rv>
  )
}

export default function About() {
  const pin = useRef(null)
  useScene(pin, { pinned: true })
  const words = STATEMENT.split(' ')

  return (
    <>
      {/* ---------- pinned statement: words light up with scroll ---------- */}
      <section id="about" ref={pin} style={{ height: '260vh' }} aria-label="About">
        <div className="sticky top-0 h-[100svh] flex items-center">
          <div className="max-w-[1180px] mx-auto px-6 lg:px-10 w-full">
            <div className="mb-8">
              <SectionLabel>About</SectionLabel>
            </div>
            <p className="scrub t-display !tracking-[-.05em] !leading-[1.06] max-w-[22ch] sm:max-w-[26ch] lg:max-w-[30ch]">
              {words.map((w, i) => (
                <span key={i} className="scrub-w" style={{ '--k': (i / words.length) * 1.0 }}>
                  {w}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- bento ---------- */}
      <section className="pt-32 sm:pt-52 pb-28 sm:pb-40" aria-label="At a glance">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-5 auto-rows-[minmax(190px,auto)]">
            <Rv dir="s" className="md:col-span-2 md:row-span-2">
              <Tilt max={7} className="panel h-full min-h-[360px] group" glare>
                <img
                  src={`${base}images/profile/photo.jpg`}
                  alt="Portrait of Red"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute left-6 bottom-6 right-6">
                  <p className="text-[13px] text-ink-soft mb-1">Self-taught · Philippines</p>
                  <p className="t-title !text-[1.7rem]">Hi, I’m Red.</p>
                </div>
              </Tilt>
            </Rv>

            <Bento className="md:col-span-4" d={60}>
              <Briefcase size={20} className="text-silver mb-4" />
              <h3 className="t-title mb-2">Full-stack developer</h3>
              <p className="t-lede !text-base max-w-[48ch]">
                Small-business tools, automation and DevOps. Interfaces people enjoy, APIs that hold up, pipelines that ship on their own.
              </p>
            </Bento>

            <Bento className="md:col-span-2" d={100}>
              <Layers size={20} className="text-silver mb-4" />
              <h3 className="text-xl mb-2">Core stack</h3>
              <p className="text-ink-soft text-[15px] leading-relaxed">JavaScript, Node.js, React, Next.js — plus Docker, CI/CD, SQL and Google Apps Script.</p>
            </Bento>

            <Bento className="md:col-span-2" d={140}>
              <MapPin size={20} className="text-silver mb-4" />
              <h3 className="text-xl mb-2">Manila, PH</h3>
              <p className="flex items-center gap-2 text-ink-soft text-[15px]">
                <Clock size={14} /> <ManilaClock /> <span className="text-[12px]">GMT+8</span>
              </p>
            </Bento>

            <Bento className="md:col-span-6" d={180}>
              <div className="flex items-center gap-3 mb-4">
                <Zap size={20} className="text-silver" />
                <span className="inline-flex items-center gap-2 text-[13px] text-silver">
                  <span className="w-2 h-2 rounded-full bg-white" style={{ animation: 'pulseDot 2s infinite' }} /> Open for freelance &amp; full-time
                </span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                {resultsStats.map((s) => (
                  <div key={s.label}>
                    <div className="text-[2.4rem] leading-none font-bold tracking-[-.05em] silver-text">
                      <Counter target={s.target} />
                    </div>
                    <div className="text-[12.5px] text-ink-soft mt-1.5 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </Bento>
          </div>
          <p className="t-mono mt-4 opacity-70">* Results from client engagements.</p>
        </div>
      </section>
    </>
  )
}
