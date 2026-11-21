import { ArrowUp } from 'lucide-react'

const words = ['Built to ship', 'Open for freelance', 'Manila, PH', 'Replies in 24h', "Let's build"]

export default function Footer() {
  const row = words.flatMap((w, i) => [
    <span key={`w${i}`} className="outline-text font-bold tracking-[-.05em] text-[clamp(3rem,9vw,8rem)] leading-none whitespace-nowrap">{w}</span>,
    <span key={`s${i}`} className="text-silver-2 text-[clamp(1.5rem,4vw,3rem)] mx-8 sm:mx-14" style={{ color: 'var(--silver-2)' }}>✦</span>,
  ])
  return (
    <footer className="relative z-[1] pt-10 select-none">
      <div className="marq-wrap overflow-hidden py-6 border-y border-white/[.07]" aria-hidden="true">
        <div className="marq items-center" style={{ '--dur': '70s' }}>
          <div className="flex items-center shrink-0 pr-8 sm:pr-14">{row}</div>
          <div className="flex items-center shrink-0 pr-8 sm:pr-14">{row}</div>
        </div>
      </div>
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-4 text-[13px] text-ink-soft">
        <p className="m-0">© 2026 RED®. Designed &amp; built by Red — React, Vite &amp; Tailwind.</p>
        <p className="m-0 t-mono">Manila · GMT+8</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="w-11 h-11 rounded-full border border-white/20 grid place-items-center cursor-pointer hover:bg-white hover:text-black transition-all hover:-translate-y-1"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  )
}
