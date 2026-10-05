import { ArrowUpRightIcon } from '@phosphor-icons/react/ArrowUpRight'
import { m } from 'framer-motion'
import EvidencePortrait from '../components/EvidencePortrait.jsx'
import PageIntro from '../components/PageIntro.jsx'
import { storyTimeline } from '../data/story.js'

export default function AboutPage() {
  return (
    <>
      <PageIntro
        index="02"
        eyebrow="The person behind the work"
        title="Who is Vixx Grego?"
        copy="This is more than a record of work. It is who I am, what I have passed through, and what I am still working toward."
      />

      <section className="page-shell grid border-x border-t border-ink/20 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-ink/20 p-5 md:p-8 lg:border-r lg:border-b-0">
          <EvidencePortrait className="h-full" />
        </div>
        <div className="flex flex-col justify-between gap-16 p-5 py-12 md:p-12 md:py-16">
          <div>
            <p className="eyebrow mb-8">My story</p>
            <div className="space-y-6 text-lg leading-relaxed text-ink-muted md:text-xl">
              <p>I’m Thant Zin Min, also known as Vixx Grego. I graduated from YE-U Gant Gaw Private School, then began Computer Science and Technology at the University of Computer Studies (Mandalay) in the 2018–2019 academic year.</p>
              <p>After my first university year, I worked hard to build my career. I learned technology independently, completed formal web training, spent one year at Ex;braiN, and then worked for one year at Digital Copilot Myanmar.</p>
              <p>At Digital Copilot Myanmar, I worked on-site for the first three months and from home for the remainder of the role. The remote period overlapped with my return to UCS Mandalay in the 2024–2025 academic year, when I completed and passed my second year. The years between those academic records were years of focused learning, professional work, and career growth.</p>
              <p>Today, I am the founder of Just Lwint Company Limited, working across product, technology, brand, and company direction. I am continuing to grow professionally while working toward continuing my university education in Taiwan.</p>
            </div>
          </div>

          <dl className="grid gap-px border border-ink/25 bg-ink/25 font-mono text-[10px] uppercase tracking-[0.12em] sm:grid-cols-2">
            {[
              ['Based in', 'Yangon, Myanmar'],
              ['Education', 'UCS Mandalay · Passed year two (2024–25)'],
              ['Current role', 'Founder · Just Lwint'],
              ['Working toward', 'University in Taiwan'],
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
        <div className="mb-14 grid gap-6 border-b border-ink/25 pb-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="eyebrow">The path so far</p>
            <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">School—Next</span>
          </div>
          <div>
            <h2 className="font-display text-4xl leading-[0.95] font-semibold uppercase tracking-[-0.05em] md:text-6xl">Not a straight line.<br />Still moving forward.</h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">The years between my first and second academic records were not empty. They became the years in which I learned, worked, and built my career.</p>
          </div>
        </div>

        <ol className="border-t border-ink/25">
          {storyTimeline.map(({ period, chapter, place, text }, index) => (
            <m.li
              key={`${period}-${place}`}
              className="grid gap-5 border-b border-ink/25 py-8 md:grid-cols-[11rem_13rem_1fr] md:gap-8"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.42, delay: Math.min(index * 0.025, 0.12), ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-display text-2xl leading-tight font-semibold tracking-[-0.04em] md:text-3xl">{period}</span>
              <div>
                <p className="eyebrow text-blue">{chapter}</p>
                <p className="mt-2 font-display text-lg leading-tight font-semibold tracking-[-0.025em]">{place}</p>
              </div>
              <p className="max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">{text}</p>
            </m.li>
          ))}
        </ol>
      </section>

      <RecommendationArchive />
    </>
  )
}

function RecommendationArchive() {
  return (
    <section className="defer-section page-shell grid border-x border-t border-ink/20 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col justify-between gap-12 border-b border-ink/20 p-5 py-16 md:p-12 md:py-20 lg:border-r lg:border-b-0">
        <div>
          <p className="eyebrow text-ink-faint">Professional recommendation / 29 Jan 2024</p>
          <h2 className="mt-8 max-w-xl font-display text-5xl leading-[0.9] font-semibold uppercase tracking-[-0.055em] md:text-7xl">Trust, written down.</h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">After one year on Ex;braiN’s software-development team, CEO Linn Ko Ko highlighted my technical skill, dedication, problem-solving, and collaborative approach.</p>

          <blockquote className="mt-10 border-l-2 border-blue pl-5 font-display text-2xl leading-tight tracking-[-0.035em] md:text-3xl">
            “His technical expertise, problem-solving skills, and collaborative spirit make him a valuable asset to any team.”
          </blockquote>
          <p className="mt-5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.15em] text-ink-faint">Linn Ko Ko · Chief Executive Officer · Ex;braiN Software Development</p>
        </div>

        <div>
          <p className="max-w-lg font-mono text-[9px] uppercase leading-relaxed tracking-[0.13em] text-ink-faint">Published as a public professional recommendation. Contact details and the handwritten signature are redacted for privacy.</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
            <a className="button-primary" href="/documents/exbrain-recommendation-redacted.webp" target="_blank" rel="noreferrer">
              View public letter
              <ArrowUpRightIcon aria-hidden="true" size={12} weight="bold" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid place-items-center bg-[#d9d6cf] p-5 py-12 md:p-12 md:py-16">
        <m.figure
          className="w-full max-w-[34rem]"
          initial={{ opacity: 0, y: 24, rotate: 1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.35 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            className="group relative block overflow-hidden border border-ink/30 bg-paper shadow-[10px_10px_0_rgba(28,36,181,.9)]"
            href="/documents/exbrain-recommendation-redacted.webp"
            target="_blank"
            rel="noreferrer"
            aria-label="Open the public redacted Exbrain recommendation letter at full size"
          >
            <img
              className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.012]"
              src="/documents/exbrain-recommendation-redacted.webp"
              width="992"
              height="1402"
              loading="lazy"
              decoding="async"
              alt="Redacted scan of the Exbrain employment recommendation for Thant Zin Min, dated 29 January 2024"
            />
            <span className="absolute right-0 bottom-0 inline-flex items-center gap-2 bg-ink px-4 py-3 font-mono text-[8px] uppercase tracking-[0.14em] text-paper">
              Open full size
              <ArrowUpRightIcon aria-hidden="true" size={11} weight="bold" />
            </span>
          </a>
          <figcaption className="mt-5 flex items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.14em] text-ink-faint">
            <span>Recommendation / 01</span>
            <span>Public redacted scan</span>
          </figcaption>
        </m.figure>
      </div>
    </section>
  )
}
