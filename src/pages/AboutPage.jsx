import { m } from 'framer-motion'
import EvidencePortrait from '../components/EvidencePortrait.jsx'
import PageIntro from '../components/PageIntro.jsx'

const timeline = [
  ['2021', 'During COVID, I started learning technology and design—turning isolation into the beginning of a long-term practice.'],
  ['2022', 'Started building in public on GitHub—learning through interfaces, utilities, and shipped experiments.'],
  ['2023—24', 'Expanded into React products, TypeScript systems, mobile work, commerce, dashboards, and transport-tech work with Kar Gate.'],
  ['2025—26', 'Focused product and business leadership into Just Lwint, then built and shipped its Flutter commerce and ownership app for iOS and Android.'],
  ['Now', 'Leading Just Lwint Company Limited as Managing Director and Board Member while continuing to build the underlying products.'],
]

export default function AboutPage() {
  return (
    <>
      <PageIntro
        index="02"
        eyebrow="The person behind the work"
        title="Who is Vixx Grego?"
        copy="Thant Zin Min is the name. Vixx Grego is the identity behind the work—a builder, operator, and business leader from Yangon who refuses to stay inside one discipline."
      />

      <section className="page-shell grid border-x border-t border-ink/20 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-ink/20 p-5 md:p-8 lg:border-r lg:border-b-0">
          <EvidencePortrait className="h-full" />
        </div>
        <div className="flex flex-col justify-between gap-16 p-5 py-12 md:p-12 md:py-16">
          <div>
            <p className="eyebrow mb-8">My story</p>
            <div className="space-y-6 text-lg leading-relaxed text-ink-muted md:text-xl">
              <p>I’m Thant Zin Min, also known as Vixx Grego. My path has never been a choice between technology and business. I learned by building: first small interfaces, then complete React platforms, Flutter mobile products, and systems made for real users.</p>
              <p>That practice grew into a larger responsibility at Just Lwint Company Limited. As Managing Director and a member of the Board of Directors, I help lead an independent Yangon streetwear company where the garment, the brand story, and the technology behind ownership are designed as one experience.</p>
              <p>I stay close to the work. Strategy matters, but so do loading speed, the edge case in a product flow, the tone of a campaign, and whether the final thing genuinely earns attention.</p>
            </div>
          </div>

          <dl className="grid gap-px border border-ink/25 bg-ink/25 font-mono text-[10px] uppercase tracking-[0.12em] sm:grid-cols-2">
            {[
              ['Based in', 'Yangon, Myanmar'],
              ['Leadership', 'MD · Board Member'],
              ['Company', 'Just Lwint Co., Ltd.'],
              ['Public identity', 'Vixx Grego · @GerVaf'],
            ].map(([term, value]) => (
              <div key={term} className="bg-paper p-4">
                <dt className="mb-2 text-ink-faint">{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="defer-section page-shell border-x border-t border-ink/20 px-5 py-20 md:px-8 md:py-28">
        <div className="mb-14 flex items-center justify-between">
          <p className="eyebrow">The path so far</p>
          <span className="font-mono text-xs text-ink-faint">2021—NOW</span>
        </div>
        <ol className="border-t border-ink/25">
          {timeline.map(([year, text], index) => (
            <m.li
              key={year}
              className="grid gap-4 border-b border-ink/25 py-7 md:grid-cols-[10rem_1fr] md:gap-10"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.42, delay: Math.min(index * 0.035, 0.14), ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-display text-3xl font-semibold tracking-[-0.04em]">{year}</span>
              <p className="max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">{text}</p>
            </m.li>
          ))}
        </ol>
      </section>
    </>
  )
}
