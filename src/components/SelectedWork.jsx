import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { m } from 'framer-motion'
import { filters, projects } from '../data/portfolio.js'

export default function SelectedWork({ showFilters = true, limit }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [listRef] = useAutoAnimate({ duration: 240, easing: 'ease-in-out' })
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.category === activeFilter)
  const visibleProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects

  return (
    <section id="work" className="defer-section page-shell scroll-mt-20 border-x border-t border-ink/20 px-5 py-20 md:px-8 md:py-28">
      <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-4">Selected work / Live systems</p>
          <h2 className="font-display text-5xl font-semibold uppercase tracking-[-0.05em] md:text-7xl">Built to be used</h2>
        </div>
        {showFilters && (
          <div className="flex max-w-xl flex-wrap gap-2" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={`filter-button ${activeFilter === filter ? 'filter-button-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>

      <div ref={listRef} className="grid gap-px overflow-hidden border border-ink bg-ink md:grid-cols-2">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.number} project={project} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const toneClasses = {
    light: 'bg-paper text-ink',
    dark: 'bg-ink text-paper',
    mid: 'bg-stone text-ink',
  }

  return (
    <m.article
      className={`${toneClasses[project.tone]} ${project.featured ? 'md:col-span-2' : ''} project-card group flex min-h-[31rem] flex-col justify-between p-6 md:p-8`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] opacity-65">
        <span>Case {project.number} · {project.category}</span>
        <span>{project.year}</span>
      </div>

      {project.featured && (
        <div className="my-14 overflow-hidden border-y border-current/25 py-8 md:my-20 md:py-12">
          <p className="font-display text-[clamp(4.2rem,13vw,11rem)] leading-[0.72] font-semibold uppercase tracking-[-0.09em] transition-transform duration-500 ease-out group-hover:translate-x-2">
            Just<br />Lwint
          </p>
        </div>
      )}

      {!project.featured && (
        <div className="project-visual relative my-10 flex min-h-48 items-center justify-center overflow-hidden border-y border-current/25">
          <span className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-[0.16em] opacity-60">TZM / Archive</span>
          <span className="project-visual-number" aria-hidden="true">{project.number}</span>
          <span className="absolute right-4 bottom-4 font-mono text-[9px] uppercase tracking-[0.16em] opacity-60">{project.category}</span>
        </div>
      )}

      <div className={project.featured ? 'grid gap-8 md:grid-cols-[1fr_1fr] md:items-end' : ''}>
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] opacity-65">{project.type}</p>
          {!project.featured && <h3 className="font-display text-4xl font-semibold uppercase tracking-[-0.04em]">{project.title}</h3>}
          <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-75 md:text-base">{project.summary}</p>
        </div>
        <div className={`mt-8 flex flex-col gap-6 ${project.featured ? 'md:mt-0 md:items-end' : ''}`}>
          <ul className="flex flex-wrap gap-2" aria-label="Technologies and capabilities">
            {project.tech.map((item) => <li key={item} className="project-tag">{item}</li>)}
          </ul>
          <div className={`flex flex-wrap gap-x-5 gap-y-3 font-mono text-[10px] uppercase tracking-[0.14em] ${project.featured ? 'md:justify-end' : ''}`}>
            {project.links.map((link, index) => (
              <a
                className={`project-link ${index > 0 ? 'opacity-65 hover:opacity-100' : ''}`}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                key={link.href}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </m.article>
  )
}
