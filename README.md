## iid.sh

iid.sh is a small collection of single-purpose web tools, each independently useful but consistently designed with a minimal liquid-glass UI for fast workflows and easy sharing.

## Tech Stack

- Next.js (App Router, static export)
- TypeScript
- Tailwind CSS
- GitHub Pages (deployment)

## Structure

- `app/` — routes and layouts (homepage, tool pages)
- `components/` — shared UI (glass nav, tool cards, tool shells)
- `components/tools/` — individual tool implementations
- `lib/tools.ts` — tool metadata (single source of truth)
- `.github/workflows/deploy-pages.yml` — Pages build/deploy pipeline

## Commands

- `npm run dev` — start dev server
- `npm run build` — build static export to `out/`
- `npm start` — start production server (for local testing)

## Deployment

Push to `main` to trigger GitHub Pages deployment via the workflow.
