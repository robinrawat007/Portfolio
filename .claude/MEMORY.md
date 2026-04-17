# MEMORY.md

> Claude's notebook. Read at session start; update after non-trivial work.
> Bullets only. Dates as `[YYYY-MM-DD]`. Prune stale entries.

## Patterns
*Non-obvious codebase conventions.*
- Background uses pure CSS orbs (`.bg-orb-1/2/3` in globals.css) — Three.js was removed, don't re-add it
- Hero star particles are deterministic golden-ratio CSS divs — no `Math.random()`, no Framer Motion, safe for SSR
- Atlas FAB opens via `document.querySelector('[aria-label="Open AI assistant chat"]')?.click()`
- All heavy client-only components use `dynamic(() => import(...), { ssr: false })` in `page.jsx`
- Rate limiting via `lib/rateLimit.js` (in-memory Map) — imported in both API routes

## Gotchas
*symptom → cause → fix*
- Webpack NTFS cache error on Windows → `config.cache = false` in `next.config.js` webpack fn (dev only)
- `aria-live` on typing animation fires every keystroke → moved to `sr-only` span that only updates on `roleIndex` change
- 3D flip + react-parallax-tilt conflict → removed Tilt entirely, pure CSS `preserve-3d` flip

## Decisions
*[date] choice — reason*
- [2026-04-17] Replaced Three.js BackgroundCanvas with CSS orbs — ~300 kB bundle savings, no WebGL context needed
- [2026-04-17] Replaced 80 Framer Motion star `motion.div`s with CSS `.star-particle` — eliminates JS animation overhead
- [2026-04-17] CSP uses `unsafe-inline`/`unsafe-eval` — required for Next.js 15 without nonce setup; nonce-based CSP is the path to removing these
- [2026-04-17] `lib/rateLimit.js` is in-memory (not Redis) — single-instance Netlify deploy, acceptable tradeoff
- [2026-04-17] JSON-LD upgraded to `@graph` with Person + WebSite schemas in `layout.jsx`
- [2026-04-17] Dynamic OG image via `app/opengraph-image.jsx` (Next.js ImageResponse, edge runtime)
- [2026-04-17] AIProjects shows: Atlas (live), AI Content Pipeline (Instagram/YouTube automation, in-progress)
- [2026-04-17] AI Playground removed — would consume API credits with no payoff

## In progress
- Task: —
- Done: Full Perf/Security/A11Y/SEO/UX audit + implementation sprint
- Next: Add real project screenshots to `Projects.jsx` (`image` field, currently `null`)
- Blocking: —

## Pending
- [ ] Add real screenshots to carousel cards (`/public/screenshots/` + set `image` field in `projects` array in `Projects.jsx`)
- [ ] Nonce-based CSP to remove `unsafe-inline`/`unsafe-eval` from `next.config.js`

## Done
*Last ~10. Prune >2 weeks.*
- [2026-04-17] Replaced Three.js with CSS orbs; Hero motion.div stars with CSS
- [2026-04-17] Rate limiting + input caps on `/api/chat` and `/api/enquiry`
- [2026-04-17] CSP header, scroll-margin-top, ARIA carousel, IntersectionObserver nav, ErrorBoundary on all sections
- [2026-04-17] Dynamic OG image (`app/opengraph-image.jsx`), @graph JSON-LD
- [2026-04-17] Navbar: aria-current, Escape key close, mobile focus-visible rings
- [2026-04-17] Webpack NTFS cache fix (`config.cache = false` in dev)
- [2026-04-17] Projects section converted to 3s auto-advancing carousel with 3D flip case study

## Quality scores (2026-04-17)
| Metric        | Score  |
|--------------|--------|
| Performance  | 9/10   |
| Security     | 9.5/10 |
| Accessibility| 9/10   |
| SEO          | 9/10   |
| UX           | 9.5/10 |
| **Overall**  | **~9.2/10** |

## Open questions
- Should Atlas be connected to a real knowledge base update pipeline, or is the static JSON fine long-term?
