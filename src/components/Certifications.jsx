import { useRef, useState } from 'react'
import { Award } from 'lucide-react'
import { Rv, SectionLabel, spotHandlers } from './fx'
import { certifications } from '../data/content'
import { useScene } from '../hooks/useScroll'
import CertModal from './CertModal'

const base = import.meta.env.BASE_URL

const tone = {
  m1: 'linear-gradient(150deg,#f3f4f6,#aeb2ba)',
  m2: 'linear-gradient(150deg,#d9dce1,#7c808a)',
  m3: 'linear-gradient(150deg,#bfc3ca,#5e626b)',
  m4: 'linear-gradient(150deg,#eceef1,#9a9ea7)',
  m5: 'linear-gradient(150deg,#a9adb5,#4a4d55)',
  m6: 'linear-gradient(150deg,#e2e4e8,#868a93)',
}

function Logo({ c }) {
  const [bad, setBad] = useState(false)
  return (
    <span className="w-12 h-12 rounded-2xl grid place-items-center text-black overflow-hidden" style={{ background: tone[c.icon] }}>
      {bad ? (
        <Award size={20} />
      ) : (
        <img src={`${base}images/certifications/${c.slug}/logo.jpg`} alt="" className="w-full h-full object-contain" onError={() => setBad(true)} draggable="false" />
      )}
    </span>
  )
}

function Card({ c, onOpen }) {
  return (
    <div
      className="cert-card spot relative panel !rounded-[24px] p-6 cursor-pointer"
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`${c.title} — view certificate`}
      onClick={() => onOpen(c.slug)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(c.slug) } }}
      {...spotHandlers()}
    >
      <div className="flex items-start justify-between">
        <Logo c={c} />
        <span className="t-mono">{c.year}</span>
      </div>
      <h3 className="text-[1.2rem] leading-tight mt-8 tracking-[-.03em]">{c.title}</h3>
      <p className="text-ink-soft text-[14px] mt-1.5">{c.issuer}</p>
      <div className="flex gap-1.5 mt-5 flex-wrap">
        {c.tags.map((t) => (
          <span key={t} className="text-[11.5px] px-2.5 py-1 rounded-full bg-white/[.06] text-silver">{t}</span>
        ))}
      </div>
      <span className="cert-hint">View certificate</span>
    </div>
  )
}

export default function Certifications() {
  const ref = useRef(null)
  useScene(ref)
  const [open, setOpen] = useState(null)
  const nav = (d) => setOpen((s) => { const i = certifications.findIndex((x) => x.slug === s); return certifications[(i + d + certifications.length) % certifications.length].slug })
  const rows = [
    { list: [...certifications, ...certifications], rev: false, dur: 60 },
    { list: [...certifications.slice(3), ...certifications.slice(0, 3), ...certifications.slice(3), ...certifications.slice(0, 3)], rev: true, dur: 70 },
  ]
  return (
    <section id="certifications" ref={ref} className="py-24 sm:py-36 overflow-hidden" aria-label="Certifications">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
        <Rv>
          <SectionLabel>Certifications</SectionLabel>
          <h2 className="t-display mt-4 max-w-[15ch]">
            Always <span className="silver-text">learning,</span> on the record.
          </h2>
        </Rv>
      </div>
      <div className="cert-wall mt-16 sm:mt-24">
        <div className="cert-tilt space-y-5 -mx-10">
          {rows.map((r, i) => (
            <div key={i} className="marq-wrap overflow-hidden">
              <div className={`marq ${r.rev ? 'rev' : ''}`} style={{ '--dur': `${r.dur}s` }}>
                {r.list.map((c, j) => (
                  <Card key={j} c={c} onOpen={setOpen} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CertModal slug={open} onClose={() => setOpen(null)} onNav={nav} />
    </section>
  )
}
