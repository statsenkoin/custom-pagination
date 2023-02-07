export default function markupGallery(hits, gallery) {
  let markup = hits.reduce((acc, { webformatURL, tags, id }) => {
    return (acc += ` <img 
          class="card-image" 
          id="${id}"
          src="${webformatURL}" 
          alt="${tags}" 
          loading="lazy"
        />`);
  }, '');
  gallery.insertAdjacentHTML('beforeend', markup);
}
