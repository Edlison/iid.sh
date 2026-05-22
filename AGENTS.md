# AGENTS.md

## Project

iid.sh is a static Next.js App Router site for the IID product ecosystem. The apex site presents the product matrix from the IID whitepaper, while `tools.iid.sh` and `dot.iid.sh` are served from the same static bundle through client-side host detection.

## Product Narrative

The homepage slogan is:

```text
We begin with Imagination, build Intelligence, and Design for humans.
```

The product matrix is the primary content model:

- Shea: all-in-one AI entry for agents, sessions, tools, TUI, and WebUI.
- Shft: AI hub and connector layer for models, providers, MCP, A2A, and external tools.
- Shap: app platform for focused apps, tools, MCPs, and plugins.
- Shil: paper research agent, shown as coming soon with no outbound link.
- Shyr: finance intelligence agent.
- Shox: extreme CS2 server infrastructure, shown as coming soon with no outbound link.

Product metadata lives in `lib/products.ts`. Keep links, status, copy, and card accents there instead of scattering product facts across components.

## Design Direction

`UI.md` is the design source of truth. Keep implementation and documentation aligned with that file before handoff.

The current UI uses OpenAI-like restraint: neutral black and white, very large direct type, thin borders, dense product/news-like grids, and minimal navigation. It should feel like a product system rather than a personal link list. The homepage is a landing page and must not use a fake chat/input prompt pattern.

Core rules:

- Use a restrained neutral palette: `#111111`, `#ffffff`, `#f7f7f7`, and thin `--hairline` borders.
- Keep card radius at `8px` or below. Pills are allowed only for small status chips.
- Use `lucide-react` icons for UI affordances and product symbols.
- Use `motion/react` only for meaningful entrance/menu/card motion. Respect `prefers-reduced-motion` in CSS.
- Do not add decorative gradient blobs, bokeh, or unrelated illustration systems.
- Prefer full-width bands with constrained inner content. Do not nest cards inside cards.
- Keep typography responsive through breakpoints, not viewport-scaled font formulas.
- Do not add an input field, prompt bar, fake command bar, chat composer, or "what can I help with" pattern to the hero.

## Routes

- `app/page.tsx`: host-aware root wrapper.
- `components/root-page.tsx`: switches the root page between apex, tools, and dotfiles after hydration.
- `components/portal-home.tsx`: apex landing page.
- `components/glass-nav.tsx`: global navigation with product matrix menu.
- `app/product/page.tsx`: product matrix page.
- `app/contact/page.tsx`: contact page.
- `app/tools/page.tsx`: tools landing.
- `app/tools/[slug]/page.tsx`: path-based tool detail pages.
- `app/[slug]/page.tsx`: root-level tool detail pages for `tools.iid.sh/<slug>/`.
- `app/dot/page.tsx`: dotfiles landing.

## Static Export And Subdomains

`next.config.ts` uses `output: "export"` and `trailingSlash: true`. Do not add middleware, API routes, server actions, or runtime rewrites unless the deployment model changes.

The config also sets `turbopack.root` to this repository directory. Keep that setting because this machine has another lockfile above the repo, and Next 16 otherwise resolves PostCSS modules from the wrong root.

All subdomains serve the same static output:

- `iid.sh`: apex product matrix.
- `tools.iid.sh`: tools landing at `/`, plus root-level tool routes.
- `dot.iid.sh`: dotfiles landing at `/`; install script is served from `iid.sh/tools/dot/install`.

`app/layout.tsx` includes a small pre-hydration metadata script so root title and description are adjusted for `tools.` and `dot.` hosts before React hydrates.

## Data Sources

- `lib/products.ts`: product matrix, status, copy, accent colors, outbound URLs.
- `lib/tools.ts`: tools registry and site-level config.
- `lib/dotfiles.ts`: dotfiles copy, install command, and feature list.
- `UI.md`: UI system, typography, color, layout, components, and verification rules.
- `public/tools/dot/install`: raw dotfiles installer.
- `public/images/iid-matrix-hero.png`: generated raster hero asset for the product matrix.

## Components

Keep page components focused on layout and interaction. Keep registry data in `lib/`.

Use client components only when needed:

- `components/portal-home.tsx`: client component because it uses Motion.
- `components/glass-nav.tsx`: client component because it manages menus and host-aware nav state.
- tools under `components/tools/`: client components when they use browser state or storage.

## Styling

Global tokens and utilities live in `app/globals.css`.

- `.glass`, `.glass-subtle`, and `.glass-lift` remain available for tool surfaces and compact controls.
- The new apex UI should mostly use plain white surfaces, borders, and shadows.
- Avoid negative letter spacing.
- Avoid `clamp()` for type sizing; use breakpoint-specific text sizes.
- Keep labels and buttons short enough to fit on mobile.

## Tools

The tools registry currently includes prompt, color, pastebin, TinyURL, diff, image upload, and status.

Some tools are interactive entirely in the browser. Others are explicit coming-soon surfaces because they need a backend. Preserve existing slugs unless a redirect plan is added.

## Commands

```sh
npm install
npm run dev
npm run build
npm start
npm run verify:ui
```

There is no lint script yet. Use `npm run build` as the primary compile gate and `npm run verify:ui` for browser-level layout checks. `npm run verify:ui` expects a running site and uses `IID_SITE_URL` or `http://127.0.0.1:3000`.

## Verification Checklist

Before handing off UI work:

- Run `npm run build`.
- Start the local dev server.
- Run `npm run verify:ui`.
- Inspect `http://localhost:3000/` at desktop and mobile widths.
- Confirm the homepage hero is slogan-first and has no input-like entry point.
- Confirm the product menu opens on desktop and mobile.
- Confirm Shea, Shft, and Shap are links.
- Confirm Shil, Shyr, and Shox show coming soon and are not links.
- Confirm tools and dotfiles routes still render.
- Confirm there is no horizontal overflow, overlapping text, blank hero image, hydration error, or console runtime error.
