import { useEffect, useRef } from 'react'
import { BezierCurveIcon } from '@phosphor-icons/react/BezierCurve'
import { BracketsCurlyIcon } from '@phosphor-icons/react/BracketsCurly'
import { CompassIcon } from '@phosphor-icons/react/Compass'
import { StrategyIcon } from '@phosphor-icons/react/Strategy'
import './PerformanceRail.css'

const modes = [
  {
    title: 'Lead',
    copy: 'Start with intent. Own what follows.',
    note: 'Founder / Direction / Responsibility',
    Icon: StrategyIcon,
  },
  {
    title: 'Build',
    copy: 'Turn an idea into something people can use.',
    note: 'Web / Mobile / Systems',
    Icon: BracketsCurlyIcon,
  },
  {
    title: 'Shape',
    copy: 'Make product, brand, and story feel like one.',
    note: 'Identity / Interface / Experience',
    Icon: BezierCurveIcon,
  },
  {
    title: 'Adapt',
    copy: 'When the plan changes, find the next useful move.',
    note: 'Self-learning / Work / What is next',
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
    let media
    let observer
    let resizeObserver
    let refreshFrame = 0

    async function mountRail() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
      const getHeaderHeight = () => document.querySelector('.site-header')?.offsetHeight ?? 80
      const cards = Array.from(track.querySelectorAll('.performance-card'))
      let activeIndex = -1

      const setActiveCard = (nextIndex) => {
        if (nextIndex === activeIndex) return
        cards[activeIndex]?.classList.remove('is-active')
        cards[nextIndex]?.classList.add('is-active')
        activeIndex = nextIndex
      }

      section.classList.add('is-gsap-active')
      viewport.scrollLeft = 0
      context = gsap.context(() => {
        gsap.set(progress, { scaleX: 0 })
        const setProgress = gsap.quickSetter(progress, 'scaleX')
        setActiveCard(0)

        media = gsap.matchMedia()
        media.add(
          {
            desktop: '(min-width: 1024px)',
            mobile: '(max-width: 1023px)',
          },
          ({ conditions }) => {
            viewport.scrollLeft = 0
            gsap.set(track, { x: 0, force3D: true })

            const tween = gsap.to(track, {
              x: () => -getDistance(),
              force3D: true,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                pin,
                start: () => `top ${getHeaderHeight()}px`,
                end: () => `+=${Math.max(getDistance(), viewport.clientWidth * 0.9)}`,
                scrub: conditions.mobile ? 0.25 : 0.55,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onUpdate: ({ progress: value }) => {
                  setProgress(value)
                  setActiveCard(Math.min(cards.length - 1, Math.round(value * (cards.length - 1))))
                },
              },
            })

            return () => {
              tween.scrollTrigger?.kill()
              tween.kill()
              gsap.set(track, { clearProps: 'transform' })
              setProgress(0)
              setActiveCard(0)
            }
          },
        )
      }, section)

      const scheduleRefresh = () => {
        window.cancelAnimationFrame(refreshFrame)
        refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
      }

      if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(scheduleRefresh)
        resizeObserver.observe(viewport)
        resizeObserver.observe(track)
      }

      document.fonts?.ready.then(() => {
        if (!cancelled) scheduleRefresh()
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
      resizeObserver?.disconnect()
      window.cancelAnimationFrame(refreshFrame)
      media?.revert()
      context?.revert()
      section.classList.remove('is-gsap-active')
      track.querySelectorAll('.is-active').forEach((card) => card.classList.remove('is-active'))
    }
  }, [])

  return (
    <section ref={sectionRef} className="performance-section page-shell border-x border-t border-ink/20" aria-labelledby="performance-title">
      <div ref={pinRef} className="performance-pin">
        <header className="performance-heading">
          <div>
            <p className="eyebrow text-ink-faint">One person / Four working modes</p>
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
