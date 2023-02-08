export default class Pagination {
  #pagiArray; //output
  #media;
  #length; //pagiLength
  #ref; // paginationRef2
  #targetPage;
  #currentPage = 1;
  #totalPages = 1;

  constructor() {
    this.#ref = document.querySelector('.js-pagination2');
    this.#media = window.matchMedia('(min-width: 600px)');
    this.#length = this.#media.matches ? 9 : 5;
    this.#media.addEventListener('change', event => {
      this.#length = event.matches ? 9 : 5;
      this.update(this.#currentPage, this.#totalPages);
    });
  }

  get currentPage() {
    return this.#currentPage;
  }
  set currentPage(page) {
    this.#currentPage = page;
  }
  get totalPages() {
    return this.#totalPages;
  }
  set totalPages(pages) {
    this.#totalPages = pages;
  }

  get ref() {
    return this.#ref;
  }

  /**
   * Rerenders pagination line
   * @param {Number} page - the current active page
   * @param {Number} pages - the total number of pages
   */
  update(page, pages) {
    this.#currentPage = page;
    this.#totalPages = pages;
    this.#pagiArray = this.#paginate();
    this.markup(this.#pagiArray, this.#ref);
  }

  /**
   * Finds out correct target page
   * @param {event} event click on button element
   * @returns currentPage
   */
  getCurrentPage(event) {
    if (event.target.nodeName !== 'BUTTON') return this.#currentPage;
    const targetPageText = event.target.textContent;

    if (!isNaN(Number(targetPageText)))
      this.#targetPage = Number(targetPageText);
    if (targetPageText === '>' && this.#currentPage === this.#totalPages)
      return this.#totalPages;
    if (targetPageText === '>') this.#targetPage = this.#currentPage + 1;
    if (targetPageText === '<' && this.#currentPage === 1) return 1;
    if (targetPageText === '<') this.#targetPage = this.#currentPage - 1;
    if (targetPageText === ' ...')
      this.#targetPage = this.#currentPage - (this.#length - 4);
    if (targetPageText === '... ')
      this.#targetPage = this.#currentPage + (this.#length - 4);
    if (this.#targetPage === this.#currentPage) return this.#currentPage;
    this.#currentPage = this.#targetPage;
    return this.#currentPage;
  }

  /**
   * Form an array of chars to be displayed on pagination buttons
   * @param {Number} currentPage - the current active page
   * @param {Number} totalPages - the total number of pages
   * @returns {Array} of text content for buttons in pagination line
   */
  #paginate() {
    const output = [];
    let startPage;
    let endPage;
    const offsetPages = Math.floor(this.#length / 2);
    if (this.#currentPage < 1) {
      this.#currentPage = 1;
    } else if (this.#currentPage > this.#totalPages) {
      this.#currentPage = this.#totalPages;
    }
    if (this.#totalPages <= this.#length) {
      startPage = 1;
      endPage = this.#totalPages;
    } else {
      if (this.#currentPage <= offsetPages) {
        startPage = 1;
        endPage = this.#length;
      } else if (this.#currentPage + offsetPages >= this.#totalPages) {
        startPage = this.#totalPages - offsetPages * 2;
        endPage = this.#totalPages;
      } else {
        startPage = this.#currentPage - offsetPages;
        endPage = this.#currentPage + offsetPages;
      }
    }
    for (let i = startPage; i <= endPage; i += 1) {
      output.push(i);
    }
    if (this.#length === 9) {
      output.splice(0, 1, 1);
      output.splice(output.length - 1, 1, this.#totalPages);
      if (
        this.#currentPage - 1 > offsetPages &&
        this.#totalPages > this.#length
      ) {
        output.splice(1, 1, ' ...');
      }
      if (
        this.#currentPage + 1 + offsetPages < this.#totalPages &&
        this.#totalPages > this.#length
      )
        output.splice(output.length - 2, 1, '... ');
    }
    return output;
  }

  /**
   * Marks up pagination line
   * @param {Array} output (= this.#pagiArray) - text content for buttons in pagination line output
   * @param {DOM element} paginationRef2 (= this.#ref) - where to put pagination line
   */
  markup(output, paginationRef2) {
    let markup = output.reduce((acc, item) => {
      const pagiClass =
        item === this.#currentPage
          ? 'class="pagination-button pagination-button-current"'
          : 'class="pagination-button"';
      return (acc += `<button type="button" ${pagiClass}>${item}</button>`);
    }, ``);
    if (this.#totalPages > this.#length && this.#currentPage !== 1) {
      markup =
        `<button type="button" class="pagination-button">&lt;</button>` +
        markup;
    }
    if (
      this.#totalPages > this.#length &&
      this.#currentPage !== this.#totalPages
    ) {
      markup += `<button type="button" class="pagination-button">&gt;</button>`;
    }
    paginationRef2.innerHTML = '';
    paginationRef2.insertAdjacentHTML('beforeend', markup);
  }
}
