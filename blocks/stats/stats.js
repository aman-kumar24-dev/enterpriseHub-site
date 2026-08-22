/**
 * Stats block — a row of headline figures.
 *
 * Authoring contract: each block row is one stat.
 *   | 1,240        |
 *   | Practitioners |
 * The first cell is the number, the second (or the next line) is the label.
 * A single-cell row is also supported (number on line 1, label on line 2).
 *
 * @param {Element} block The stats block element
 */
export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');

    const number = document.createElement('span');
    number.className = 'stats-number';
    const label = document.createElement('span');
    label.className = 'stats-label';

    if (cells.length > 1) {
      number.textContent = cells[0].textContent.trim();
      label.textContent = cells[1].textContent.trim();
    } else {
      // single cell: first line is number, remainder is label
      const lines = row.textContent.split('\n').map((t) => t.trim()).filter(Boolean);
      number.textContent = lines[0] || '';
      label.textContent = lines.slice(1).join(' ');
    }

    li.append(number, label);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
