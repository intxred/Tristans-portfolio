import { useEffect } from 'react'
import { X } from 'lucide-react'
import { caseStudyStories } from '../data/content'

const base = import.meta.env.BASE_URL

function Block({ label, children }) {
  return (
    <section className="mt-10">
      <h3 className="text-[12px] tracking-[0.18em] uppercase text-white/50 mb-4">{label}</h3>
      {children}
    </section>
  )
}

export default function CaseStudyStory({ slug, onClose }) {
  const story = caseStudyStories.find((s) => s.slug === slug)

  useEffect(() => {
    if (!story) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [story, onClose])

  if (!story) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm px-3 sm:px-6 py-6 sm:py-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${story.title} case study`}
    >
      <article
        className="relative w-full max-w-[880px] rounded-2xl border border-white/10 bg-[#0e0f12] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/60 text-white/80 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex items-center justify-center bg-[#0b0c0e] rounded-t-2xl border-b border-white/10 p-4 sm:p-6">
          <img
            src={`${base}images/case-studies/${story.slug}/cover.jpg`}
            alt={`${story.title} screenshot`}
            className="max-h-[420px] w-auto max-w-full object-contain rounded-lg"
          />
        </div>

        <div className="p-6 sm:p-10">
          <p className="text-[13px] text-white/55">
            {story.kind} · {story.role}
          </p>
          <h2 className="mt-3 text-[clamp(1.6rem,3.6vw,2.4rem)] font-semibold leading-tight">{story.title}</h2>
          <p className="mt-4 text-[1.05rem] text-white/75 max-w-[60ch]">{story.tagline}</p>
          <p className="mt-6 text-white/70 leading-relaxed">{story.overview}</p>

          <Block label="The problem">
            <ul className="space-y-3 text-white/75 leading-relaxed">
              {story.problem.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block label="What I built">
            <ul className="space-y-3 text-white/75 leading-relaxed">
              {story.solution.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block label="Impact on the business">
            <div className="grid gap-3 sm:grid-cols-2">
              {story.impact.map((i) => (
                <div key={i.title} className="rounded-xl border border-white/10 bg-white/[.03] p-5">
                  <h4 className="font-medium">{i.title}</h4>
                  <p className="mt-2 text-[14.5px] text-white/65 leading-relaxed">{i.body}</p>
                </div>
              ))}
            </div>
          </Block>

          {story.responsibleUse && (
            <Block label="Using it responsibly">
              <p className="text-white/75 leading-relaxed">{story.responsibleUse}</p>
            </Block>
          )}

          {story.next && (
            <Block label="What's next">
              <ul className="flex flex-wrap gap-2">
                {story.next.map((t) => (
                  <li key={t} className="rounded-full border border-white/12 bg-white/[.04] px-3 py-1.5 text-[13px] text-white/70">
                    {t}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {story.tech && (
            <Block label="Built with">
              <ul className="flex flex-wrap gap-2">
                {story.tech.map((t) => (
                  <li key={t} className="rounded-full border border-white/12 px-3 py-1.5 text-[13px] text-white/70">
                    {t}
                  </li>
                ))}
              </ul>
            </Block>
          )}
        </div>
      </article>
    </div>
  )
}