/**
 * Resourse:
 * https://jasonwatmore.com/post/2018/08/07/javascript-pure-pagination-logic-in-vanilla-js-typescript
 */

export const paginationRef2 = document.querySelector('.js-pagination2');

let output;
let targetPage;
let currentPage = 1;
let totalPages;

// Catches layout orientation changes (600px - to be suitable for old (8.34%) tablets)
let media = window.matchMedia('(min-width: 600px)');
// Maximum number of page navigation links to display (does NOT include arrows)
let pagiLength = media.matches ? 9 : 5;

media.addEventListener('change', event => {
  pagiLength = event.matches ? 9 : 5;
  updatePagination(currentPage, totalPages);
});

/**
 * Rerenders pagination line
 * @param {Number} page - the current active page
 * @param {Number} pages - the total number of pages
 */
export function updatePagination(page, pages) {
  currentPage = page;
  totalPages = pages;
  output = paginate(currentPage, totalPages);
  markupPagination(output, paginationRef2);
}

/**
 * Finds out correct target page
 * @param {event} event click on button element
 * @returns currentPage
 */
export function getCurrentPage(event) {
  if (event.target.nodeName !== 'BUTTON') return currentPage;
  const targetPageText = event.target.textContent;

  if (!isNaN(Number(targetPageText))) targetPage = Number(targetPageText);
  if (targetPageText === '>' && currentPage === totalPages) return totalPages;
  if (targetPageText === '>') targetPage = currentPage + 1;
  if (targetPageText === '<' && currentPage === 1) return 1;
  if (targetPageText === '<') targetPage = currentPage - 1;
  if (targetPageText === ' ...') targetPage = currentPage - (pagiLength - 4);
  if (targetPageText === '... ') targetPage = currentPage + (pagiLength - 4);
  if (targetPage === currentPage) return currentPage;
  currentPage = targetPage;
  return currentPage;
}

/**
 * Form an array of chars to be displayed on pagination buttons
 * @param {Number} currentPage - the current active page
 * @param {Number} totalPages - the total number of pages
 * @returns {Array} of text content for buttons in pagination line
 */
function paginate(currentPage, totalPages) {
  const output = [];
  let startPage;
  let endPage;
  const offsetPages = Math.floor(pagiLength / 2);
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  if (totalPages <= pagiLength) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= offsetPages) {
      startPage = 1;
      endPage = pagiLength;
    } else if (currentPage + offsetPages >= totalPages) {
      startPage = totalPages - offsetPages * 2;
      endPage = totalPages;
    } else {
      startPage = currentPage - offsetPages;
      endPage = currentPage + offsetPages;
    }
  }
  for (let i = startPage; i <= endPage; i += 1) {
    output.push(i);
  }
  if (pagiLength === 9) {
    output.splice(0, 1, 1);
    output.splice(output.length - 1, 1, totalPages);
    if (currentPage - 1 > offsetPages && totalPages > pagiLength) {
      output.splice(1, 1, ' ...');
    }
    if (currentPage + 1 + offsetPages < totalPages && totalPages > pagiLength)
      output.splice(output.length - 2, 1, '... ');
  }
  return output;
}

/**
 * Marks up pagination line
 * @param {Array} output - text content for buttons in pagination line output
 * @param {DOM element} paginationRef2 - where to put pagination line
 */
function markupPagination(output, paginationRef2) {
  let markup = output.reduce((acc, item) => {
    const pagiClass =
      item === currentPage
        ? 'class="pagination-button pagination-button-current"'
        : 'class="pagination-button"';
    return (acc += `<button type="button" ${pagiClass}>${item}</button>`);
  }, ``);
  if (totalPages > pagiLength && currentPage !== 1) {
    markup =
      `<button type="button" class="pagination-button">&lt;</button>` + markup;
  }
  if (totalPages > pagiLength && currentPage !== totalPages) {
    markup += `<button type="button" class="pagination-button">&gt;</button>`;
  }
  paginationRef2.innerHTML = '';
  paginationRef2.insertAdjacentHTML('beforeend', markup);
}
