import { useEffect, useRef, useState } from 'react'
import { Bookmark, Play } from 'lucide-react'
import ProductModal, { parseVideo } from './ProductModal'
import { Rv, SectionLabel, Tilt } from './fx'
import { productPins } from '../data/content'
import { useMedia, useScene, useReducedMotion } from '../hooks/useScroll'

const base = import.meta.env.BASE_URL

function Pin({ pin, i, onOpen }) {
  const media = parseVideo(pin)
  const hasVideo = !!media
  const reduced = useReducedMotion()
  const box = useRef(null)
  const vid = useRef(null)
  const [inView, setInView] = useState(false)
  const [ratio, setRatio] = useState(null) // the image's own width / height
  /* the preview moves: muted looping video, only while the card is on screen */
  useEffect(() => {
    if (!hasVideo || reduced || !box.current) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '120px' })
    io.observe(box.current)
    return () => io.disconnect()
  }, [hasVideo, reduced])
  useEffect(() => {
    const v = vid.current
    if (!v) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView])
  const [saved, setSaved] = useState(false)
  return (
    <Rv dir="s" d={(i % 3) * 70}>
      <Tilt max={5} className="group relative rounded-[26px] overflow-hidden border border-white/10 bg-[#0d0e11] cursor-pointer" glare>
        <div
          style={{ aspectRatio: ratio || `360 / ${pin.h}` }}
          ref={box}
          className="relative overflow-hidden"
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          aria-label={`${pin.title} — ${hasVideo ? 'play video' : 'view larger'}`}
          onClick={() => onOpen(pin)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(pin) } }}
        >
          <img
            src={`${base}images/products/${pin.slug}/cover.jpg`}
            alt={pin.title}
            loading="lazy"
            onLoad={(e) => e.currentTarget.naturalWidth && setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
          />
          {inView && media?.type === 'file' && (
            <video
              ref={vid}
              className="absolute inset-0 w-full h-full object-cover"
              src={media.src}
              poster={`${base}images/products/${pin.slug}/cover.jpg`}
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          )}
          {inView && media?.type === 'embed' && media.preview && (
            <div className="pin-embed" aria-hidden="true"><iframe src={media.preview} title="" tabIndex={-1} loading="lazy" allow="autoplay" /></div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
          <button
            onClick={(e) => { e.stopPropagation(); setSaved((v) => !v) }}
            aria-pressed={saved}
            aria-label={saved ? `Unsave ${pin.title}` : `Save ${pin.title}`}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full grid place-items-center cursor-pointer transition-all duration-300 glass
              opacity-0 group-hover:opacity-100 focus-visible:opacity-100 ${saved ? '!bg-white !text-black scale-110' : 'text-white'}`}
          >
            <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
          {hasVideo && (
            <span className="pin-chip" aria-hidden="true"><Play size={11} fill="currentColor" /> Video</span>
          )}
          <p className="absolute left-4 bottom-4 right-4 text-[15px] font-medium tracking-[-.02em]">{pin.title}</p>
        </div>
      </Tilt>
    </Rv>
  )
}

export default function Products() {
  const ref = useRef(null)
  const [openPin, setOpenPin] = useState(null)
  useScene(ref)
  const three = useMedia('(min-width: 900px)')
  const cols = three ? 3 : 2
  const columns = Array.from({ length: cols }, (_, c) => productPins.map((p, i) => ({ p, i })).filter((x) => x.i % cols === c))
  const k = three ? [-70, 90, -40] : [-30, 40]

  return (
    <section id="products" ref={ref} className="py-24 sm:py-36" aria-label="Products">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
        <Rv className="mb-14 sm:mb-20 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Products</SectionLabel>
            <h2 className="t-display mt-4 max-w-[14ch]">
              Interfaces, <span className="silver-text">up close.</span>
            </h2>
          </div>
          <p className="t-lede max-w-[34ch]">Screens and walkthroughs of the tools I’ve built. Tap one to open it larger or play the video.</p>
        </Rv>
        <div className="grid gap-4 sm:gap-5 items-start" style={{ gridTemplateColumns: `repeat(${cols},minmax(0,1fr))` }}>
          {columns.map((col, c) => (
            <div key={c} className="pcol flex flex-col gap-4 sm:gap-5" style={{ '--k': `${k[c]}px` }}>
              {col.map(({ p, i }) => (
  <div key={p.slug} className="flex flex-col gap-4 sm:gap-5">
    <Pin pin={p} i={i} onOpen={setOpenPin} />

    {p.slug === 'auth-flow' && (
      <Pin
        pin={{
          slug: 'new-project-image',
          title: 'Local Marketplace',
          color: 'C9DDE0',
          h: 460,
        }}
        i={10}
        onOpen={setOpenPin}
      />
    )}
  </div>
))}
            </div>
          ))}
        </div>
      </div>
      <ProductModal pin={openPin} onClose={() => setOpenPin(null)} />
    </section>
  )
}
