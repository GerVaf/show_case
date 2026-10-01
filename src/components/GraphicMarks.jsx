import { useId, useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { useMotionPath } from '../hooks/useMotionPath.js'

const cobalt = 'var(--color-blue, #1c24b5)'
const ease = [0.22, 1, 0.36, 1]

function useGraphicMarkA11y(decorative) {
  const titleId = useId()
  const isDecorative = decorative !== false

  return {
    isDecorative,
    titleId,
    svgA11yProps: isDecorative
      ? { 'aria-hidden': true }
      : { role: 'img', 'aria-labelledby': titleId },
  }
}

/**
 * A slowly rotating systems diagram. It works well beside a capability heading,
 * inside an oversized project card, or as a quiet corner mark.
 */
export function OrbitMark({
  accent = cobalt,
  className,
  decorative = true,
  title = 'Connected systems in orbit',
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const svgRef = useRef(null)
  const isInView = useInView(svgRef, { amount: 0.15 })
  const { isDecorative, titleId, svgA11yProps } = useGraphicMarkA11y(decorative)

  return (
    <svg
      ref={svgRef}
      {...props}
      {...svgA11yProps}
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!isDecorative && <title id={titleId}>{title}</title>}

      <path d="M120 14V36M120 204V226M14 120H36M204 120H226" stroke="currentColor" strokeWidth="1" opacity="0.34" />
      <circle cx="120" cy="120" r="84" stroke="currentColor" strokeWidth="1" opacity="0.18" />
      <circle cx="120" cy="120" r="53" stroke="currentColor" strokeWidth="1" strokeDasharray="2 7" opacity="0.32" />

      <m.g
        initial={false}
        animate={{ rotate: !reduceMotion && isInView ? [-13, 347] : -13 }}
        transition={!reduceMotion && isInView ? { duration: 24, ease: 'linear', repeat: Infinity } : { duration: 0 }}
        style={{ transformOrigin: '120px 120px' }}
      >
        <ellipse cx="120" cy="120" rx="94" ry="44" stroke="currentColor" strokeWidth="1.25" opacity="0.72" />
        <circle cx="214" cy="120" r="4.5" fill={accent} />
        <circle cx="48" cy="92" r="3" fill="currentColor" />
      </m.g>

      <m.path
        d="M70 159C88 180 119 188 146 177C174 166 192 139 190 109"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.16, ease }}
      />

      <m.circle
        cx="120"
        cy="120"
        r="18"
        stroke={accent}
        strokeWidth="1.5"
        initial={false}
        animate={{ scale: !reduceMotion && isInView ? [1, 1.08, 1] : 1 }}
        transition={!reduceMotion && isInView ? { duration: 3.4, ease: 'easeInOut', repeat: Infinity } : { duration: 0 }}
        style={{ transformOrigin: '120px 120px' }}
      />
      <circle cx="120" cy="120" r="4" fill="currentColor" />
    </svg>
  )
}

/**
 * A route with waypoints and a moving cobalt trace. It is designed for project
 * timelines, process sections, and wide editorial dividers.
 */
export function RouteMark({
  accent = cobalt,
  className,
  decorative = true,
  title = 'A route connecting five milestones',
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const svgRef = useRef(null)
  const routeRef = useRef(null)
  const travelerRef = useRef(null)
  const isInView = useInView(svgRef, { amount: 0.15 })
  const { isDecorative, titleId, svgA11yProps } = useGraphicMarkA11y(decorative)
  const route = 'M24 138C62 138 64 66 108 66C152 66 150 118 194 118C238 118 245 44 288 44C318 44 324 70 342 70'

  useMotionPath({
    active: isInView,
    duration: 5.4,
    pathRef: routeRef,
    reduceMotion,
    scopeRef: svgRef,
    travelerRef,
  })

  return (
    <svg
      ref={svgRef}
      {...props}
      {...svgA11yProps}
      className={className}
      viewBox="0 0 366 180"
      fill="none"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!isDecorative && <title id={titleId}>{title}</title>}

      <path d="M24 22V158M108 22V158M194 22V158M288 22V158M342 22V158" stroke="currentColor" strokeWidth="1" opacity="0.12" />
      <path d="M12 158H354" stroke="currentColor" strokeWidth="1" opacity="0.22" />
      <path ref={routeRef} d={route} stroke="currentColor" strokeWidth="1.25" opacity="0.42" />

      <m.path
        d={route}
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={false}
        animate={reduceMotion || !isInView
          ? { pathLength: 1, pathOffset: 0, opacity: 1 }
          : {
              pathLength: [0.08, 0.34, 0.08],
              pathOffset: [0, 0.46, 0.92],
              opacity: [0, 1, 0],
            }}
        transition={reduceMotion || !isInView
          ? { duration: 0 }
          : { duration: 5.4, times: [0, 0.5, 1], ease: 'easeInOut', repeat: Infinity }}
      />

      {[
        [24, 138],
        [108, 66],
        [194, 118],
        [288, 44],
        [342, 70],
      ].map(([cx, cy], index) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="7" fill="var(--color-paper, #efede8)" stroke="currentColor" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="2.25" fill={index === 4 ? accent : 'currentColor'} />
        </g>
      ))}

      <g ref={travelerRef} opacity="0">
        <circle r="5" fill={accent} />
        <path d="M-1.6-2.1L2.2 0L-1.6 2.1Z" fill="var(--color-ink, #181816)" opacity="0.82" />
      </g>
    </svg>
  )
}

/**
 * An abstract VG signature drawn like an archival maker's mark. It is most at
 * home in an about-page masthead, a footer lockup, or over a dark project tile.
 */
export function MonogramMark({
  accent = cobalt,
  className,
  decorative = true,
  title = 'Vixx Grego monogram',
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const svgRef = useRef(null)
  const isInView = useInView(svgRef, { amount: 0.15 })
  const { isDecorative, titleId, svgA11yProps } = useGraphicMarkA11y(decorative)

  const drawTransition = (delay) => ({
    duration: reduceMotion ? 0 : 0.9,
    delay: reduceMotion ? 0 : delay,
    ease,
  })

  return (
    <svg
      ref={svgRef}
      {...props}
      {...svgA11yProps}
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!isDecorative && <title id={titleId}>{title}</title>}

      <circle cx="120" cy="120" r="104" stroke="currentColor" strokeWidth="1" opacity="0.26" />
      <m.circle
        cx="120"
        cy="120"
        r="94"
        stroke={accent}
        strokeWidth="1.5"
        strokeDasharray="4 12 34 8"
        initial={false}
        animate={{ rotate: !reduceMotion && isInView ? [-8, 352] : -8 }}
        transition={!reduceMotion && isInView ? { duration: 30, ease: 'linear', repeat: Infinity } : { duration: 0 }}
        style={{ transformOrigin: '120px 120px' }}
        opacity="0.78"
      />

      <m.path
        d="M47 57L101 184L151 57"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="square"
        strokeLinejoin="miter"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={drawTransition(0.08)}
      />
      <m.path
        d="M190 79C177 60 157 50 134 50C94 50 64 81 64 120C64 160 95 190 135 190C166 190 190 173 197 145H150"
        stroke={accent}
        strokeWidth="7"
        strokeLinecap="square"
        strokeLinejoin="miter"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={drawTransition(0.26)}
      />

      <path d="M15 57H31M209 57H225M15 183H31M209 183H225" stroke="currentColor" strokeWidth="1" opacity="0.42" />
      <circle cx="197" cy="145" r="4" fill={accent} />
    </svg>
  )
}
