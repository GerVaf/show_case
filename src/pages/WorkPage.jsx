import { ArrowUpRightIcon } from '@phosphor-icons/react/ArrowUpRight'
import PageIntro from '../components/PageIntro.jsx'
import PrivateArchive from '../components/PrivateArchive.jsx'
import SelectedWork from '../components/SelectedWork.jsx'

export default function WorkPage() {
  return (
    <>
      <PageIntro
        index="01"
        eyebrow="Selected projects"
        title="Production work, not concepts."
        copy="Live products I built or helped shape: a Flutter commerce and ownership ecosystem, service platforms, and a restaurant ordering experience. Just Lwint is the fullest expression of how I lead and build."
      />
      <SelectedWork />
      <PrivateArchive />
      <section className="defer-section page-shell border-x border-t border-ink/20 px-5 py-20 md:px-8">
        <div className="flex flex-col gap-8 border border-ink/25 p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="eyebrow mb-3">More work</p>
            <p className="max-w-xl text-lg leading-relaxed text-ink-muted">The public archive shows the wider learning path—60 repositories across interfaces, experiments, collaborations, and the code behind the production work above.</p>
          </div>
          <a className="button-primary shrink-0" href="https://github.com/GerVaf?tab=repositories" target="_blank" rel="noreferrer">
            Open GitHub
            <ArrowUpRightIcon aria-hidden="true" size={12} weight="bold" />
          </a>
        </div>
      </section>
    </>
  )
}
