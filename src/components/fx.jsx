import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useScroll'

/* Reveal-on-enter wrapper (blur + rise). dir: 'up' | 'l' | 'r' | 's' */
export function Rv({ as: Tag = 'div', d = 0, dir = 'up', className = '', children, style, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const cls = `rv ${dir === 'l' ? 'rv-l' : dir === 'r' ? 'rv-r' : dir === 's' ? 'rv-s' : ''} ${className}`
  return (
    <Tag ref={ref} className={cls} style={{ '--d': `${d}ms`, ...(style || {}) }} {...rest}>
      {children}
    </Tag>
  )
}

/* Cursor-follow spotlight vars for .spot surfaces */
export function spotHandlers() {
  return {
    onPointerMove(e) {
      const r = e.currentTarget.getBoundingClientRect()
      e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
      e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    },
  }
}

/* 3D tilt with rim light + glare */
export function Tilt({ max = 9, className = '', children, style, glare = true, ...rest }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  function move(e) {
    const el = ref.current
    if (!el || reduced || e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${x * r.width}px`)
    el.style.setProperty('--my', `${y * r.height}px`)
    el.style.setProperty('--gx', `${x * 100}%`)
    el.style.setProperty('--gy', `${y * 100}%`)
    el.style.transform = `perspective(900px) rotateY(${(x - 0.5) * max * 2}deg) rotateX(${(0.5 - y) * max * 2}deg) translate3d(0,-4px,0)`
  }
  function leave() {
    const el = ref.current
    if (el) el.style.transform = ''
  }
  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`spot ${className}`}
      style={{ transition: 'transform .45s var(--ease)', willChange: 'transform', ...style }}
      {...rest}
    >
      {children}
      {glare && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 group-hover:opacity-100"
          style={{ background: 'radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,.07), transparent 45%)' }}
        />
      )}
    </div>
  )
}

/* Magnetic hover for buttons */
export function Magnetic({ strength = 0.28, children, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  function move(e) {
    const el = ref.current
    if (!el || reduced) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate3d(${x * strength}px,${y * strength}px,0)`
  }
  function leave() {
    if (ref.current) ref.current.style.transform = ''
  }
  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`inline-block ${className}`}
      style={{ transition: 'transform .5s var(--ease)' }}
    >
      {children}
    </div>
  )
}

/* Count-up when scrolled into view */
export function Counter({ target, suffix = '' }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  const reduced = useReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced) return setN(target)
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const run = (t) => {
          const k = Math.min(1, (t - t0) / 1600)
          setN(Math.round(target * (1 - Math.pow(1 - k, 4))))
          if (k < 1) requestAnimationFrame(run)
        }
        requestAnimationFrame(run)
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, reduced])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

export function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-soft tracking-[-.01em]">
      <span className="w-1.5 h-1.5 rounded-full bg-silver" />
      {children}
    </span>
  )
}
