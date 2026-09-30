import { m } from 'framer-motion'
import { OrbitMark, RouteMark } from './GraphicMarks.jsx'

const capabilities = [
  {
    number: '01',
    title: 'Mobile products',
    tools: 'Flutter · Dart · iOS · Android',
    copy: 'Cross-platform product work from interface and commerce flows through QR/NFC ownership, release, and the details users meet after launch.',
  },
  {
    number: '02',
    title: 'Web platforms',
    tools: 'React · TypeScript · JavaScript',
    copy: 'Responsive product interfaces, service platforms, dashboards, commerce, learning systems, and design systems built around real workflows.',
  },
  {
    number: '03',
    title: 'Connected systems',
    tools: 'Node · Express · Auth · Real-time',
    copy: 'Enough backend and systems thinking to connect the interface to accounts, operational data, content, and the processes behind the screen.',
  },
  {
    number: '04',
    title: 'Direction + ownership',
    tools: 'Product · Brand · Operations',
    copy: 'Setting direction, shaping the story, deciding what earns focus, and staying responsible for what ships as a company leader.',
  },
]

export default function CapabilityIndex() {
  return (
    <section id="capabilities" className="defer-section page-shell scroll-mt-20 overflow-hidden border-x border-t border-ink/20">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative min-h-[34rem] overflow-hidden bg-blue p-6 text-paper md:p-10 lg:border-r lg:border-ink/20">
          <p className="eyebrow relative z-10">Capability index / 01—04</p>
          <h2 className="relative z-10 mt-10 max-w-xl font-display text-5xl leading-[0.88] font-semibold uppercase tracking-[-0.06em] md:text-7xl">
            The stack follows the problem.
          </h2>
          <p className="relative z-10 mt-7 max-w-md text-base leading-relaxed text-paper/75 md:text-lg">
            I’m not interested in collecting tool logos. I move between product, technology, brand, and business to make the whole thing work.
          </p>

          <OrbitMark
            className="absolute -right-16 -bottom-20 size-[23rem] text-paper/60 md:size-[29rem]"
            accent="#efede8"
          />
          <span className="absolute right-5 bottom-6 z-10 rotate-[-7deg] border border-paper/70 bg-blue px-4 py-3 font-mono text-[9px] leading-relaxed tracking-[0.16em] uppercase md:right-auto md:bottom-10 md:left-10">
            One practice<br />Many outputs
          </span>
        </div>

        <div className="bg-paper">
          {capabilities.map((capability, index) => (
            <m.article
              className="capability-row grid gap-6 border-b border-ink/20 p-6 last:border-b-0 md:grid-cols-[3.5rem_1fr] md:p-9"
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
              key={capability.number}
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-blue">/{capability.number}</span>
              <div>
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <h3 className="font-display text-3xl font-semibold uppercase tracking-[-0.045em] md:text-4xl">{capability.title}</h3>
                  <p className="font-mono text-[9px] tracking-[0.13em] text-ink-faint uppercase">{capability.tools}</p>
                </div>
                <p className="mt-5 max-w-2xl leading-relaxed text-ink-muted">{capability.copy}</p>
              </div>
            </m.article>
          ))}
        </div>
      </div>

      <div className="relative grid items-center overflow-hidden border-t border-ink/20 bg-[#e4e2dc] p-5 md:grid-cols-[1fr_1fr] md:px-10 md:py-7">
        <p className="relative z-10 max-w-md font-display text-2xl leading-tight font-semibold tracking-[-0.04em] md:text-3xl">
          60 public repositories. 4 private originals. Three live products worth leading with.
        </p>
        <RouteMark className="mt-5 w-full text-ink md:mt-0" />
      </div>
    </section>
  )
}
