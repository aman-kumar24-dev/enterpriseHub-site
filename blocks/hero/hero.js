/**
 * EnterpriseHub search hero.
 *
 * Authoring contract (block rows, top to bottom):
 *   1. Intro    — heading (h1) + one or more paragraphs of supporting text.
 *   2. Search   — a paragraph with the input placeholder text, followed by a
 *                 link whose text is the submit button label and whose href is
 *                 the search destination (e.g. "[Search](/search)").
 *   3. Links    — an unordered list of quick links.
 *
 * Rows 2 and 3 are optional; the block degrades gracefully when they are omitted.
 *
 * Variant `image` (authored as "Hero (image)"): the author adds a picture in
 * its own row. It is lifted out and rendered as a full-bleed background behind
 * the content, with a dark overlay so the white text stays legible.
 *
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  // Background image (image variant): move the first authored picture behind the content
  const picture = block.querySelector('picture');
  if (picture) {
    // remove the top-level row that contains the picture
    const pictureRow = [...block.children].find((row) => row.contains(picture));
    if (pictureRow) pictureRow.remove();

    const bg = document.createElement('div');
    bg.className = 'hero-bg';
    bg.setAttribute('aria-hidden', 'true');
    bg.append(picture);
    block.prepend(bg);
    block.classList.add('hero-has-image');
  }

  // content rows are everything except the background layer
  const rows = [...block.children].filter((el) => !el.classList.contains('hero-bg'));

  // 1. Intro
  const intro = rows[0];
  if (intro) intro.className = 'hero-intro';

  // 2. Search — build an accessible search form from the authored placeholder + link
  const searchRow = rows[1];
  if (searchRow) {
    const placeholderEl = searchRow.querySelector('p:not(:has(a))');
    const actionLink = searchRow.querySelector('a[href]');
    const placeholder = placeholderEl ? placeholderEl.textContent.trim() : 'Search';
    const buttonLabel = actionLink ? actionLink.textContent.trim() : 'Search';
    const action = actionLink ? actionLink.getAttribute('href') : '/search';

    const form = document.createElement('form');
    form.className = 'hero-search';
    form.setAttribute('role', 'search');
    form.action = action;
    form.method = 'get';
    form.innerHTML = `
      <input type="search" name="q" aria-label="${placeholder}" placeholder="${placeholder}">
      <button type="submit">${buttonLabel}</button>`;

    searchRow.className = 'hero-search-row';
    searchRow.replaceChildren(form);
  }

  // 3. Quick links
  const linksRow = rows[2];
  if (linksRow) {
    linksRow.className = 'hero-links';
  }
}
