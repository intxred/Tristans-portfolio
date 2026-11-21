import { useState, useCallback } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Rv, SectionLabel, Tilt } from './fx'
import CaseStudyStory from './CaseStudyStory'
import { caseStudies } from '../data/content'

const base = import.meta.env.BASE_URL

export default function CaseStudies() {
  const list = caseStudies
  const [story, setStory] = useState(null)
  const close = useCallback(() => setStory(null), [])

  return (
    <section id="case-studies" className="py-24 sm:py-36" aria-label="Case studies">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
        <Rv className="flex flex-wrap items-end justify-between gap-8 mb-12 sm:mb-16">
          <div>
            <SectionLabel>Case studies</SectionLabel>
            <h2 className="t-display mt-4 max-w-[14ch]">
              The <span className="silver-text">results.</span>
            </h2>
          </div>

        </Rv>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {list.map((c, i) => (
            <Rv key={c.slug} dir="s" d={i * 90}>
              <div
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`${c.title} — read the story`}
                className="h-full"
                onClick={() => setStory(c.slug)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStory(c.slug) } }}
              >
                <Tilt max={4} className="panel group h-full cursor-pointer" glare={false}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={`${base}images/case-studies/${c.slug}/cover.jpg`}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-contain bg-[#0b0c0e] transition-transform duration-[1100ms] ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11] via-transparent to-transparent" />
                    <div className="absolute left-5 top-5 flex gap-2">
                      {c.tags.map((t) => (
                        <span key={t} className="glass text-[12px] px-3 h-7 inline-flex items-center rounded-full text-silver">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 pt-3">
                    <p className="t-mono">{c.date}</p>
                    <h3 className="text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.15] mt-2 tracking-[-.03em] max-w-[26ch]">{c.title}</h3>
                    <span className="mt-6 inline-flex items-center gap-2 text-[14px] text-silver">
                      Read the story
                      <span className="w-8 h-8 rounded-full border border-white/20 grid place-items-center transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:rotate-45">
                        <ArrowUpRight size={15} />
                      </span>
                    </span>
                  </div>
                </Tilt>
              </div>
            </Rv>
          ))}
        </div>
      </div>
      <CaseStudyStory slug={story} onClose={close} />
    </section>
  )
}