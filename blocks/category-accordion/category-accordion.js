/**
 * Category accordion — category rows that expand into a grid of sub-items.
 *
 * Authoring contract: each block row is one category, with five cells:
 *   | badge | heading | description | color | sub-items |
 *   - badge:       an image used as the circular category icon (optional).
 *   - heading:     the category title (e.g. "About The Practice").
 *   - description: one supporting line.
 *   - color:       an accent color (hex/keyword) that tints the badge fill,
 *                  the open toggle, and the sub-item icon rings.
 *   - sub-items:   a list (<ul>); each <li> holds an icon image and a link.
 *                  The link text is the label (wraps to two lines via CSS —
 *                  authors write plain text, no <br>). Each sub-item links to
 *                  the link's href.
 *
 * The first category starts expanded; the rest start collapsed.
 * Toggling is keyboard accessible via a real <button> header.
 *
 * @param {Element} block The category-accordion block element
 */

/**
 * Prepares an authored image for use inside a circular container: returns the
 * picture (or img) and strips the intrinsic width/height attributes so CSS
 * `object-fit: cover` can crop it responsively regardless of the source size.
 * @param {Element} imgOrPicture an <img> or <picture> element
 * @returns {Element} the element to insert
 */
function prepareCircleImage(imgOrPicture) {
  const el = imgOrPicture.closest('picture') || imgOrPicture;
  el.querySelectorAll('img').forEach((img) => {
    img.removeAttribute('width');
    img.removeAttribute('height');
  });
  return el;
}

export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row, index) => {
    const cells = [...row.children];
    const badgeCell = cells[0];
    const headingText = cells[1] ? cells[1].textContent.trim() : '';
    const descText = cells[2] ? cells[2].textContent.trim() : '';
    const color = cells[3] ? cells[3].textContent.trim() : '';
    const subItemsCell = cells[4];

    const item = document.createElement('div');
    item.className = 'category-accordion-item';
    if (color) item.style.setProperty('--category-color', color);
    const expanded = index === 0;

    // --- header (clickable) ---
    const header = document.createElement('button');
    header.type = 'button';
    header.className = 'category-accordion-header';
    header.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    const panelId = `category-panel-${index}`;
    header.setAttribute('aria-controls', panelId);

    // badge (authored image), falls back to a color-only circle
    const badge = document.createElement('span');
    badge.className = 'category-accordion-badge';
    badge.setAttribute('aria-hidden', 'true');
    const badgeImg = badgeCell ? badgeCell.querySelector('picture, img') : null;
    if (badgeImg) badge.append(prepareCircleImage(badgeImg));

    const heading = document.createElement('span');
    heading.className = 'category-accordion-heading';
    heading.textContent = headingText;

    const desc = document.createElement('span');
    desc.className = 'category-accordion-desc';
    desc.textContent = descText;

    const toggle = document.createElement('span');
    toggle.className = 'category-accordion-toggle';
    toggle.setAttribute('aria-hidden', 'true');

    header.append(badge, heading, desc, toggle);

    // --- panel ---
    const panel = document.createElement('div');
    panel.className = 'category-accordion-panel';
    panel.id = panelId;
    if (!expanded) panel.hidden = true;

    // sub-item grid: each <li> → link wrapping (icon ring + label)
    const subItems = subItemsCell ? [...subItemsCell.querySelectorAll('li')] : [];
    if (subItems.length) {
      const grid = document.createElement('ul');
      grid.className = 'category-accordion-subitems';

      subItems.forEach((li) => {
        const link = li.querySelector('a[href]');
        const img = li.querySelector('picture, img');
        const label = link ? link.textContent.trim() : li.textContent.trim();
        const href = link ? link.getAttribute('href') : null;

        const gridItem = document.createElement('li');
        const anchor = document.createElement('a');
        if (href) anchor.href = href;
        anchor.className = 'category-accordion-subitem';

        const ring = document.createElement('span');
        ring.className = 'category-accordion-subicon';
        ring.setAttribute('aria-hidden', 'true');
        if (img) ring.append(prepareCircleImage(img));

        const labelEl = document.createElement('span');
        labelEl.className = 'category-accordion-sublabel';
        labelEl.textContent = label;

        anchor.append(ring, labelEl);
        gridItem.append(anchor);
        grid.append(gridItem);
      });

      panel.append(grid);
    }

    header.addEventListener('click', () => {
      const isOpen = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      panel.hidden = isOpen;
    });

    item.append(header, panel);
    row.replaceWith(item);
  });
}
