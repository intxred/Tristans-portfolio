import { useRef } from 'react'
import { SectionLabel } from './fx'
import { stackTagsRow1, stackTagsRow2 } from '../data/content'
import { useScene, useReducedMotion } from '../hooks/useScroll'

const items = [...stackTagsRow1, ...stackTagsRow2]

export default function Stack() {
  const ref = useRef(null)
  const drum = useRef(null)
  const chips = useRef([])
  const step = 360 / items.length

  useScene(ref, {
    pinned: true,
    onUpdate: (p) => {
      const rot = -p * 300 - 20
      if (drum.current) drum.current.style.transform = `rotateX(-9deg) rotateY(${rot}deg)`
      chips.current.forEach((el, i) => {
        if (!el) return
        const a = ((i * step + rot) * Math.PI) / 180
        const facing = (Math.cos(a) + 1) / 2 // 1 = facing viewer
        el.style.opacity = (0.12 + 0.88 * Math.pow(facing, 1.6)).toFixed(3)
      })
    },
  })
  const reduced = useReducedMotion()

  return (
    <section id="stack" ref={ref} style={{ height: reduced ? 'auto' : '300vh' }} aria-label="Toolkit">
      <div className={`${reduced ? 'py-24' : 'sticky top-0 h-[100svh]'} overflow-hidden flex flex-col`}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 w-full pt-[14vh]">
          <SectionLabel>Toolkit</SectionLabel>
          <h2 className="t-display mt-4 max-w-[14ch]">
            <span className="silver-text">Tools I reach for</span> every day.
          </h2>
        </div>

        <div className="drum-stage flex-1 relative mt-4 min-h-[340px]" aria-hidden="true">
          <div className="absolute left-0 right-0 top-[48%]">
            <div className="drum" ref={drum} style={{ transformStyle: 'preserve-3d' }}>
              {items.map((t, i) => (
                <div
                  key={t}
                  ref={(el) => (chips.current[i] = el)}
                  className="drum-chip"
                  style={{ transform: `rotateY(${i * step}deg) translateZ(var(--R))` }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
        <ul className="sr-only">
          {items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
