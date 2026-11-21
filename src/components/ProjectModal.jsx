import { useEffect, useRef, useState } from 'react'
import { X, ArrowLeft, ArrowRight, ArrowUpRight, Target, Lightbulb, Wrench, ListChecks } from 'lucide-react'
import { projectTiles, projectDetails, PROJECT_IMAGE_COUNT } from '../data/content'

const base = import.meta.env.BASE_URL

export default function ProjectModal({ index, onClose, onNav }) {
  const open = index !== null
  const p = open ? projectTiles[index] : null
  const d = open ? projectDetails[p.slug] || {} : {}
  const box = useRef(null)
  const last = useRef(null)
  const [sel, setSel] = useState(0)
  const [bad, setBad] = useState({})
  useEffect(() => { setSel(0); setBad({}) }, [index])

  useEffect(() => {
    if (!open) return
    last.current = document.activeElement
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    box.current?.focus()
    const key = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('keydown', key)
      document.body.style.overflow = prev
      last.current?.focus?.()
    }
  }, [open, onClose, onNav])

  useEffect(() => { if (open) box.current?.scrollTo?.(0, 0) }, [index, open])
  if (!open) return null

  const n = projectTiles.length
  const Row = ({ icon: I, label, children }) => (
    <div>
      <h4 className="flex items-center gap-2 text-[12px] uppercase tracking-[.14em] text-ink-soft !font-medium !tracking-[.14em]"><I size={14} />{label}</h4>
      <div className="mt-3">{children}</div>
    </div>
  )

  return (
    <div className="pm-back" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pm" role="dialog" aria-modal="true" aria-label={p.title} ref={box} tabIndex={-1}>
        <button className="pm-x" onClick={onClose} aria-label="Close"><X size={18} /></button>
        {(() => {
          const dir = `${base}images/projects/${p.slug}`
          const all = Array.from({ length: PROJECT_IMAGE_COUNT }, (_, n) => `${dir}/${n + 1}.jpg`).filter((u) => !bad[u])
          const shots = all.length ? all : [`${dir}/cover.jpg`]
          const cur = Math.min(sel, shots.length - 1)
          return (
            <div className="pm-gallery">
              <div className="pm-stage" onClick={() => shots.length > 1 && setSel((cur + 1) % shots.length)} title={shots.length > 1 ? 'Next screenshot' : undefined}>
                <img key={shots[cur]} src={shots[cur]} alt={`${p.title} screenshot ${cur + 1} of ${shots.length}`} onError={() => setBad((b) => ({ ...b, [shots[cur]]: true }))} />
                {shots.length > 1 && <span className="pm-count">{cur + 1} / {shots.length}</span>}
              </div>
              {shots.length > 1 && (
                <div className="pm-thumbs">
                  {shots.map((u, n) => (
                    <button key={u} className={n === cur ? 'on' : ''} onClick={() => setSel(n)} aria-label={`Show screenshot ${n + 1}`} aria-current={n === cur}>
                      <img src={u} alt="" loading="lazy" onError={() => setBad((b) => ({ ...b, [u]: true }))} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })()}
        <div className="pm-body !mt-0 pt-6">
          <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-ink-soft">
            <span className="tabular-nums text-silver">{String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
            {d.kind && <span className="pm-chip">{d.kind}</span>}
            {d.status && <span className="pm-chip">{d.status}</span>}
          </div>
          <h3 className="t-title !text-[clamp(1.8rem,4vw,3rem)] mt-4">{p.title}</h3>
          <p className="t-lede mt-4 max-w-[60ch]">{p.desc}</p>

          <div className="pm-grid">
            <Row icon={Lightbulb} label="Purpose"><p className="pm-p">{d.purpose}</p></Row>
            <Row icon={Target} label="Target users"><p className="pm-p">{d.target}</p></Row>
            <Row icon={ListChecks} label="Key features">
              <ul className="pm-p space-y-1.5 list-disc pl-4 marker:text-ink-soft">{(d.features || []).map((f) => <li key={f}>{f}</li>)}</ul>
            </Row>
            <Row icon={Wrench} label="Tech used">
              <div className="flex flex-wrap gap-2">{(d.tech || p.stack.split(' · ')).map((t) => <span key={t} className="pm-chip !h-8 !text-[12.5px] !text-silver">{t}</span>)}</div>
              {d.role && <p className="t-mono mt-4">Role: {d.role}</p>}
            </Row>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {d.live && <a className="btn btn-silver" href={d.live} target="_blank" rel="noreferrer">Live site <ArrowUpRight size={16} /></a>}
            {d.repo && <a className="btn btn-line" href={d.repo} target="_blank" rel="noreferrer">Source <ArrowUpRight size={16} /></a>}
            <a className="btn btn-line" href="#contact" onClick={onClose}>Build something similar</a>
            <span className="grow" />
            <button className="pm-nav" onClick={() => onNav(-1)} aria-label="Previous project"><ArrowLeft size={18} /></button>
            <button className="pm-nav" onClick={() => onNav(1)} aria-label="Next project"><ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
