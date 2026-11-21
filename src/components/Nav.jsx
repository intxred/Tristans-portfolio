import { useEffect, useRef, useState } from 'react'
import { Command, Menu, X } from 'lucide-react'
import { navSections } from '../data/content'
import { onFrame } from '../hooks/useScroll'

const logo = `${import.meta.env.BASE_URL}images/brand/logo.jpg`

export default function Nav({ activeId, onOpenCmdk, onHome, inPortfolio = true }) {
  const [open, setOpen] = useState(false)
  const bar = useRef(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    return onFrame(() => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
      if (Math.abs(y - last) > 8) {
        setHidden(y > last && y > 240)
        last = y
      }
    })
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    if (!inPortfolio) {
      onHome(id)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <a className="skip" href="#about" onClick={go('about')}>Skip to content</a>
      <div
        ref={bar}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-[320] origin-left bg-gradient-to-r from-transparent via-white/80 to-silver"
        style={{ transform: 'scaleX(0)' }}
      />
      <header
        className="fixed z-[300] left-0 right-0 top-0 flex justify-center px-3 pt-3 pointer-events-none"
        style={{
          transform: hidden && !open ? 'translateY(-120%)' : 'none',
          transition: 'transform .5s var(--ease)',
          paddingTop: 'max(12px, env(safe-area-inset-top))',
        }}
      >
        <nav
          aria-label="Primary"
          className="glass pointer-events-auto flex items-center gap-1 rounded-full pl-2 pr-2 h-[52px] shadow-[0_20px_60px_-20px_rgba(0,0,0,.9)]"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              setOpen(false)
              inPortfolio ? window.scrollTo({ top: 0, behavior: 'smooth' }) : onHome()
            }}
            className="flex items-center gap-2 pl-1 pr-3 h-9 rounded-full"
            aria-label="RED — home"
          >
            <img src={logo} alt="" className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20" />
            <span className="font-semibold tracking-[-.03em] text-[15px]">RED®</span>
          </a>

          <ul className="hidden lg:flex items-center gap-0.5 m-0 p-0 list-none">
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={go(s.id)}
                  className={`relative px-3.5 h-9 inline-flex items-center rounded-full text-[13.5px] tracking-[-.01em] transition-colors
                    ${activeId === s.id ? 'text-white bg-white/10' : 'text-ink-soft hover:text-white'}`}
                  aria-current={activeId === s.id ? 'true' : undefined}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={onOpenCmdk}
            aria-label="Open command palette"
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 ml-1 rounded-full text-[12px] text-ink-soft hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Command size={13} /> K
          </button>
          <a
            href="#contact"
            onClick={go('contact')}
            className="hidden sm:inline-flex btn btn-silver !h-9 !px-4 !text-[13px] ml-1"
          >
            Contact
          </a>
          <button
            className="lg:hidden w-9 h-9 grid place-items-center rounded-full hover:bg-white/10 cursor-pointer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* mobile / tablet sheet */}
      <div
        className="lg:hidden fixed inset-0 z-[290] bg-black/90 backdrop-blur-2xl flex flex-col justify-center px-8 transition-all duration-500"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transform: open ? 'none' : 'scale(1.04)' }}
        aria-hidden={!open}
      >
        <ul className="list-none m-0 p-0 space-y-1">
          {[...navSections, { id: 'contact', label: 'Contact' }].map((s, i) => (
            <li key={s.id} style={{ transition: `all .6s var(--ease) ${i * 60}ms`, opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(24px)' }}>
              <a href={`#${s.id}`} onClick={go(s.id)} className="block py-2.5 t-title !text-[2.2rem] text-white/90 hover:text-white">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={() => { setOpen(false); onOpenCmdk() }} className="mt-8 self-start btn btn-line">
          <Command size={15} /> Quick jump
        </button>
      </div>
    </>
  )
}
