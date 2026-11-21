import { useEffect, useRef, useState, useCallback } from 'react'
import ProjectModal from './ProjectModal'
import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from './fx'
import { projectTiles } from '../data/content'
import { onFrame, clamp, useReducedMotion } from '../hooks/useScroll'

const base = import.meta.env.BASE_URL

export default function Projects() {
  const wrap = useRef(null)
  const cards = useRef([])
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const nav = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + projectTiles.length) % projectTiles.length)), [])

  /* Each card scales back and dims as the next one slides over it. */
  useEffect(() => {
    if (reduced) return
    return onFrame(() => {
      const vh = window.innerHeight
      cards.current.forEach((el, i) => {
        if (!el) return
        const next = cards.current[i + 1]
        const inner = el.firstChild
        if (!next) return
        const stuck = vh * 0.11 + i * 20
        const dist = next.getBoundingClientRect().top - stuck
        const c = 1 - clamp(dist / (vh * 0.85))
        inner.style.transform = `scale(${(1 - c * 0.07).toFixed(4)}) translate3d(0,${(-c * 14).toFixed(1)}px,0)`
        el.style.setProperty('--dim', (c * 0.62).toFixed(3))
      })
    })
  }, [reduced])

  return (
    <section id="projects" ref={wrap} className="pt-20 sm:pt-32 pb-10" aria-label="Selected work">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
        <div className="mb-14 sm:mb-20">
          <SectionLabel>Selected work</SectionLabel>
          <h2 className="t-display mt-4 max-w-[16ch]">
            Real problems. <span className="silver-text">Shipped.</span>
          </h2>
        </div>

        <div className="pstack">
          {projectTiles.map((p, i) => (
            <article
              key={p.slug}
              ref={(el) => (cards.current[i] = el)}
              className="pcard"
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`${p.title} — view details`}
              onClick={() => setOpen(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(i) } }}
              style={{ '--i': i, zIndex: i + 1 }}
            >
              <div className="pcard-in">
                <div className={`h-full grid md:grid-cols-2 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                  <div className="p-7 sm:p-10 lg:p-14 flex flex-col justify-between order-2 md:order-none">
                    <div>
                      <span className="inline-flex items-center gap-2 text-[13px] text-ink-soft">
                        <span className="tabular-nums text-silver">{String(i + 1).padStart(2, '0')}</span>
                        <span className="w-8 h-px bg-white/20" />
                        {p.tags.split(' · ')[0]}
                      </span>
                      <h3 className="t-title !text-[clamp(1.7rem,3.4vw,2.9rem)] mt-5 max-w-[16ch]">{p.title}</h3>
                      <p className="t-lede !text-[1rem] sm:!text-[1.1rem] mt-4 max-w-[40ch]">{p.desc}</p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-2 mt-6">
                        {p.stack.split(' · ').map((s) => (
                          <span key={s} className="px-3 h-8 inline-flex items-center rounded-full text-[12.5px] border border-white/12 bg-white/[.04] text-silver">
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="t-mono mt-4 flex items-center gap-1.5">
                        {p.tags}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <span className="pcard-cta">View details <ArrowUpRight size={15} /></span>
                        {p.url && (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pcard-cta"
                            aria-label={`Visit ${p.title} site`}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                          >
                            Visit site <ArrowUpRight size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden order-1 md:order-none min-h-[190px] bg-[#0b0c0e]">
                    <img
                      src={`${base}images/projects/${p.slug}/cover.jpg`}
                      alt={`${p.title} preview`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-contain p-3 sm:p-5"
                    />
                    <span aria-hidden="true" className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: 'sheen 6s ease-in-out infinite', animationDelay: `${i * 0.8}s` }} />
                  </div>
                </div>
                <div className="pcard-dim" />
              </div>
            </article>
          ))}
        </div>
      </div>
      <ProjectModal index={open} onClose={close} onNav={nav} />
    </section>
  )
}