# AGENT.md

## Project

Multi-subdomain static site built with Next.js App Router, TypeScript, and Tailwind CSS. Exports to `out/` for static hosting.

## Domains

- `iid.sh` — portal homepage
- `tools.iid.sh` — web tools (root-level access via `/<slug>/`)
- `dot.iid.sh` — dotfiles landing + raw installer at `/install`

## Key Patterns

- **Static export only** — no middleware, no API routes, no rewrites. All pages pre-rendered at build time.
- **Host-aware root with server wrapper** — `app/page.tsx` is a server route that exports generic umbrella metadata for `/` and renders `components/root-page.tsx` for the client-side host switch. The client component still server-renders `PortalHome` as the static fallback, then reads `window.location.hostname` on mount to switch `/` to the tools or dot landing when served from `tools.iid.sh` or `dot.iid.sh`.
- **Pre-hydration root metadata sync** — `app/layout.tsx` injects a small `beforeInteractive` script that updates the root page title and description from `window.location.hostname` before React hydration. This improves browser-visible metadata on `tools.iid.sh/` and `dot.iid.sh/`, but true host-specific server metadata is still impossible with a single shared static export.
- **Dual tool routes** — tools are accessible at both `/tools/<slug>/` (path-based) and `/<slug>/` (root-level for tools subdomain). Shared tool components live in `components/tools/`.
- **Props over context for link variants** — `ToolCard` accepts `rootPath` prop, `ToolShell` accepts `backHref` prop, avoiding global context for link targets. Tool detail pages should still send "Back to tools" links to `/tools/`, even for the root-level `/<slug>/` route variant.
- **Glass UI** — `.glass`, `.glass-subtle`, `.glass-lift` CSS classes in `globals.css`. Design tokens via CSS custom properties. Glass is reserved for the nav bar and specific interactive elements (e.g. code blocks); content sections use plain typography with divider-based separation instead of card wrappers.
- **Liquid glass action button** — `components/copy-button.tsx` adapts the `BTN003` snippet into a compact pill button with inline SVG distortion, pointer-reactive motion, and restrained highlight layers for clipboard actions.
- **Apple-style section layout** — Large left-aligned section titles (bold, clamp-scaled) followed by flowing content. List items separated by `divide-y divide-[var(--hairline)]` rather than individual glass cards. Hero sections are card-free with large display type + subtitle. Content width matches nav at `max-w-[980px]`.
- **Apple-style nav layout** — `GlassNav` sits outside the content `<main>`, uses a near-full-width glass bar (`mx-6`) sticky at `top-2`, and centers its inner row in `max-w-[980px]` with `px-6`. Main content uses a separate `max-w-[1080px]` container below it. The tools subdomain shares the same nav layout as the apex site: brand "iid.sh" linking back to the main site, with "Tools" and "Dotfiles" links on the right.

## Build

```sh
npm run build   # static export → out/
npm run dev     # dev server
```

## Data Sources

- `lib/tools.ts` — tool registry and site config (single source of truth for tool slugs)
- `lib/dotfiles.ts` — dotfiles metadata, install command, and feature list
- `public/install` — raw bash installer script (copied to `out/install`)
