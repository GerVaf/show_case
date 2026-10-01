import { useEffect, useRef } from 'react'
import { BezierCurveIcon } from '@phosphor-icons/react/BezierCurve'
import { BracketsCurlyIcon } from '@phosphor-icons/react/BracketsCurly'
import { CompassIcon } from '@phosphor-icons/react/Compass'
import { StrategyIcon } from '@phosphor-icons/react/Strategy'
import './PerformanceRail.css'

const modes = [
  {
    title: 'Lead',
    copy: 'Set direction. Carry the outcome.',
    note: 'MD / Board / Product',
    Icon: StrategyIcon,
  },
  {
    title: 'Build',
    copy: 'Move ideas into working products.',
    note: 'React / Flutter / Systems',
    Icon: BracketsCurlyIcon,
  },
  {
    title: 'Shape',
    copy: 'Make brand and technology feel whole.',
    note: 'Identity / Interface / Experience',
    Icon: BezierCurveIcon,
  },
  {
    title: 'Explore',
    copy: 'Test the unknown. Keep what works.',
    note: 'Research / Experiments / Ventures',
    Icon: CompassIcon,
  },
]

export default function PerformanceRail() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    const progress = progressRef.current

    if (!section || !pin || !viewport || !track || !progress) return undefined

    const motionAllowed = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!motionAllowed.matches) return undefined

    let cancelled = false
    let context
    let observer

    async function mountRail() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
      const getHeaderHeight = () => document.querySelector('.site-header')?.offsetHeight ?? 80

      section.classList.add('is-gsap-active')
      context = gsap.context(() => {
        gsap.set(progress, { scaleX: 0 })
        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            pin: true,
            start: () => `top ${getHeaderHeight()}px`,
            end: () => `+=${getDistance()}`,
            scrub: 0.65,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: ({ progress: value }) => {
              gsap.set(progress, { scaleX: value })
            },
          },
        })
      }, section)

      document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh()
      })
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer?.disconnect()
        mountRail().catch(() => {
          section.classList.remove('is-gsap-active')
        })
      },
      { rootMargin: '1200px 0px' },
    )
    observer.observe(section)

    return () => {
      cancelled = true
      observer?.disconnect()
      context?.revert()
      section.classList.remove('is-gsap-active')
    }
  }, [])

  return (
    <section ref={sectionRef} className="performance-section page-shell border-x border-t border-ink/20" aria-labelledby="performance-title">
      <div ref={pinRef} className="performance-pin">
        <header className="performance-heading">
          <div>
            <p className="eyebrow text-ink-faint">One practice / Four modes</p>
            <h2 id="performance-title" className="performance-title">How I perform.</h2>
          </div>
          <div className="performance-index" aria-hidden="true">
            <span>01</span>
            <span className="performance-progress-track">
              <span ref={progressRef} className="performance-progress-fill" />
            </span>
            <span>04</span>
          </div>
        </header>

        <div
          ref={viewportRef}
          className="performance-viewport"
          role="region"
          aria-label="Four ways Vixx Grego works"
          tabIndex="0"
        >
          <ol ref={trackRef} className="performance-track">
            {modes.map(({ title, copy, note, Icon }, index) => (
              <li className="performance-card" key={title}>
                <div className="performance-card-top">
                  <span className="performance-number">0{index + 1}</span>
                  <Icon className="performance-icon" aria-hidden="true" size={30} weight="light" />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p className="performance-copy">{copy}</p>
                </div>
                <p className="performance-note">{note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
