/* Ribbon backdrop that keeps moving: the base art drifts, and a second pre-lit copy
   (rim light from the opposite side) crossfades in and out so the highlights appear to
   travel along the ribbons. Pure opacity/transform animation = compositor only. */
import { ribbonOutlines, RIBBON_VIEWBOX } from '../data/ribbonPaths'

import RibbonCanvas from './RibbonCanvas'

export default function FlowBg({ simple = false, mirror = false, className = '' }) {
  return (
    <div className={`flow ${className}`} style={{ transform: mirror ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <div className="flow-a">
        <RibbonCanvas />
        {!simple && (
          <svg className="flow-streaks" viewBox={RIBBON_VIEWBOX} preserveAspectRatio="xMidYMid slice">
            {ribbonOutlines.map((d, i) => (
              <g key={i} style={{ '--sd': `${9 + i * 2.5}s`, '--sdl': `${-i * 3.1}s` }}>
                <path d={d} pathLength="1" className="s-halo" />
                <path d={d} pathLength="1" className="s-core" />
              </g>
            ))}
          </svg>
        )}
      </div>
      {!simple && (
        <div className="flow-b">
          <RibbonCanvas lit />
        </div>
      )}
    </div>
  )
}
