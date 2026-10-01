import { lazy, Suspense, useEffect } from 'react'
import { ArrowUpRightIcon } from '@phosphor-icons/react/ArrowUpRight'
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  MotionConfig,
  useScroll,
  useSpring,
} from 'framer-motion'
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

const loadHomePage = () => import('./pages/HomePage.jsx')
const loadWorkPage = () => import('./pages/WorkPage.jsx')
const loadAboutPage = () => import('./pages/AboutPage.jsx')
const loadNotFoundPage = () => import('./pages/NotFoundPage.jsx')
const HomePage = lazy(loadHomePage)
const WorkPage = lazy(loadWorkPage)
const AboutPage = lazy(loadAboutPage)
const NotFoundPage = lazy(loadNotFoundPage)
const currentYear = new Date().getFullYear()

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen">
          <a className="skip-link" href="#main-content">Skip to content</a>
          <ScrollProgress />
          <Header />
          <AnimatePresence mode="wait" initial={false}>
            <m.main
              id="main-content"
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <Suspense fallback={<RouteFallback />}>
                <Routes location={location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </m.main>
          </AnimatePresence>
          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}

function Header() {
  const navClass = ({ isActive }) =>
    `nav-link ${isActive ? 'nav-link-active' : ''}`

  return (
    <header className="site-header page-shell border-x border-ink/20">
      <div className="flex min-h-20 items-center justify-between border-b border-ink/20 px-5 md:px-8">
        <Link to="/" className="group flex items-center gap-3" aria-label="Thant Zin Min — home">
          <span className="grid size-9 place-items-center rounded-full bg-blue font-mono text-[9px] font-semibold text-paper transition-transform duration-300 group-hover:rotate-12">
            VG
          </span>
          <span className="font-display text-lg font-semibold uppercase tracking-[-0.03em]">Thant Zin Min <span className="hidden text-ink-faint md:inline">/ Vixx Grego</span></span>
        </Link>

        <nav className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.14em] md:gap-8" aria-label="Main navigation">
          <NavLink to="/work" className={navClass} onPointerEnter={loadWorkPage} onFocus={loadWorkPage}>Selected</NavLink>
          <NavLink to="/about" className={navClass} onPointerEnter={loadAboutPage} onFocus={loadAboutPage}>Story</NavLink>
          <a className="nav-link hidden items-center gap-1 sm:inline-flex" href="https://github.com/GerVaf" target="_blank" rel="noreferrer">
            GitHub
            <ArrowUpRightIcon aria-hidden="true" size={11} weight="bold" />
          </a>
        </nav>
      </div>
    </header>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.18,
  })

  return <m.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

function RouteFallback() {
  return (
    <div className="page-shell grid min-h-[70svh] place-items-center border-x border-ink/20" role="status">
      <span className="eyebrow animate-pulse">Loading / TZM</span>
    </div>
  )
}

function Footer() {
  return (
    <footer className="page-shell border border-ink/20 px-5 py-6 md:px-8">
      <div className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {currentYear} Thant Zin Min</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a className="inline-flex items-center gap-1 hover:text-ink" href="https://justlwint.com" target="_blank" rel="noreferrer">
            Just Lwint <ArrowUpRightIcon aria-hidden="true" size={11} weight="bold" />
          </a>
          <a className="inline-flex items-center gap-1 hover:text-ink" href="https://github.com/GerVaf" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRightIcon aria-hidden="true" size={11} weight="bold" />
          </a>
          <a className="inline-flex items-center gap-1 hover:text-ink" href="mailto:hello@thantzinmin.cloud">
            hello@thantzinmin.cloud <ArrowUpRightIcon aria-hidden="true" size={11} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
   )
}

export default App
