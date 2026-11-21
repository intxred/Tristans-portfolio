import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Overlay from './Overlay'
import { certifications } from '../data/content'

const base = import.meta.env.BASE_URL

export default function CertModal({ slug, onClose, onNav }) {
  const c = certifications.find((x) => x.slug === slug)
  const [bad, setBad] = useState(false)
  useEffect(() => setBad(false), [slug])
  const key = (e) => { if (e.key === 'ArrowRight') onNav(1); if (e.key === 'ArrowLeft') onNav(-1) }
  return (
    <Overlay open={!!c} onClose={onClose} label={c ? `${c.title} certificate` : ''} wide onKey={key}>
      {c && (
        <div className="pm-body !mt-0 !pt-14">
          <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-ink-soft">
            <span className="pm-chip">{c.issuer}</span>
            <span className="pm-chip">{c.year}</span>
            {c.tags.map((t) => <span key={t} className="pm-chip">{t}</span>)}
          </div>
          <h3 className="t-title !text-[clamp(1.5rem,3vw,2.2rem)] mt-4">{c.title}</h3>
          <div className="cert-shot mt-6">
            {bad ? (
              <p className="t-mono p-10 text-center">Add your certificate screenshot at<br />public/images/certifications/{c.slug}/certificate.jpg</p>
            ) : (
              <img src={`${base}images/certifications/${c.slug}/certificate.jpg`} alt={`${c.title} certificate from ${c.issuer}`} onError={() => setBad(true)} />
            )}
          </div>
          <div className="mt-6 flex items-center justify-end gap-3">
            <button className="pm-nav" onClick={() => onNav(-1)} aria-label="Previous certificate"><ArrowLeft size={18} /></button>
            <button className="pm-nav" onClick={() => onNav(1)} aria-label="Next certificate"><ArrowRight size={18} /></button>
          </div>
        </div>
      )}
    </Overlay>
  )
}
