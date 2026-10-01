import { ArrowUpLeftIcon } from '@phosphor-icons/react/ArrowUpLeft'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="page-shell grid min-h-[70svh] place-items-center border-x border-ink/20 px-5 text-center">
      <div>
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="font-display text-8xl font-semibold tracking-[-0.08em] md:text-[12rem]">LOST.</h1>
        <Link to="/" className="button-primary mt-8">
          Return home
          <ArrowUpLeftIcon aria-hidden="true" size={12} weight="bold" />
        </Link>
      </div>
    </section>
  )
}
