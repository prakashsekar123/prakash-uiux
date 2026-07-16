# Prakash S — Portfolio

UI/UX designer portfolio built with React 19, Vite and GSAP. Refined violet/cyan
theme with full light and dark mode.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build locally
npm run lint        # eslint
```

## Folder structure

```
src/
  app/                 App shell: router, global chrome (nav, cursor, loader, progress bar)
  components/
    layout/            Nav, mobile menu, theme toggle, cursor, loader, back-to-top
    ui/                 Reusable pieces: Reveal, CountUp, MagneticButton, MockupFrame,
                        Lightbox, BeforeAfter, Timeline
  features/
    home/                HomePage + one file per section (hero, about, projects, ...)
    project-detail/     Case study page (lazy-loaded, its own JS chunk)
  data/                content.js (site copy) and projects.js (case studies)
  hooks/                useTheme, useScrollChrome, useTypewriter
  styles/               tokens.css (design tokens) → base → layout → sections → components
  utils/                 raf throttle, cursor hover effects, tilt effect
```

Each stylesheet only defines its own slice of the UI, but every color, radius,
and font is a CSS variable in `styles/tokens.css` — that's the one file to
touch to retheme the whole site.

## Adding real project screenshots

Every case study in `src/data/projects.js` currently has `img: null`, which
renders a clean placeholder mockup (`MockupFrame`) instead of a broken image
request. To swap in a real screenshot:

1. Drop the image in `src/assets/` (or `public/` for a very large file).
2. Import it and set it as the `img` field on that project's `gallery` entry
   (or the top-level `img` field for the project card thumbnail).

Nothing else needs to change — the frame, lightbox, and lazy-loading are
already wired up to use a real `<img>` the moment one is provided.

## Performance notes

- Case study pages are code-split with `React.lazy` — the home route doesn't
  pay for that JS until it's needed.
- Fonts are loaded via `<link>` tags with `preconnect`, not a CSS `@import`,
  so they fetch in parallel with everything else instead of blocking the
  cascade.
- Scroll-driven UI (nav hide, progress bar, active section) runs through a
  single `requestAnimationFrame`-throttled listener in `useScrollChrome`
  rather than several independent ones.
- Theme is applied before first paint via a tiny inline script in
  `index.html`, so there's no flash of the wrong theme on load.
