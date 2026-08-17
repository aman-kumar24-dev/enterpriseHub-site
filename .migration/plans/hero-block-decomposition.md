# EnterpriseHub Homepage — Block Decomposition Plan

## Goal
Break the remaining EnterpriseHub homepage design (everything below the header) into reusable AEM Edge Delivery blocks, matching the shared mockup. The header is already done.

## Sections in the Design (top → bottom)
1. **Hero** — black band: "The practice, in one place.", subtext, a search input + Search button, and a row of quick links (Org chart · Brand kit · Get a voucher · New joiner guide).
2. **Stats row** — four big figures on white: 1,240 Practitioners · 18 Global Offices · 860 Active Certifications · 340+ Reusable Assets.
3. **Category accordions** — four full-width colored rows (About the Practice, Our Assets, Our People, Certifications), each with a lowercase heading, italic description, a **+ toggle that expands/collapses**, a white pill button, a decorative graphic, and a "… →" link.
4. **What's New** — "WHAT'S NEW" eyebrow + three cards, each with a black tag pill (Brand / Certifications / The Practice), a title, and a "2 days ago" timestamp.
5. **CTA band** — separate dark block: "Find what you need." + subtext + link row (Contact IT · Help center · Feedback · Governance).

## Confirmed Decisions
- **Category rows = interactive accordions** (the + expands/collapses an authored panel).
- **Bottom dark band = its own CTA block** above the footer (footer stays separate).

## Blocks to Build / Reuse
| Design section | Block | New or reuse |
|---|---|---|
| Hero | `hero` (currently empty JS) | Build out — search hero variant |
| Stats row | `stats` | New block |
| Category accordions | `category-accordion` | New block |
| What's New cards | `cards` (new `tags` variant) | Reuse `cards` + variant styling |
| CTA band | `cta` | New block |

## Approach (per AEM boilerplate conventions)
- Decide the **initial content structure** (authoring contract) for each new block first, then write `decorate()` + CSS.
- Mobile-first CSS, `min-width` breakpoints at 600/900/1200px, all selectors scoped to the block.
- Create test content as static HTML under `content/` (drafts) so I can preview each block locally.
- Verify each block's structure via snapshot and key styles via computed-style checks; screenshot only for final QA.

## Checklist

### 0. Prep
- [ ] Review empty `hero` block, `cards` block, and `widget` pattern to decide reuse vs. new.
- [ ] Confirm CSS design tokens needed (accent red `#e8442a`, category pastel colors, dark band color) and add any to `styles.css` if shared.

### 1. Hero block
- [ ] Define content model: heading, subtext, search field + button, quick-link list.
- [ ] Implement `blocks/hero/hero.js` decoration (search input group + quick links).
- [ ] Style `blocks/hero/hero.css`: black background, large heading, rounded search input with dark Search button, quick-link row.
- [ ] Add hero to test content and preview/verify.

### 2. Stats block
- [ ] Define content model: rows of `number` + `label`.
- [ ] Create `blocks/stats/stats.js` (render as a flex/grid of stat items).
- [ ] Style `blocks/stats/stats.css`: 4-up on desktop, stacked on mobile, big bold numbers + small uppercase labels, top/bottom hairline rules.
- [ ] Add to test content, preview/verify.

### 3. Category accordion block
- [ ] Define content model per row: heading, description, button label+link, "explore" link+text, optional color, expanded panel content.
- [ ] Create `blocks/category-accordion/category-accordion.js`: build rows, add **+ / − toggle** with `aria-expanded`, expand/collapse panel, keyboard accessible.
- [ ] Style `blocks/category-accordion/category-accordion.css`: colored banner rows, pill button, decorative graphic area, "→" link, animated expand.
- [ ] Add to test content (all four categories with their colors), preview/verify toggle behavior.

### 4. What's New (cards variant)
- [ ] Define content model: eyebrow heading + card rows (tag, title, timestamp).
- [ ] Add a `cards` variant (e.g. `cards (tags)`) — extend `cards.js`/`cards.css` only if needed; otherwise handle via CSS on the variant class.
- [ ] Style: black tag pills, card title, muted timestamp, 3-up grid.
- [ ] Add to test content, preview/verify.

### 5. CTA block
- [ ] Define content model: heading, subtext, link row.
- [ ] Create `blocks/cta/cta.js` (minimal — mostly structural) and `blocks/cta/cta.css`: dark band, white heading, muted links spread to the right.
- [ ] Add to test content, preview/verify.

### 6. Assemble & finalize
- [ ] Compose a full test homepage in `content/` using header + all new blocks + footer; preview end-to-end.
- [ ] Iterate spacing/colors against the mockup (computed-style checks; one screenshot for final QA).
- [ ] Run `npm run lint` and fix any JS/CSS issues.

## Open Questions / Assumptions
- Accordion panels will start **collapsed**; expanded content is authorable (placeholder text until real content exists).
- Category colors taken from the mockup: taupe, light blue-gray, warm tan, blush — will be set per-row via a color cell or section styling.
- Quick links, tags, and category graphics use text/CSS placeholders (no real icons/images yet) unless assets are provided.

---
*Plan is ready to execute. **Execution requires switching to Execute mode** — approve the plan to begin building the blocks.*
