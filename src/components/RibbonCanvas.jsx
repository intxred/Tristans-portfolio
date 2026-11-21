import { useEffect, useRef } from 'react'
import { ribbonOutlines, RIBBON_W, RIBBON_H } from '../data/ribbonPaths'

/* The "Space Black" ribbons, drawn procedurally (no image file). Each outline gets a soft
   silver glow on its upper-left side, a black cover offset down-right (which leaves a lit
   crescent), and a hairline rim. Rendered once per size, so it is crisp at any resolution and
   costs nothing while scrolling. `lit` makes a brighter twin used for the glow crossfade. */
function noiseTile() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const x = c.getContext('2d')
  const d = x.createImageData(128, 128)
  for (let i = 0; i < d.data.length; i += 4) {
    const v = 128 + (Math.random() - 0.5) * 90
    d.data[i] = d.data[i + 1] = d.data[i + 2] = v
    d.data[i + 3] = 255
  }
  x.putImageData(d, 0, 0)
  return c
}

export function drawRibbons(canvas, cw, ch, lit) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.max(1, Math.round(cw * dpr))
  canvas.height = Math.max(1, Math.round(ch * dpr))
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#020203'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const s = Math.max(cw / RIBBON_W, ch / RIBBON_H) * dpr
  const ox = (canvas.width - RIBBON_W * s) / 2
  const oy = (canvas.height - RIBBON_H * s) / 2
  const k = lit ? 1.55 : 1

  ribbonOutlines.forEach((d, i) => {
    const p = new Path2D(d)
    ctx.setTransform(s, 0, 0, s, ox, oy)
    ctx.lineJoin = 'round'
    ctx.lineCap = 'butt'

    // 1. broad soft glow around the edge
    ctx.save()
    ctx.shadowColor = `rgba(170,176,192,${0.55 * k})`
    ctx.shadowBlur = 70 * s
    ctx.strokeStyle = `rgba(110,114,126,${0.5 * k})`
    ctx.lineWidth = 80
    ctx.stroke(p)
    ctx.restore()

    // 2. tighter, brighter band hugging the edge
    ctx.save()
    ctx.shadowColor = `rgba(205,210,224,${0.5 * k})`
    ctx.shadowBlur = 26 * s
    ctx.strokeStyle = `rgba(150,155,168,${0.45 * k})`
    ctx.lineWidth = 34
    ctx.stroke(p)
    ctx.restore()

    // 3. black body, shifted down-right: leaves the glow only on the upper-left side
    ctx.save()
    ctx.translate(26, 26)
    ctx.shadowColor = '#020203'
    ctx.shadowBlur = 30 * s
    ctx.strokeStyle = '#020203'
    ctx.lineWidth = 70
    ctx.stroke(p)
    ctx.restore()

    // 4. hairline rim light
    ctx.save()
    ctx.strokeStyle = `rgba(226,230,238,${0.5 * k})`
    ctx.lineWidth = 1.5
    ctx.stroke(p)
    ctx.restore()
  })

  // fine grain: hides gradient banding in the darks
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  const pat = ctx.createPattern(noiseTile(), 'repeat')
  ctx.globalAlpha = 0.045
  ctx.globalCompositeOperation = 'overlay'
  ctx.fillStyle = pat
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.globalAlpha = 1
  ctx.globalCompositeOperation = 'source-over'
}

export default function RibbonCanvas({ lit = false, className = '', style }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const host = c.parentElement
    let last = ''
    let t = 0
    const run = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      const key = `${w}x${h}`
      if (!w || !h || key === last) return
      last = key
      drawRibbons(c, w, h, lit)
    }
    run()
    const ro = new ResizeObserver(() => {
      clearTimeout(t)
      t = setTimeout(run, 120)
    })
    ro.observe(host)
    return () => {
      clearTimeout(t)
      ro.disconnect()
    }
  }, [lit])
  return <canvas ref={ref} aria-hidden="true" className={className} style={{ width: '100%', height: '100%', display: 'block', ...style }} />
}
