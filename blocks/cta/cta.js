/**
 * CTA band — dark full-width call-to-action.
 *
 * Authoring contract (block rows):
 *   1. Text  — heading + supporting paragraph.
 *   2. Links — an unordered list (or paragraphs) of links shown to the right.
 *
 * @param {Element} block The cta block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  const textRow = rows[0];
  if (textRow) textRow.className = 'cta-text';

  const linksRow = rows[1];
  if (linksRow) linksRow.className = 'cta-links';
}
