import { useEffect } from 'react'

function placeAt(path, target, progress, opacity) {
  const length = path.getTotalLength()
  const distance = length * progress
  const point = path.getPointAtLength(distance)
  const sampleDistance = Math.min(length, Math.max(0, distance + (progress >= 1 ? -1 : 1)))
  const sample = path.getPointAtLength(sampleDistance)
  const angle = Math.atan2(point.y - sample.y, point.x - sample.x) * (180 / Math.PI)

  target.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${progress >= 1 ? angle + 180 : angle})`)
  target.style.opacity = String(opacity)
}

/**
 * Moves an SVG marker along the path's actual geometry instead of interpolating
 * independent x/y waypoints. The tween is scoped for StrictMode-safe cleanup
 * and does no work while its section is outside the viewport.
 */
export function useMotionPath({
  active,
  delay = 0,
  duration,
  fadeOut = true,
  pathRef,
  reduceMotion,
  repeat = -1,
  scopeRef,
  travelerRef,
}) {
  useEffect(() => {
    const path = pathRef.current
    const traveler = travelerRef.current

    if (!path || !traveler) return undefined

    if (reduceMotion) {
      placeAt(path, traveler, 1, 1)
      return undefined
    }

    if (!active) {
      placeAt(path, traveler, 0, 0)
      return undefined
    }

    let cancelled = false
    let context

    async function startAnimation() {
      const [{ gsap }, { MotionPathPlugin }] = await Promise.all([
        import('gsap'),
        import('gsap/MotionPathPlugin'),
      ])

      if (cancelled) return

      gsap.registerPlugin(MotionPathPlugin)
      traveler.removeAttribute('transform')

      context = gsap.context(() => {
        const timeline = gsap.timeline({ repeat })

        gsap.set(traveler, { opacity: 0, transformOrigin: '50% 50%' })
        timeline.to(traveler, {
          delay,
          duration,
          ease: 'none',
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
        })
        timeline.to(traveler, { duration: 0.3, ease: 'power1.out', opacity: 1 }, delay)

        if (fadeOut) {
          timeline.to(
            traveler,
            { duration: 0.3, ease: 'power1.in', opacity: 0 },
            Math.max(delay, delay + duration - 0.3),
          )
        }
      }, scopeRef)
    }

    startAnimation().catch(() => {
      if (!cancelled) placeAt(path, traveler, 1, 1)
    })

    return () => {
      cancelled = true
      context?.revert()
    }
  }, [active, delay, duration, fadeOut, pathRef, reduceMotion, repeat, scopeRef, travelerRef])
}
