import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { useMotionPath } from '../hooks/useMotionPath.js'

const milestones = [
  ['2021', 'Learn', 'COVID / self-start'],
  ['2022—24', 'Build', 'Web / product systems'],
  ['2025', 'Lead', 'Brand / company'],
  ['Now', 'Own', 'Just Lwint / forward'],
]

const route = 'M76 52C130 86 42 120 98 157C148 190 22 228 64 262C110 300 38 333 92 367'
const nodeX = [76, 98, 64, 92]
const nodeY = [52, 157, 262, 367]

export default function ThroughLineGraphic({ className = '' }) {
  const rootRef = useRef(null)
  const svgRef = useRef(null)
  const routeRef = useRef(null)
  const travelerRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const isInView = useInView(rootRef, { once: true, amount: 0.25 })
  const reveal = reduceMotion || isInView

  useMotionPath({
    active: isInView,
    delay: 0.18,
    duration: 1.7,
    fadeOut: false,
    pathRef: routeRef,
    reduceMotion,
    repeat: 0,
    scopeRef: svgRef,
    travelerRef,
  })

  return (
    <div ref={rootRef} className={`relative min-h-[21rem] overflow-hidden ${className}`}>
      <span className="pointer-events-none absolute right-[-0.06em] bottom-[-0.22em] font-display text-[clamp(8rem,19vw,13rem)] leading-none font-semibold tracking-[-0.1em] text-ink/[0.035]" aria-hidden="true">
        VG
      </span>

      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 420"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        {[52, 157, 262, 367].map((y) => (
          <path key={y} d={`M22 ${y}H378`} stroke="currentColor" strokeWidth="1" opacity="0.12" />
        ))}
        <path d="M22 18V402M148 18V402M274 18V402M378 18V402" stroke="currentColor" strokeWidth="1" opacity="0.08" />
        <path ref={routeRef} d={route} stroke="currentColor" strokeWidth="1.25" opacity="0.28" />
        <m.path
          d={route}
          stroke="var(--color-blue, #1c24b5)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={reveal ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.35, ease: [0.22, 1, 0.36, 1] }}
        />

        {nodeX.map((x, index) => (
          <g key={`${x}-${nodeY[index]}`}>
            <circle cx={x} cy={nodeY[index]} r="9" fill="var(--color-paper, #efede8)" stroke="currentColor" strokeWidth="1" />
            <m.circle
              cx={x}
              cy={nodeY[index]}
              r="3"
              fill={index === nodeX.length - 1 ? 'var(--color-blue, #1c24b5)' : 'currentColor'}
              initial={reduceMotion ? false : { scale: 0 }}
              animate={reveal ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.25 + index * 0.18 }}
              style={{ transformOrigin: `${x}px ${nodeY[index]}px` }}
            />
          </g>
        ))}

        <g ref={travelerRef} opacity="0">
          <circle r="5.5" fill="var(--color-blue, #1c24b5)" />
          <path d="M-1.7-2.2L2.3 0L-1.7 2.2Z" fill="var(--color-paper, #efede8)" opacity="0.9" />
        </g>
      </svg>

      <ol className="absolute inset-y-0 right-4 left-[34%] grid grid-rows-4 md:right-6">
        {milestones.map(([period, action, detail], index) => (
          <m.li
            className="flex min-w-0 items-center justify-between gap-4"
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            animate={reveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.35 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            key={period}
          >
            <div>
              <span className="font-mono text-[9px] tracking-[0.16em] text-blue uppercase">{period}</span>
              <p className="mt-1 font-display text-2xl leading-none font-semibold tracking-[-0.045em] uppercase md:text-3xl">{action}</p>
            </div>
            <span className="max-w-24 text-right font-mono text-[8px] leading-relaxed tracking-[0.12em] text-ink-faint uppercase md:max-w-28">{detail}</span>
          </m.li>
        ))}
      </ol>

      <span className="absolute bottom-3 left-4 rotate-[-5deg] border border-ink/35 bg-paper px-3 py-2 font-mono text-[8px] leading-relaxed tracking-[0.14em] uppercase">
        One line<br />Still moving
      </span>
    </div>
  )
}
