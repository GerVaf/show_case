import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import Portrait from './Portrait.jsx'

const ease = [0.22, 1, 0.36, 1]

export default function EvidencePortrait({ className = '' }) {
  const boardRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const isInView = useInView(boardRef, { once: true, amount: 0.2 })
  const reveal = reduceMotion || isInView

  return (
    <div
      ref={boardRef}
      className={`relative min-h-[44rem] overflow-hidden border border-ink/25 bg-[#d9d6cf] ${className}`}
      style={{
        backgroundImage: 'linear-gradient(rgba(24,24,22,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,22,.1) 1px, transparent 1px)',
        backgroundSize: '3.5rem 3.5rem',
      }}
    >
      <div className="absolute top-5 left-5 z-20 font-mono text-[9px] leading-relaxed tracking-[0.16em] uppercase">
        Case file / 02<br />Subject / TZM
      </div>

      <m.div
        className="absolute top-14 right-10 bottom-40 left-7 overflow-hidden border border-ink/50 bg-ink shadow-[9px_9px_0_rgba(28,36,181,.95)] md:top-16 md:right-16 md:left-10"
        initial={reduceMotion ? false : { opacity: 0, y: 18, rotate: -2.5 }}
        animate={reveal ? { opacity: 1, y: 0, rotate: -1 } : { opacity: 0, y: 18, rotate: -2.5 }}
        transition={{ duration: reduceMotion ? 0 : 0.75, ease }}
      >
        <Portrait className="h-full w-full" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between bg-gradient-to-b from-black/75 to-transparent p-4 pb-16 text-paper">
          <span className="font-mono text-[8px] tracking-[0.16em] uppercase">Evidence / Portrait</span>
          <span className="font-mono text-[8px] tracking-[0.16em] uppercase">Yangon / MM</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-20 text-paper">
          <p className="font-display text-2xl font-semibold tracking-[-0.045em] uppercase">Thant Zin Min</p>
          <p className="mt-1 font-mono text-[8px] tracking-[0.16em] text-paper/70 uppercase">AKA / Vixx Grego</p>
        </div>
      </m.div>

      <m.div
        className="absolute top-6 right-3 z-30 w-40 rotate-[3deg] border border-ink/35 bg-paper p-4 shadow-[5px_5px_0_rgba(24,24,22,.22)] md:w-44"
        initial={reduceMotion ? false : { opacity: 0, x: 16, rotate: 8 }}
        animate={reveal ? { opacity: 1, x: 0, rotate: 3 } : { opacity: 0, x: 16, rotate: 8 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.24, ease }}
      >
        <span className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rounded-full border border-ink/40 bg-blue shadow-[0_2px_3px_rgba(0,0,0,.25)]" aria-hidden="true" />
        <p className="font-mono text-[8px] tracking-[0.16em] text-ink-faint uppercase">Subject note / 01</p>
        <p className="mt-4 font-display text-xl leading-[0.95] font-semibold tracking-[-0.04em] uppercase">Builder.<br />Operator.<br />Leader.</p>
        <p className="mt-4 border-t border-ink/20 pt-3 font-mono text-[8px] leading-relaxed tracking-[0.13em] uppercase">Status / Building forward</p>
      </m.div>

      <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" viewBox="0 0 600 800" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <m.path
          d="M505 118C555 196 548 292 520 360C490 432 532 520 466 568C390 622 306 576 242 611"
          stroke="var(--color-blue, #1c24b5)"
          strokeWidth="2"
          strokeDasharray="5 7"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={reveal ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.25, delay: reduceMotion ? 0 : 0.3, ease }}
        />
        {[[505, 118], [520, 360], [466, 568], [242, 611]].map(([cx, cy], index) => (
          <m.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="6"
            fill={index === 3 ? 'var(--color-blue, #1c24b5)' : 'var(--color-paper, #efede8)'}
            stroke="var(--color-blue, #1c24b5)"
            strokeWidth="2"
            initial={reduceMotion ? false : { scale: 0 }}
            animate={reveal ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : 0.45 + index * 0.14 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}
      </svg>

      <m.div
        className="absolute right-4 bottom-5 left-4 z-30 border border-ink/35 bg-paper shadow-[7px_7px_0_rgba(28,36,181,.9)] md:right-6 md:left-6"
        initial={reduceMotion ? false : { opacity: 0, y: 22, rotate: 1.5 }}
        animate={reveal ? { opacity: 1, y: 0, rotate: -0.5 } : { opacity: 0, y: 22, rotate: 1.5 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.38, ease }}
      >
        <div className="flex items-center justify-between border-b border-ink/20 px-4 py-3 font-mono text-[8px] tracking-[0.15em] uppercase">
          <span>Origin record / Learning</span>
          <span className="text-blue">File open</span>
        </div>

        <div className="grid min-h-32 grid-cols-3">
          <CalendarCell label="Before" value="2020" />
          <div className="relative flex flex-col justify-center border-x border-ink/20 px-3 py-4">
            <span className="font-mono text-[8px] tracking-[0.14em] text-ink-faint uppercase">Origin</span>
            <span className="mt-1 font-display text-4xl leading-none tracking-[-0.07em]">2021</span>
            <span className="mt-2 font-display text-[11px] leading-none font-semibold uppercase">Started learning</span>
            <svg className="pointer-events-none absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)]" viewBox="0 0 170 150" fill="none" aria-hidden="true">
              <m.path
                d="M150 70C151 111 123 137 82 136C38 134 14 111 18 71C22 29 50 10 91 15C130 19 153 37 150 70Z"
                stroke="var(--color-blue, #1c24b5)"
                strokeWidth="2.6"
                strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={reveal ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.82, ease }}
              />
              <m.path
                d="M144 83C135 120 109 142 67 133C26 124 8 98 21 58"
                stroke="var(--color-blue, #1c24b5)"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={reveal ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 1.02, ease }}
              />
            </svg>
          </div>
          <CalendarCell label="Forward" value="Now" />
        </div>

        <div className="flex items-center justify-between border-t border-ink/20 px-4 py-3 font-mono text-[8px] tracking-[0.14em] uppercase">
          <span>COVID / Self-start</span>
          <span className="text-blue">Day one →</span>
        </div>
      </m.div>
    </div>
  )
}

function CalendarCell({ label, value }) {
  return (
    <div className="flex flex-col justify-center px-3 py-4">
      <span className="font-mono text-[8px] tracking-[0.14em] text-ink-faint uppercase">{label}</span>
      <span className="mt-2 font-display text-2xl leading-none tracking-[-0.055em] text-ink-muted uppercase md:text-3xl">{value}</span>
    </div>
  )
}
