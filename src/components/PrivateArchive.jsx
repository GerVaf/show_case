import { m } from 'framer-motion'
import { RouteMark } from './GraphicMarks.jsx'

const privateBuilds = [
  {
    number: '01',
    title: 'Chat experience',
    stack: 'Next.js · TypeScript',
    copy: 'A private TypeScript build exploring a focused, modern messaging experience.',
  },
  {
    number: '02',
    title: 'Order workflow',
    stack: 'JavaScript · Product flow',
    copy: 'A private application shaped around order management and operational clarity.',
  },
  {
    number: '03',
    title: 'Sneaker storefront',
    stack: 'HTML · Early archive',
    copy: 'An early private storefront concept focused on product structure and presentation.',
  },
  {
    number: '04',
    title: 'Portfolio iteration',
    stack: 'JavaScript · Personal system',
    copy: 'A private portfolio build that records an earlier stage of the visual and front-end practice.',
  },
]

export default function PrivateArchive() {
  return (
    <section className="defer-section page-shell border-x border-t border-ink/20 px-5 py-20 md:px-8 md:py-28">
      <div className="grid overflow-hidden border border-ink/25 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative min-h-[31rem] overflow-hidden bg-ink p-7 text-paper md:p-10 lg:min-h-full">
          <p className="eyebrow">Private archive / Metadata only</p>
          <h2 className="mt-9 max-w-lg font-display text-5xl leading-[0.88] font-semibold uppercase tracking-[-0.06em] md:text-7xl">
            Built quietly.
          </h2>
          <p className="mt-7 max-w-md leading-relaxed text-paper/70">
            The repositories stay private. The range does not: four original builds across communication, operations, commerce, and identity.
          </p>

          <RouteMark className="absolute right-0 bottom-0 w-[34rem] max-w-[115%] translate-x-12 text-paper/55" accent="#efede8" />
          <span className="absolute right-6 bottom-7 rotate-6 border border-paper/60 bg-ink px-4 py-3 font-mono text-[9px] leading-relaxed tracking-[0.16em] uppercase">
            04 private<br />04 original
          </span>
        </div>

        <div className="bg-paper">
          {privateBuilds.map((project, index) => (
            <m.article
              className="grid gap-5 border-b border-ink/20 p-6 last:border-b-0 md:grid-cols-[3rem_1fr] md:p-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              key={project.number}
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-blue">/{project.number}</span>
              <div>
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <h3 className="font-display text-3xl font-semibold uppercase tracking-[-0.045em]">{project.title}</h3>
                  <span className="font-mono text-[9px] tracking-[0.13em] text-ink-faint uppercase">{project.stack}</span>
                </div>
                <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">{project.copy}</p>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  )
}
