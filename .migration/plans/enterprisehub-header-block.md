# EnterpriseHub Header Block Plan

## Goal
Rebuild the site header to match the provided EnterpriseHub design: a full-width **black bar** with the **ENTERPRISE HUB** wordmark on the left, a centered navigation (About the Practice · Our Assets · Our People · Certifications) with a red underline on the active item, and a **Search pill** plus a circular **JD** avatar on the right.

## Design Reference (from the shared image)
- **Background:** solid black (`#000`), full-bleed, spanning the top of the page.
- **Left — Brand:** `ENTERPRISE HUB` in white, bold, uppercase, letter-spaced.
- **Center — Nav links:** `About the Practice`, `Our Assets`, `Our People`, `Certifications` in light gray/white, evenly spaced. Active link (`About the Practice`) is white with a **red (#e8442a-ish) underline** beneath it.
- **Right — Tools:**
  - A rounded **Search pill** (thin light border, transparent fill, placeholder-style "Search" label).
  - A circular **avatar** with initials `JD` (white ring outline, transparent center).
- **Type:** sans-serif (inherits site font), links ~15px, brand slightly larger.

## Approach
This is the standard AEM boilerplate header pattern:
1. **Content** lives in `content/nav.plain.html` (the nav fragment): three top-level `<div>`s become `nav-brand`, `nav-sections`, `nav-tools`.
2. **Behavior** is `blocks/header/header.js` (hamburger + section toggles) — keep as-is; it already handles responsive/mobile.
3. **Styling** is `blocks/header/header.css` — this is where the dark theme + layout changes happen.

## Checklist
- [ ] Read current `blocks/header/header.js` and `blocks/header/header.css` in full to confirm class hooks (`.nav-brand`, `.nav-sections`, `.nav-tools`, `.nav-hamburger`).
- [ ] Update `content/nav.plain.html`:
  - [ ] Brand block → `ENTERPRISE HUB` (link to `/`).
  - [ ] Sections block → list: About the Practice, Our Assets, Our People, Certifications.
  - [ ] Tools block → Search entry (`:search:` or a search link) + avatar/account entry (`JD`).
- [ ] Restyle `blocks/header/header.css`:
  - [ ] Black background bar, white text, full-width layout with left/center/right zones (grid or flex with spacers).
  - [ ] Brand: bold, uppercase, letter-spacing.
  - [ ] Nav links: light color, hover state; active item white with **red underline**.
  - [ ] Search rendered as a rounded outlined pill.
  - [ ] Avatar as a circular outlined badge showing initials.
  - [ ] Mobile: keep hamburger behavior; stack nav/tools in the drawer (mobile-first, `min-width` 600/900 breakpoints).
- [ ] Preview `index.html` locally, verify the header renders (structure via snapshot, colors via computed-style checks), iterate on spacing/color to match the image.
- [ ] Run `npm run lint` and fix any CSS/JS lint issues.

## Decisions / Assumptions (adjust if needed)
- Active nav item is hardcoded via the current page path (e.g., `aria-current`) rather than authored per-link.
- The `JD` avatar is a static placeholder (no auth/account integration) unless you want it wired to something.
- Nav links point to placeholder paths (`/about`, `/our-assets`, `/our-people`, `/certifications`) until those pages exist.

## Open Question
- Should the **Search pill** open a working search overlay/box, or is it a visual placeholder for now? (Will confirm before wiring interactivity.)

---
*Execution requires switching to Execute mode — this plan makes no file changes yet.*
