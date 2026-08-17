/**
 * Category accordion — full-width colored category rows that expand/collapse.
 *
 * Authoring contract: each block row is one category, with four cells:
 *   | heading | description | color | panel |
 *   - heading:     the category title (e.g. "about the practice")
 *   - description: one line of supporting text (rendered italic)
 *   - color:       a CSS color for the expanded banner (hex or keyword)
 *   - panel:       the expanded content. The first link becomes the white pill
 *                  button; the last link becomes the "explore →" link.
 *
 * The first category starts expanded; the rest start collapsed.
 * Toggling is keyboard accessible via a real <button> header.
 *
 * @param {Element} block The category-accordion block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row, index) => {
    const cells = [...row.children];
    const headingText = cells[0] ? cells[0].textContent.trim() : '';
    const descText = cells[1] ? cells[1].textContent.trim() : '';
    const color = cells[2] ? cells[2].textContent.trim() : '';
    const panelSource = cells[3];

    const item = document.createElement('div');
    item.className = 'category-accordion-item';
    const expanded = index === 0;

    // --- header (clickable) ---
    const header = document.createElement('button');
    header.type = 'button';
    header.className = 'category-accordion-header';
    header.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    const panelId = `category-panel-${index}`;
    header.setAttribute('aria-controls', panelId);
    header.innerHTML = `
      <span class="category-accordion-heading">${headingText}</span>
      <span class="category-accordion-desc">${descText}</span>
      <span class="category-accordion-toggle" aria-hidden="true"></span>`;

    // --- panel ---
    const panel = document.createElement('div');
    panel.className = 'category-accordion-panel';
    panel.id = panelId;
    if (color) panel.style.setProperty('--category-color', color);
    if (!expanded) panel.hidden = true;

    const banner = document.createElement('div');
    banner.className = 'category-accordion-banner';

    // move authored links into the banner, tagging first/last
    const links = panelSource ? [...panelSource.querySelectorAll('a[href]')] : [];
    if (links[0]) links[0].classList.add('category-accordion-button');
    if (links.length > 1) links[links.length - 1].classList.add('category-accordion-explore');

    const graphic = document.createElement('span');
    graphic.className = 'category-accordion-graphic';
    graphic.setAttribute('aria-hidden', 'true');

    if (links[0]) banner.append(links[0]);
    banner.append(graphic);
    if (links.length > 1) banner.append(links[links.length - 1]);

    panel.append(banner);

    header.addEventListener('click', () => {
      const isOpen = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      panel.hidden = isOpen;
    });

    item.append(header, panel);
    row.replaceWith(item);
  });
}
