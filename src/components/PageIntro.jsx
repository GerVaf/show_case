import { m } from 'framer-motion'

export default function PageIntro({ index, eyebrow, title, copy }) {
  return (
    <section className="page-shell border-x border-ink/20 px-5 py-20 md:px-8 md:py-28">
      <div className="mb-16 flex items-center justify-between">
        <m.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>{eyebrow}</m.p>
        <m.span className="font-mono text-xs text-ink-faint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.08 }}>/{index}</m.span>
      </div>
      <div className="overflow-hidden">
        <m.h1
          className="max-w-6xl font-display text-[clamp(4rem,10vw,9rem)] leading-[0.84] font-semibold uppercase tracking-[-0.07em]"
          initial={{ y: '105%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </m.h1>
      </div>
      <m.p
        className="mt-12 max-w-2xl border-l border-ink pl-5 text-lg leading-relaxed text-ink-muted md:ml-auto md:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.62, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
      >
        {copy}
      </m.p>
    </section>
  )
}
