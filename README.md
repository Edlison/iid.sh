## iid.sh

iid.sh is a small collection of single-purpose web tools, each independently useful but consistently designed with a minimal UI for fast workflows and easy sharing.

## Tech Stack

- HTML + CSS + vanilla JavaScript
- Vite (dev server, HMR, build)
- GitHub Pages (deployment)

## Structure

- `index.html` — main page markup
- `assets/site.css` — global styles and layout
- `assets/main.js` — page behavior and tool list rendering
- `assets/config.js` — site config and tools metadata
- `.github/workflows/deploy-pages.yml` — Pages build/deploy pipeline

## Vite Commands

- `npm run dev` — start dev server with HMR
- `npm run build` — build to `dist`
- `npm run preview` — preview the production build

## Deployment

Push to `main` to trigger GitHub Pages deployment via the workflow.
