## iid.sh

iid.sh is a personal umbrella site serving multiple subdomains from a single Next.js static export.

| Domain | Purpose |
|---|---|
| `iid.sh` | Portal homepage — links to Tools and Dotfiles |
| `tools.iid.sh` | Web tools collection (prompt manager, color palettes, diff viewer, etc.) |
| `dot.iid.sh` | Dotfiles landing page and one-line installer |

## Tech Stack

- Next.js (App Router, static export)
- TypeScript
- Tailwind CSS
- GitHub Pages / static hosting (deployment)

## Structure

- `app/` — routes and layouts
  - `app/page.tsx` — host-aware root (detects subdomain, renders portal / tools / dot)
  - `app/tools/page.tsx` — tools landing
  - `app/tools/[slug]/page.tsx` — tool detail pages (`/tools/prompt/`, etc.)
  - `app/[slug]/page.tsx` — root-level tool routes (`/prompt/`, for `tools.iid.sh/prompt`)
  - `app/dot/page.tsx` — dotfiles landing
- `components/` — shared UI (glass nav, tool cards, tool shells, landing sections)
- `components/tools/` — individual tool implementations
- `lib/tools.ts` — tool metadata and site config
- `lib/dotfiles.ts` — dotfiles metadata and feature list
- `public/install` — raw bash installer served at `/install`
- `.github/workflows/deploy-pages.yml` — Pages build/deploy pipeline

## Subdomain Routing

All subdomains serve the same static bundle. The root page (`/`) detects `window.location.hostname` at hydration time and renders the appropriate content:

- `tools.iid.sh` → Tools landing with root-level tool links
- `dot.iid.sh` → Dotfiles landing with install CTA
- anything else → Portal homepage

Path-based routes (`/tools/`, `/dot/`, `/tools/<slug>/`) work on any domain as fallbacks.

## Commands

- `npm run dev` — start dev server
- `npm run build` — build static export to `out/`
- `npm start` — start production server (for local testing)

## Deployment

Push to `main` to trigger GitHub Pages deployment via the workflow. DNS for `iid.sh`, `tools.iid.sh`, and `dot.iid.sh` should all point to the same static origin.
