# UI.md

## Purpose

This document is the design source of truth for iid.sh. The site is a landing page for the IID product matrix, not a chat app, dashboard, or input-first tool. The first screen should communicate the brand, slogan, and ecosystem shape immediately.

## Digital Assets

Keep project-bound visual assets under `public/`.

| Asset | Path | Usage | Notes |
| --- | --- | --- | --- |
| Product matrix hero | `public/images/iid-matrix-hero.png` | Homepage hero visual | Bright raster image showing connected product surfaces. Keep it text-free and aligned with the neutral IID style. |
| Dotfiles installer | `public/install` | Raw install endpoint | Served directly for `dot.iid.sh/install`. Do not treat it as a design asset. |

Generated or verification-only files must stay out of version control. `tmp/` is ignored and is used by `npm run verify:ui` for screenshots and JSON results.

## Brand Position

iid.sh should feel like a precise product ecosystem:

- Human-centered AI products.
- Coherent interface, runtime, apps, tools, and vertical agents.
- Quiet, technical, premium, and useful.
- Landing-page-first, with no faux chat prompt or "what can I help with" entry pattern.

The homepage slogan is:

```text
We begin with imagination, build intelligence, and design for humans.
```

## Color System

Use the CSS tokens in `app/globals.css`. Do not introduce page-local color systems unless they become new tokens here.

| Token | Value | Usage |
| --- | --- | --- |
| `--bg` | `#f7f7f7` | Page background |
| `--bg-elevated` | `#ffffff` | Raised bands or static white areas |
| `--text` | `#111111` | Primary text and icons |
| `--text-secondary` | `rgba(17, 17, 17, 0.66)` | Body copy and secondary nav |
| `--text-tertiary` | `rgba(17, 17, 17, 0.46)` | Eyebrows and low-priority metadata |
| `--surface` | `rgba(255, 255, 255, 0.78)` | Translucent compact surfaces |
| `--surface-solid` | `#ffffff` | Cards and main components |
| `--surface-hover` | `rgba(255, 255, 255, 0.96)` | Hover surface |
| `--surface-border` | `rgba(17, 17, 17, 0.1)` | Glass borders |
| `--hairline` | `rgba(17, 17, 17, 0.12)` | Dividers and card borders |
| `--accent` | `#111111` | Primary action background and focus |
| `--accent-hover` | `#2c2c2c` | Primary action hover |
| `--accent-contrast` | `#ffffff` | Text on accent |
| `--success` | `#2f6f4e` | Positive status only |
| `--warning` | `#8a6f2a` | Warning or pending status only |

Product accent colors live in `lib/products.ts` and are used only for product-card icon tiles:

| Product | Accent |
| --- | --- |
| Shea | `#dfe7ff` |
| Shft | `#def2ea` |
| Shap | `#f4e6ce` |
| Shil | `#e8e2f3` |
| Shyr | `#d8ecef` |
| Shox | `#f1ded8` |

## Typography

Font stack:

- Sans: `ui-sans-serif`, system UI, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `Helvetica`, `Arial`.
- Mono: `ui-monospace`, `SFMono-Regular`, `Menlo`, `Monaco`, `Consolas`, `Liberation Mono`, `Courier New`.

Do not use negative letter spacing. Do not scale type with viewport width formulas. Use breakpoint-defined sizes.

| Role | Mobile | Desktop | Weight | Line height | Usage |
| --- | --- | --- | --- | --- | --- |
| Brand hero | `58px` | `88px`, `118px` at large | 600 | 1 | `iid.sh` first-screen title |
| Hero slogan | `31px` | `48px`, `56px` at large | 500 | 1.08 | Homepage slogan |
| Page hero | `56px` | `92px` | 600 | 1 | Tools and Dotfiles page title |
| Section title | `42px` | `64px` | 600 | 1.05 | Major homepage sections |
| Subpage section title | `36px` | `52px` | 600 | tight | Tools/Dotfiles subsections |
| Card title | `24px` | `28px` | 600 | tight | Product cards |
| Tool card title | `22px` | `22px` | 600 | tight | Tool grid cards |
| Body large | `18px` | `20px` | 400 | 1.55 | Homepage supporting copy |
| Body | `15px` | `15px` | 400 | 1.55 | Card copy |
| Meta/nav | `12px`-`14px` | `12px`-`14px` | 500-600 | 1-1.45 | Nav, eyebrow, status |

## Layout

Use full-width horizontal bands with constrained inner content.

- Outer horizontal padding: `20px` mobile, `32px` from `md`.
- Max content width: `1280px` for homepage and nav, `1200px` for tools/dot landing, `1080px` for tool detail shells.
- Major vertical rhythm: `48px` mobile sections, `80px` desktop sections.
- Product and tool card grids: `gap-3`, one column mobile, two columns at `md`, three columns at `xl`.
- Do not nest cards inside cards.
- Keep mobile single-column first. Add `min-w-0` to grid children that contain long text or media.

## Homepage Structure

The homepage must follow this order:

1. Header navigation.
2. Landing hero: eyebrow, `iid.sh`, slogan with bold IID initials, and ecosystem description.
3. Project summary cards: a short row/grid explaining the main project categories.
4. Product matrix cards.
5. Tools/Dotfiles support section.
6. Contact band.

Do not add an input field, prompt bar, fake command bar, chat composer, or "what can I help with" pattern to the hero.

## Components

### Navigation

- Height: `64px`.
- Background: translucent `--bg` mixed with white, bottom `--hairline` border, backdrop blur.
- Desktop links: `13px`, regular, black, `gap-7`.
- Desktop product and tools menus: one-column panels, `360px` wide, `8px` radius, thin dividers.
- Mobile nav: icon-only menu button, `40px` square, `8px` radius.
- Mobile menu lists product cards first, then Tools with Dotfiles and Color, then Contact.

### Product Cards

- Radius: `8px`.
- Border: `1px solid var(--hairline)`.
- Background: `--surface-solid`.
- Padding: `20px`.
- Minimum height: `310px` for matrix cards.
- Motion: fade/translate into view, then hover lift by `4px` for live cards.
- Live products render as anchors.
- Coming soon products render as non-clickable cards with a small status pill.

### Project Summary Cards

Use these for the homepage overview below the hero.

- One-column on mobile, three columns from `lg`.
- Radius `8px`, border `--hairline`, white surface.
- Title `22px`, body `15px`.
- Should describe ecosystem categories, not duplicate every product card.

### Tool Cards

- Radius: `8px`.
- Border: `--hairline`.
- Minimum height: `210px`.
- Header tile: `40px`, mono two-letter label.
- Footer row shows `Interactive` or `Planned`.

### Buttons And Links

- Primary action: black background, white text, `8px` radius, `14px` semibold, `12px` vertical padding.
- Secondary action: white background, hairline border, black text.
- Icon-only action: square, `40px`, `8px` radius.
- Use Lucide icons for arrows, menus, tools, product concepts, and utility actions.

### Tool Surfaces

Tool detail pages may use `.glass-subtle` for compact controls, editors, and result panels. Keep form controls at `8px` radius and use the project tokens.

## Motion

Motion should be restrained and purposeful.

- Hero text: fade up on load.
- Product cards: fade up on first viewport entry.
- Menus: quick opacity/translate animation.
- Hover: small lift or opacity change only.
- CSS must respect `prefers-reduced-motion`.

## Accessibility

- Use semantic sections and headings.
- Maintain visible focus rings through `focus-visible`.
- Do not rely on color alone for product status.
- Coming soon items must not be links.
- Ensure `npm run verify:ui` reports no horizontal overflow.

## Verification

Run these before handoff:

```sh
npm run build
npm run verify:ui
```

Manual visual checks:

- Homepage has no input-like hero entry point.
- Mobile homepage has no horizontal scroll.
- Product menu opens on desktop and mobile.
- Shea, Shft, Shap, Shyr link out.
- Shil and Shox show coming soon and do not link.
- Tools shows Dotfiles, Color, and a restrained `More coming soon...` note.
- Dotfiles routes still render.
