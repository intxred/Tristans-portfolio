import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { cmdkItems } from '../data/content'

export default function CommandPalette({ open, onClose, onThemeToggle, onOpenCorkboard, onOpenAutomation }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  const filtered = useMemo(
    () => cmdkItems.filter((i) => i.label.toLowerCase().includes(query.trim().toLowerCase())),
    [query]
  )

  function run(item) {
    onClose()
    if (item.action === 'theme') {
      onThemeToggle()
      return
    }
    if (item.action === 'corkboard') {
      onOpenCorkboard?.()
      return
    }
    if (item.action === 'automation') {
      onOpenAutomation?.()
      return
    }
    if (item.href?.startsWith('#')) {
      const target = document.querySelector(item.href)
      if (target) {
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' })
      }
    } else if (item.href) {
      window.open(item.href, '_blank', 'noopener')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[500] flex justify-center pt-[14vh] bg-black/55 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-[540px] h-fit bg-surface border border-line rounded-[18px] overflow-hidden shadow-2xl">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && filtered[0]) run(filtered[0])
            if (e.key === 'Escape') onClose()
          }}
          placeholder="Jump to a section, project, or action…"
          className="w-full border-0 border-b border-line px-5 py-[18px] text-[15px] bg-transparent text-ink outline-none"
        />
        <div className="max-h-[320px] overflow-y-auto p-2">
          {filtered.map((item, i) => (
            <div
              key={item.label}
              onClick={() => run(item)}
              className={`flex items-center gap-3 px-3 py-3 rounded-[10px] text-[13.5px] text-ink cursor-pointer transition-colors
                ${i === 0 ? 'bg-card' : 'hover:bg-card'}`}
            >
              <ArrowRight size={15} className="text-ink-soft" />
              <span>{item.label}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-3 py-6 text-center text-[13px] text-ink-soft font-mono">No matches</div>
          )}
        </div>
      </div>
    </div>
  )
}
