# iid.sh

iid.sh is the landing site for the IID product matrix: Shea, Shft, Shap, Shil, Shyr, Shox, plus hosted tools and dotfiles.

## Quick Start

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

```sh
npm run dev     # local development
npm run build   # static export
npm start       # local production server
npm run verify:ui  # Playwright UI smoke check; run while dev server is active
```

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Motion, Lucide icons, and Playwright for UI checks.

See `UI.md` for the design system.
