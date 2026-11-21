import { ArrowRight } from 'lucide-react'
import { Rv, SectionLabel, Tilt } from './fx'

function FlowArt() {
  return (
    <svg viewBox="0 0 400 200" className="w-full" aria-hidden="true">
      <path className="pg-flow" d="M92 100 C140 100 140 52 188 52" />
      <path className="pg-flow" d="M92 100 C140 100 140 148 188 148" style={{ animationDelay: '-.4s' }} />
      <path className="pg-flow" d="M272 52 C316 52 316 100 340 100" style={{ animationDelay: '-.8s' }} />
      <path className="pg-flow" d="M272 148 C316 148 316 100 340 100" style={{ animationDelay: '-.2s' }} />
      {[[30, 76, 'New order'], [188, 30, 'Email'], [188, 126, 'Sheet'], [300, 76, 'Report']].map(([x, y, l]) => (
        <g key={l}>
          <rect x={x} y={y} width="84" height="44" rx="12" fill="#101114" stroke="rgba(255,255,255,.2)" />
          <circle cx={x} cy={y + 22} r="4" fill="#c9ced9" />
          <circle cx={x + 84} cy={y + 22} r="4" fill="#c9ced9" />
          <text x={x + 42} y={y + 27} textAnchor="middle" fill="#e5e7eb" fontSize="12" fontFamily="inherit">{l}</text>
        </g>
      ))}
    </svg>
  )
}

function NotesArt() {
  const n = [
    ['-8deg', 'left-[6%] top-[14%]', 'Love the ribbons ✦'],
    ['5deg', 'left-[40%] top-[6%]', 'Ship it!'],
    ['-3deg', 'left-[58%] top-[44%]', 'Hire this dev'],
  ]
  return (
    <div className="relative h-[170px] w-full" aria-hidden="true">
      {n.map(([r, pos, t], i) => (
        <div
          key={t}
          className={`absolute ${pos} w-[34%] min-w-[110px] rounded-xl p-3 text-[12.5px] text-black font-medium shadow-[0_18px_40px_-14px_rgba(0,0,0,.9)]`}
          style={{ transform: `rotate(${r})`, background: 'linear-gradient(160deg,#f1f2f4,#b8bcc4)', animation: `floaty ${6 + i}s ease-in-out infinite`, animationDelay: `${i * -1.4}s` }}
        >
          {t}
        </div>
      ))}
    </div>
  )
}

export default function Playground({ onOpenAutomation, onOpenCorkboard }) {
  return (
    <section id="playground" className="py-24 sm:py-32" aria-label="Playground">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
        <Rv className="mb-12 sm:mb-16">
          <SectionLabel>Playground</SectionLabel>
          <h2 className="t-display mt-4 max-w-[15ch]">
            Don’t just read. <span className="silver-text">Play.</span>
          </h2>
        </Rv>
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          <Rv dir="l">
            <Tilt max={5} className="panel h-full p-7 sm:p-9 group" glare={false}>
              <FlowArt />
              <h3 className="t-title mt-6">Automation Playground</h3>
              <p className="t-lede !text-base mt-3 max-w-[40ch]">
                Drag blocks, type a real scenario like “Chicken, ₱89”, connect them and run the flow. Pure front-end.
              </p>
              <button onClick={onOpenAutomation} className="btn btn-silver mt-7 cursor-pointer">
                Open the playground <ArrowRight size={16} />
              </button>
            </Tilt>
          </Rv>
          <Rv dir="r" d={80}>
            <Tilt max={5} className="panel h-full p-7 sm:p-9 group" glare={false}>
              <NotesArt />
              <h3 className="t-title mt-6">Pin a note</h3>
              <p className="t-lede !text-base mt-3 max-w-[40ch]">Leave a greeting, a critique or what you’re building on the community corkboard.</p>
              <button onClick={onOpenCorkboard} className="btn btn-line mt-7 cursor-pointer">
                Visit the corkboard <ArrowRight size={16} />
              </button>
            </Tilt>
          </Rv>
        </div>
      </div>
    </section>
  )
}
