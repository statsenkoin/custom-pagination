import {
  updatePagination,
  getCurrentPage,
  paginationRef,
} from './simple-pagination';
import fetchPixabay from '../partials/fetch-pixabay';

let totalPages = 100;
let currentPage = 1;
paginationRef.addEventListener('click', onPaginationButtonClick);

updatePagination(currentPage, totalPages);

async function onPaginationButtonClick(event) {
  currentPage = getCurrentPage(event);
  //   updatePagination(currentPage, totalPages);
  await updateMarkup();
}

let userInput = '';
const perPage = 10;
async function updateMarkup() {
  try {
    const data = await fetchPixabay(userInput, currentPage, perPage);
    if (!data.hits.length) return;

    const { hits, totalHits } = data;
    totalPages = Math.ceil(totalHits / perPage);

    // if (currentPage === 1) {
    //   gallery.innerHTML = '';
    // }

    // markupGallery(hits, gallery);
    updatePagination(currentPage, totalPages);

    currentPage += 1;
  } catch (error) {
    console.log('error :>> ', error);
  }
}
