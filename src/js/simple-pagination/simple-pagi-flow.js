import {
  updatePagination,
  getCurrentPage,
  paginationRef,
} from './simple-pagination';

let totalPages = 100;
let currentPage = 1;
paginationRef.addEventListener('click', onPaginationButtonClick);

updatePagination(currentPage, totalPages);

function onPaginationButtonClick(event) {
  currentPage = getCurrentPage(event);
  updatePagination(currentPage, totalPages);
  // await fetch('https://...&page=currentPage')
}
