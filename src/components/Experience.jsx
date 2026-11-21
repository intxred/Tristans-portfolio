import { useRef } from 'react'
import { Rv, SectionLabel } from './fx'
import { experience } from '../data/content'
import { useScene } from '../hooks/useScroll'

export default function Experience() {
  const ref = useRef(null)
  useScene(ref)
  return (
    <section id="experience" ref={ref} className="py-24 sm:py-36" aria-label="Experience">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
        <div className="lg:sticky lg:top-[22vh] self-start">
          <Rv>
            <SectionLabel>Experience</SectionLabel>
            <h2 className="t-display mt-4">
              From first <span className="silver-text">“Hello, world”</span> to production.
            </h2>
            <p className="t-lede mt-6 max-w-[38ch]">Three years of learning in public — each step shipped something real.</p>
          </Rv>
        </div>

        <ol className="relative list-none m-0 p-0 pl-14 sm:pl-16">
          <div className="tl-line" aria-hidden="true">
            <div className="tl-fill" />
          </div>
          {experience.map((row, i) => (
            <Rv as="li" key={row.year} d={i * 40} className="relative py-9 sm:py-11 border-b border-white/[.07] last:border-0">
              <span
                className="absolute -left-[46px] sm:-left-[50px] top-[2.8rem] sm:top-[3.3rem] w-3.5 h-3.5 rounded-full bg-black ring-2 ring-silver"
                style={{ boxShadow: '0 0 20px rgba(255,255,255,.55)' }}
                aria-hidden="true"
              />
              <div className="tl-year text-[clamp(3rem,8vw,6.5rem)] leading-none font-bold tracking-[-.06em]">{row.year}</div>
              <h3 className="t-title mt-3">{row.role}</h3>
              <p className="text-ink-soft mt-1.5 text-[15px]">{row.org}</p>
            </Rv>
          ))}
        </ol>
      </div>
    </section>
  )
}
