import fetchPixabay from '../partials/fetch-pixabay';
import markupGallery from '../partials/markup-gallery';

let userInput = '';
const perPage = 12;
const gallery = document.querySelector('.js-gallery');

// ===== Simple-pagination usage ====================================

import {
  updatePagination,
  getCurrentPage,
  paginationRef,
} from './simple-pagination';

let totalPages = 100;
let currentPage = 1;
paginationRef.addEventListener('click', onPaginationButtonClick);

initGallery();

async function initGallery() {
  await updateMarkup();
  updatePagination(currentPage, totalPages);
}

async function onPaginationButtonClick(event) {
  const targetPage = getCurrentPage(event);
  if (currentPage === targetPage) return;
  currentPage = targetPage;
  updatePagination(currentPage, totalPages);
  await updateMarkup();
}

// ==================================================================

async function updateMarkup() {
  try {
    const data = await fetchPixabay(userInput, currentPage, perPage);
    if (!data.hits.length) return;

    const { hits, totalHits } = data;
    totalPages = Math.ceil(totalHits / perPage);

    gallery.innerHTML = '';
    markupGallery(hits, gallery);
  } catch (error) {
    console.log('error :>> ', error);
  }
}
