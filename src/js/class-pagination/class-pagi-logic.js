import fetchPixabay from '../partials/fetch-pixabay';
import markupGallery from '../partials/markup-gallery';

let userInput = '';
const perPage = 12;
const gallery2 = document.querySelector('.js-gallery2');
const searchForm = document.querySelector('.js-form');

searchForm.addEventListener('submit', onFormSubmit);

// ===== Simple-pagination usage ====================================

import {
  updatePagination,
  getCurrentPage,
  paginationRef2,
} from './class-pagination';

let totalPages;
let currentPage = 1;
paginationRef2.addEventListener('click', onPaginationButtonClick);

updateGallery();

async function updateGallery() {
  await updateMarkup();
  updatePagination(currentPage, totalPages);
}

async function onPaginationButtonClick(event) {
  const targetPage = getCurrentPage(event);
  if (currentPage === targetPage) return;
  currentPage = targetPage;
  await updateGallery();
}

// ==================================================================

async function onFormSubmit(event) {
  event.preventDefault();
  userInput = event.currentTarget.elements.searchQuery.value.trim();
  currentPage = 1;
  await updateGallery();
  searchForm.reset();
}

async function updateMarkup() {
  try {
    const data = await fetchPixabay(userInput, currentPage, perPage);
    if (!data.hits.length) return;

    const { hits, totalHits } = data;
    totalPages = Math.ceil(totalHits / perPage);

    gallery2.innerHTML = '';
    markupGallery(hits, gallery2);
  } catch (error) {
    console.log('error :>> ', error);
  }
}
