import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

/* Shared dialog shell: Esc / backdrop closes, scroll locked, focus restored. */
export default function Overlay({ open, onClose, label, children, wide = false, onKey }) {
  const box = useRef(null)
  useEffect(() => {
    if (!open) return
    const last = document.activeElement
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    box.current?.focus()
    const key = (e) => {
      if (e.key === 'Escape') onClose()
      else onKey?.(e)
    }
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('keydown', key)
      document.body.style.overflow = prev
      last?.focus?.()
    }
  }, [open, onClose, onKey])
  if (!open) return null
  return (
    <div className="pm-back" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pm" role="dialog" aria-modal="true" aria-label={label} ref={box} tabIndex={-1} style={wide ? { width: 'min(1100px,100%)' } : undefined}>
        <button className="pm-x" onClick={onClose} aria-label="Close"><X size={18} /></button>
        {children}
      </div>
    </div>
  )
}
