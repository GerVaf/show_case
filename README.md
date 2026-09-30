# Thant Zin Min / Vixx Grego — Personal Portfolio

The personal showcase of Thant Zin Min, aka Vixx Grego: identity, story, leadership, public building history, and live products led by the Flutter-powered Just Lwint company ecosystem.

## Stack

- React 19 with Vite 8
- React Router with route-level code splitting
- TanStack Query
- Framer Motion with lazy DOM features and reduced-motion support
- Viewport-gated animated SVG marks and a transform-only ambient ticker
- FormKit AutoAnimate for filtered project layouts
- Tailwind CSS 4
- Self-hosted Inter typography with no third-party font requests
- Sharp-generated responsive AVIF/WebP portrait assets
- Oxlint

## Getting started

Use Node 24 LTS (recorded in `.nvmrc`).

```bash
nvm use
npm install
npm run dev
```

## Commands

```bash
npm run dev      # Start the development server
npm run lint     # Run Oxlint
npm run build    # Create a production build
npm run check    # Run lint and production build
npm run preview  # Preview the production build
```

## Content structure

- `src/pages/HomePage.jsx` — identity, modes of performance, featured outcomes
- `src/pages/AboutPage.jsx` — personal story and timeline beginning in 2021 during COVID
- `src/pages/WorkPage.jsx` — selected evidence and public archive
- `src/components/PrivateArchive.jsx` — metadata-safe summary of private builds
- `src/data/portfolio.js` — project information and links
- `src/index.css` — visual system and performance-oriented rendering rules
- `public/images/` — responsive portrait variants
