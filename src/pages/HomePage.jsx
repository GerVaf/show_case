import { useRef } from 'react'
import { ArrowDownRightIcon } from '@phosphor-icons/react/ArrowDownRight'
import { ArrowRightIcon } from '@phosphor-icons/react/ArrowRight'
import { ArrowUpRightIcon } from '@phosphor-icons/react/ArrowUpRight'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import CapabilityIndex from '../components/CapabilityIndex.jsx'
import PerformanceRail from '../components/PerformanceRail.jsx'
import Portrait from '../components/Portrait.jsx'
import SelectedWork from '../components/SelectedWork.jsx'
import ThroughLineGraphic from '../components/ThroughLineGraphic.jsx'

const words = ['Thant', 'Zin', 'Min.']
const wordMotion = {
  hidden: { opacity: 0, y: '110%' },
  visible: { opacity: 1, y: 0 },
}

const disciplines = ['Lead', 'Build', 'Shape', 'Explore', 'Just Lwint', 'Product systems', 'Brand direction']

export default function HomePage() {
  const heroRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '4%'])
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1.018, 1])

  return (
    <>
      <section ref={heroRef} className="page-shell border-x border-ink/20">
        <div className="grid min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,1fr)_30rem] xl:grid-cols-[minmax(0,1fr)_36rem]">
          <div className="flex flex-col justify-between px-5 py-10 md:px-8 md:py-14 lg:border-r lg:border-ink/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="eyebrow">Personal archive · No. 01 · Yangon</p>
              <p className="eyebrow text-ink-faint">Learning since 2021</p>
            </div>

            <m.h1
              className="my-16 max-w-5xl font-display text-[clamp(4.8rem,13vw,11rem)] leading-[0.72] font-semibold uppercase tracking-[-0.085em] lg:my-20"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {words.map((word) => (
                <span key={word} className="block overflow-hidden pb-[0.06em]">
                  <m.span
                    className="block"
                    variants={wordMotion}
                    transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </m.span>
                </span>
              ))}
            </m.h1>

            <div className="flex flex-col gap-6 border-t border-ink/25 pt-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="font-display max-w-3xl text-2xl leading-tight font-semibold tracking-[-0.035em] md:text-4xl">
                  I don’t stay <span className="ink-underline">inside one discipline.</span>
                </p>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
                  I turn ideas into companies, products, brand worlds, and technology people can actually use.
                </p>
                <p className="mt-3 max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.13em] text-ink-faint">
                  Managing Director &amp; Board Member · Just Lwint Company Limited
                </p>
              </div>
              <Link to="/work" className="button-primary shrink-0">
                Explore the work
                <ArrowDownRightIcon aria-hidden="true" size={12} weight="bold" />
              </Link>
            </div>
          </div>

          <m.div
            className="relative min-h-[34rem] overflow-hidden bg-ink lg:min-h-0"
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.78, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <m.div
              className="hero-portrait absolute -inset-y-4 inset-x-0"
              style={reduceMotion ? undefined : { y: portraitY, scale: portraitScale }}
            >
              <Portrait
                priority
                className="h-full"
                imgClassName="object-[56%_43%]"
                sizes="(min-width: 1280px) 576px, (min-width: 1024px) 544px, 100vw"
              />
            </m.div>
            <div className="absolute inset-x-0 top-0 flex items-start justify-between bg-gradient-to-b from-black/70 to-transparent p-6 pb-24 text-white">
              <span className="eyebrow">AKA</span>
              <p className="font-display text-right text-3xl leading-none font-semibold tracking-[-0.055em] uppercase md:text-4xl">Vixx<br />Grego</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-6 pt-28 text-white">
              <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.17em]">Portrait / 2026<br />Yangon, Myanmar</p>
              <span className="stamp stamp-small border-white/70">Building<br />forward</span>
            </div>
          </m.div>
        </div>
      </section>

      <DisciplineTicker />

      <section className="page-shell grid border-x border-t border-ink/20 sm:grid-cols-3">
        {[
          ['MON', '60', 'Public repositories'],
          ['TUE', '2021', 'Started during COVID'],
          ['WED', '04', 'Ways I perform'],
        ].map(([day, value, label]) => (
          <m.div
            key={label}
            className="border-b border-ink/20 p-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0 md:p-8"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow mb-7 border-b border-ink/15 pb-3 text-ink-faint">{day}</p>
            <p className={`font-display w-fit text-5xl font-normal tracking-[-0.065em] md:text-7xl ${value === '2021' ? 'ink-circle' : ''}`}>{value}</p>
            <p className="eyebrow mt-3 text-ink-muted">{label}</p>
          </m.div>
        ))}
      </section>

      <PerformanceRail />

      <CapabilityIndex />

      <SelectedWork showFilters={false} limit={3} />

      <section className="defer-section page-shell grid border-x border-t border-ink/20 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex min-h-[26rem] flex-col overflow-hidden border-b border-ink/20 p-5 md:p-8 lg:min-h-0 lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow">The through-line</p>
            <span className="font-mono text-[9px] tracking-[0.14em] text-ink-faint uppercase">2021—Now</span>
          </div>
          <ThroughLineGraphic className="mt-5 flex-1 md:mt-7" />
        </div>
        <div className="p-5 py-16 md:p-12 md:py-24">
          <p className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.055em] md:text-6xl">
            Code taught me to make. Business taught me what is worth making.
          </p>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            From early web experiments to the connected ownership experience behind Just Lwint, the work has always been about moving an idea into the real world—and taking responsibility for how it performs there.
          </p>
          <Link className="button-outline mt-10" to="/about">
            Read my story
            <ArrowRightIcon aria-hidden="true" size={12} weight="bold" />
          </Link>
        </div>
      </section>

      <section className="defer-section page-shell border-x border-t border-ink/20 px-5 py-24 text-center md:px-8 md:py-32">
        <p className="eyebrow mb-8">Build something with intent</p>
        <a className="contact-link" href="mailto:hello@thantzinmin.cloud">Let’s talk.</a>
        <div>
          <a
            className="mt-7 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted underline decoration-ink/30 underline-offset-4 transition-colors hover:text-blue focus-visible:text-blue"
            href="mailto:hello@thantzinmin.cloud"
          >
            hello@thantzinmin.cloud
            <ArrowUpRightIcon aria-hidden="true" size={11} weight="bold" />
          </a>
        </div>
      </section>
    </>
  )
}

function DisciplineTicker() {
  return (
    <section className="ticker-shell page-shell border-x border-t border-ink/20" aria-label="Disciplines">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div className="ticker-set" key={copy} aria-hidden={copy === 1}>
            {disciplines.map((item) => (
              <span className="ticker-item" key={`${copy}-${item}`}>
                <span className="size-1.5 rounded-full bg-blue" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
