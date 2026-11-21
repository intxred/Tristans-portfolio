import { useEffect, useRef, useState } from 'react'

/* One shared rAF scroll bus — every scene subscribes here instead of adding its own listener. */
const subs = new Set()
let raf = 0
let bound = false

function tick() {
  raf = 0
  subs.forEach((fn) => fn())
}
function request() {
  if (!raf) raf = requestAnimationFrame(tick)
}
function bind() {
  if (bound) return
  bound = true
  window.addEventListener('scroll', request, { passive: true })
  window.addEventListener('resize', request)
}
export function onFrame(fn) {
  bind()
  subs.add(fn)
  fn()
  return () => subs.delete(fn)
}

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const range = (p, a, b) => clamp((p - a) / (b - a))
export const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
export const easeOut = (t) => 1 - Math.pow(1 - t, 3)

export function useMedia(query, initial = false) {
  const [match, setMatch] = useState(() =>
    typeof window === 'undefined' ? initial : window.matchMedia(query).matches
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const h = () => setMatch(mq.matches)
    h()
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [query])
  return match
}
export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)')

/** progress of an element: pinned (sticky scene) 0→1 while stuck, otherwise 0→1 while crossing the viewport */
export function progressOf(el, pinned) {
  const r = el.getBoundingClientRect()
  const vh = window.innerHeight
  return pinned ? clamp(-r.top / Math.max(1, r.height - vh)) : clamp((vh - r.top) / (vh + r.height))
}

/** Writes --p on the element every frame and optionally calls onUpdate(p, el). */
export function useScene(ref, { pinned = false, onUpdate } = {}) {
  const reduced = useReducedMotion()
  const cb = useRef(onUpdate)
  cb.current = onUpdate
  useEffect(() => {
    const el = ref.current
    if (!el) return
    return onFrame(() => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // skip work for scenes far off-screen
      if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return
      const p = reduced ? (pinned ? 1 : 0.5) : progressOf(el, pinned)
      el.style.setProperty('--p', p.toFixed(4))
      cb.current?.(p, el)
    })
  }, [reduced, pinned, ref])
  return reduced
}

export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState('')
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return activeId
}
