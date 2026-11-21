import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, Play, Trash2, Sparkles } from 'lucide-react'

const TEMPLATES = [
  { type: 'trigger', label: 'New Order', icon: '🛒' },
  { type: 'trigger', label: 'New Message', icon: '💬' },
  { type: 'trigger', label: 'Daily Schedule', icon: '⏰' },
  { type: 'action', label: 'Send Email', icon: '✉️' },
  { type: 'action', label: 'Send SMS', icon: '📱' },
  { type: 'action', label: 'Update Sheet', icon: '📊' },
  { type: 'action', label: 'Notify Slack', icon: '🔔' },
  { type: 'action', label: 'Generate Report', icon: '📄' },
]

const EXAMPLES = {
  'New Order': ['Chicken, ₱89', '2x Rice Meals, ₱120', 'Beef Combo, ₱150'],
  'New Message': ['Is this available?', 'Can I get 2 boxes?'],
  'Daily Schedule': ['Every day, 9:00 AM', 'Every Monday'],
  'Send Email': ['Order confirmed — thank you!', 'Your receipt is attached'],
  'Send SMS': ['Your order is on the way!', "We've got your order 🎉"],
  'Update Sheet': ['Log this order', 'Add row to Orders tab'],
  'Notify Slack': ['New order just came in', 'Heads up team, new order'],
  'Generate Report': ['Add to today\u2019s sales total', 'Include in daily report'],
}

const BLOCK_W = 190
const BLOCK_H = 88

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export default function Automation({ onBack }) {
  const canvasRef = useRef(null)
  const [blocks, setBlocks] = useState([])
  const [connections, setConnections] = useState([])
  const [dragId, setDragId] = useState(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const [connectingFrom, setConnectingFrom] = useState(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [activeNodes, setActiveNodes] = useState(new Set())
  const [errorNodes, setErrorNodes] = useState(new Set())
  const [focusedBlockId, setFocusedBlockId] = useState(null)
  const [activeEdges, setActiveEdges] = useState(new Set())
  const [running, setRunning] = useState(false)
  const [toast, setToast] = useState(null)
  const [confetti, setConfetti] = useState([])
  const [runsCompleted, setRunsCompleted] = useState(() => {
    try {
      return Number(localStorage.getItem('automation-runs') || 0)
    } catch {
      return 0
    }
  })

  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2400)
  }, [])

  function relPos(clientX, clientY) {
    const rect = canvasRef.current.getBoundingClientRect()
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  function addBlock(template) {
    const idx = blocks.length
    const x = 30 + (idx % 3) * 200
    const y = 30 + Math.floor(idx / 3) * 100
    setBlocks((prev) => [...prev, { id: uid(), ...template, x, y }])
  }

  function clearCanvas() {
    setBlocks([])
    setConnections([])
    setActiveNodes(new Set())
    setActiveEdges(new Set())
  }

  // --- dragging blocks ---
  function onBlockPointerDown(e, block) {
    e.stopPropagation()
    const pos = relPos(e.clientX, e.clientY)
    dragOffset.current = { x: pos.x - block.x, y: pos.y - block.y }
    setDragId(block.id)
  }

  // --- connecting ports ---
  function onOutputPointerDown(e, blockId) {
    e.stopPropagation()
    setConnectingFrom(blockId)
  }

  function onInputPointerUp(e, blockId) {
    e.stopPropagation()
    if (connectingFrom && connectingFrom !== blockId) {
      setConnections((prev) => {
        const exists = prev.some((c) => c.from === connectingFrom && c.to === blockId)
        if (exists) return prev
        return [...prev, { id: uid(), from: connectingFrom, to: blockId }]
      })
    }
    setConnectingFrom(null)
  }

  useEffect(() => {
    function onMove(e) {
      const pos = relPos(e.clientX, e.clientY)
      setCursor(pos)
      if (dragId) {
        setBlocks((prev) =>
          prev.map((b) =>
            b.id === dragId
              ? {
                  ...b,
                  x: Math.max(0, Math.min(pos.x - dragOffset.current.x, 900 - BLOCK_W)),
                  y: Math.max(0, Math.min(pos.y - dragOffset.current.y, 480 - BLOCK_H)),
                }
              : b
          )
        )
      }
    }
    function onUp() {
      setDragId(null)
      setConnectingFrom((cf) => {
        if (cf) return null // released on empty canvas — cancel
        return cf
      })
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [dragId])

  function removeBlock(id) {
    setBlocks((prev) => prev.filter((b) => b.id !== id))
    setConnections((prev) => prev.filter((c) => c.from !== id && c.to !== id))
  }

  function updateBlockValue(id, value) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, value } : b)))
  }

  function popConfetti() {
    const pieces = Array.from({ length: 14 }, () => {
      const angle = Math.random() * Math.PI * 2
      const dist = 60 + Math.random() * 60
      return {
        id: uid(),
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        color: ['var(--red)', 'var(--tan)', 'var(--ink)'][Math.floor(Math.random() * 3)],
      }
    })
    setConfetti(pieces)
    setTimeout(() => setConfetti([]), 900)
  }

  function runFlow() {
    if (running) return
    if (blocks.length === 0) {
      showToast('Add some blocks to the canvas first')
      return
    }
    const triggers = blocks.filter((b) => b.type === 'trigger')
    if (triggers.length === 0) {
      showToast('You need at least one trigger block ⚡')
      return
    }
    const adj = {}
    connections.forEach((c) => {
      adj[c.from] = adj[c.from] || []
      adj[c.from].push(c.to)
    })
    const hasPath = triggers.some((t) => adj[t.id]?.length)
    if (!hasPath) {
      showToast('Connect your trigger to an action to run the flow')
      return
    }

    const visited = new Set()
    const sequence = []
    function walk(nodeId, inheritedValue) {
      if (visited.has(nodeId)) return
      visited.add(nodeId)
      const node = blocks.find((b) => b.id === nodeId)
      const ownValue = node?.value?.trim()
      const carriedValue = ownValue || inheritedValue || ''
      sequence.push({ kind: 'node', id: nodeId, value: carriedValue, hasOwnValue: Boolean(ownValue) })
      ;(adj[nodeId] || []).forEach((next) => {
        const edge = connections.find((c) => c.from === nodeId && c.to === next)
        if (edge) sequence.push({ kind: 'edge', id: edge.id })
        walk(next, carriedValue)
      })
    }
    triggers.forEach((t) => walk(t.id, ''))

    const unreached = blocks.filter((b) => !visited.has(b.id))
    if (unreached.length > 0) {
      setErrorNodes(new Set(unreached.map((b) => b.id)))
      showToast(
        unreached.length === 1
          ? 'One block isn\u2019t connected to the flow yet — link it in'
          : `${unreached.length} blocks aren\u2019t connected to the flow yet — link them in`
      )
      setTimeout(() => setErrorNodes(new Set()), 1400)
      return
    }

    setRunning(true)
    setActiveNodes(new Set())
    setActiveEdges(new Set())
    let i = 0
    const interval = setInterval(() => {
      if (i >= sequence.length) {
        clearInterval(interval)
        setRunning(false)
        setRunsCompleted((prev) => {
          const n = prev + 1
          try {
            localStorage.setItem('automation-runs', String(n))
          } catch {
            /* ignore */
          }
          return n
        })
        popConfetti()
        showToast('✅ Workflow complete!')
        setTimeout(() => {
          setActiveNodes(new Set())
          setActiveEdges(new Set())
        }, 1000)
        return
      }
      const ev = sequence[i]
      if (ev.kind === 'node') {
        setActiveNodes((prev) => new Set([...prev, ev.id]))
        const node = blocks.find((b) => b.id === ev.id)
        if (ev.value) {
          setToast(
            ev.hasOwnValue || node?.type === 'trigger'
              ? `${node.label}: "${ev.value}"`
              : `${node.label} → using "${ev.value}"`
          )
        }
      }
      else setActiveEdges((prev) => new Set([...prev, ev.id]))
      i++
    }, 420)
  }

  function portPos(block, side) {
    return {
      x: side === 'in' ? block.x : block.x + BLOCK_W,
      y: block.y + BLOCK_H / 2,
    }
  }

  return (
    <div className="text-ink pb-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1240px] mx-auto mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="btn-ghost font-mono text-xs font-bold tracking-[0.08em] uppercase px-4 py-2.5 rounded-full
            border border-ink text-ink inline-flex items-center gap-2 bg-paper transition-all hover:bg-ink hover:text-paper shadow-sm cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Portfolio
        </button>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="font-mono text-[11px] uppercase tracking-wider text-ink-soft bg-card/80 border border-line px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Sparkles size={12} className="text-brand-red" />
            <b>{runsCompleted}</b> Flows Run
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto mb-6">
        <h1 className="font-display text-[28px] sm:text-[34px] leading-tight mb-1.5">Automation Playground</h1>
        <p className="text-[13.5px] text-ink-soft max-w-[62ch]">
          Drag a block onto the board and click into it to type your own scenario — e.g. type{' '}
          <b>"Chicken, ₱89"</b> into a New Order trigger — or tap one of the example suggestions that pop up for
          ideas. Connect trigger → action by dragging from the dot on the right edge to the dot on the left edge of
          another block; every block needs to be part of the chain before it'll run. Hit <b>Run</b> and watch your
          scenario text flow from the trigger into each connected action. Pure front-end simulation — no backend,
          nothing is actually sent anywhere.
        </p>
      </div>

      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
        {/* Palette */}
        <div className="bg-card border border-line rounded-2xl p-4 h-fit">
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft mb-3">Triggers</div>
          <div className="flex flex-col gap-2 mb-5">
            {TEMPLATES.filter((t) => t.type === 'trigger').map((t) => (
              <PaletteItem key={t.label} template={t} onClick={() => addBlock(t)} />
            ))}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft mb-3">Actions</div>
          <div className="flex flex-col gap-2 mb-5">
            {TEMPLATES.filter((t) => t.type === 'action').map((t) => (
              <PaletteItem key={t.label} template={t} onClick={() => addBlock(t)} />
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={runFlow}
              disabled={running}
              className="btn-primary font-mono text-xs font-bold tracking-[0.08em] uppercase px-4 py-3 rounded-full
                border border-brand-red bg-brand-red text-white inline-flex items-center justify-center gap-2 transition-transform
                hover:shadow-[0_10px_24px_rgba(15,16,18,0.35)] disabled:opacity-60"
            >
              <Play size={14} /> {running ? 'Running…' : 'Run Flow'}
            </button>
            <button
              onClick={clearCanvas}
              className="btn-ghost font-mono text-xs font-bold tracking-[0.08em] uppercase px-4 py-3 rounded-full
                border border-line text-ink-soft inline-flex items-center justify-center gap-2 transition-colors hover:bg-ink hover:text-paper hover:border-ink"
            >
              <Trash2 size={14} /> Clear Board
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          className="relative bg-surface border border-line rounded-2xl overflow-hidden select-none"
          style={{ height: 520, backgroundImage: 'radial-gradient(var(--line) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        >
          {blocks.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="font-mono text-[12px] text-ink-soft text-center px-6">
                Click a block on the left to drop it here →
              </p>
            </div>
          )}

          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {connections.map((c) => {
              const from = blocks.find((b) => b.id === c.from)
              const to = blocks.find((b) => b.id === c.to)
              if (!from || !to) return null
              const p1 = portPos(from, 'out')
              const p2 = portPos(to, 'in')
              const mid = (p1.x + p2.x) / 2
              const isActive = activeEdges.has(c.id)
              return (
                <path
                  key={c.id}
                  d={`M ${p1.x} ${p1.y} C ${mid} ${p1.y}, ${mid} ${p2.y}, ${p2.x} ${p2.y}`}
                  fill="none"
                  stroke={isActive ? 'var(--red)' : 'var(--line)'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              )
            })}
            {connectingFrom &&
              (() => {
                const from = blocks.find((b) => b.id === connectingFrom)
                if (!from) return null
                const p1 = portPos(from, 'out')
                return (
                  <path
                    d={`M ${p1.x} ${p1.y} L ${cursor.x} ${cursor.y}`}
                    fill="none"
                    stroke="var(--red)"
                    strokeWidth={2}
                    strokeDasharray="5 4"
                  />
                )
              })()}
          </svg>

          {blocks.map((block) => {
            const isActive = activeNodes.has(block.id)
            const isError = errorNodes.has(block.id)
            return (
              <div
                key={block.id}
                onPointerDown={(e) => onBlockPointerDown(e, block)}
                className={`absolute rounded-2xl border px-3.5 py-3 cursor-grab active:cursor-grabbing transition-shadow group
                  ${block.type === 'trigger' ? 'bg-brand-tan/20 border-brand-tan' : 'bg-card border-line'}
                  ${isActive ? 'ring-2 ring-brand-red shadow-[0_0_0_4px_rgba(15,16,18,0.15)]' : ''}
                  ${isError ? 'ring-2 ring-red-500 animate-[shake_0.4s_ease-in-out]' : ''}
                `}
                style={{ left: block.x, top: block.y, width: BLOCK_W, height: BLOCK_H, zIndex: 2 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none">{block.icon}</span>
                  <div className="min-w-0">
                    <div className="font-sans font-bold text-[12.5px] leading-tight truncate">{block.label}</div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-ink-soft">{block.type}</div>
                  </div>
                </div>

                <input
                  type="text"
                  value={block.value || ''}
                  onChange={(e) => updateBlockValue(block.id, e.target.value)}
                  onPointerDown={(e) => e.stopPropagation()}
                  onFocus={() => setFocusedBlockId(block.id)}
                  onBlur={() => setTimeout(() => setFocusedBlockId((id) => (id === block.id ? null : id)), 150)}
                  placeholder={block.type === 'trigger' ? 'condition (optional)' : 'message / value'}
                  className="mt-2 w-full text-[10.5px] font-mono bg-surface/70 border border-line rounded-md px-1.5 py-1
                    outline-none focus:border-brand-red placeholder:text-ink-soft/70 cursor-text"
                />

                {focusedBlockId === block.id && EXAMPLES[block.label] && (
                  <div
                    onPointerDown={(e) => e.stopPropagation()}
                    className="absolute left-0 top-full mt-1.5 w-[220px] bg-surface border border-line rounded-xl shadow-lg p-2 z-30"
                  >
                    <div className="font-mono text-[9px] uppercase tracking-wider text-ink-soft px-1 mb-1.5">
                      Try an example
                    </div>
                    <div className="flex flex-col gap-1">
                      {EXAMPLES[block.label].map((ex) => (
                        <button
                          key={ex}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            updateBlockValue(block.id, ex)
                            setFocusedBlockId(null)
                          }}
                          className="text-left text-[11px] px-2 py-1.5 rounded-lg hover:bg-card transition-colors truncate"
                        >
                          {ex}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => removeBlock(block.id)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-ink text-paper text-[10px] items-center justify-center
                    opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:flex"
                  aria-label="Remove block"
                >
                  ×
                </button>

                {block.type !== 'trigger' && (
                  <span
                    onPointerUp={(e) => onInputPointerUp(e, block.id)}
                    className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-surface border-2 border-ink-soft cursor-crosshair"
                  />
                )}
                <span
                  onPointerDown={(e) => onOutputPointerDown(e, block.id)}
                  className="absolute -right-[7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-brand-red border-2 border-white cursor-crosshair"
                />
              </div>
            )
          })}

          {confetti.map((p) => (
            <span
              key={p.id}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                left: '50%',
                top: '46%',
                background: p.color,
                animation: `confettiPop 0.85s ease-out forwards`,
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
              }}
            />
          ))}

          {toast && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-ink text-paper font-mono text-[12px] px-4 py-2.5 rounded-full shadow-lg z-10">
              {toast}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PaletteItem({ template, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-left px-3 py-2.5 rounded-xl border transition-all hover:-translate-y-0.5
        ${template.type === 'trigger' ? 'bg-brand-tan/15 border-brand-tan hover:bg-brand-tan/25' : 'bg-surface border-line hover:border-ink'}
      `}
    >
      <span className="text-base leading-none">{template.icon}</span>
      <span className="font-sans text-[12.5px] font-semibold">{template.label}</span>
    </button>
  )
}
