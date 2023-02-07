const API_KEY = '32468715-2ee7d1cef437ed65ce73ff92a';
const BASE_URL = 'https://pixabay.com/api/';

const params = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

/**
 *
 * @param {String} query - userInput
 * @param {Number} page - requested page
 * @param {Number} perPage - number of requested objects
 * @returns array of objects or error message
 */
export default async function fetchPixabay(query, page, perPage) {
  try {
    const responce = await fetch(
      `${BASE_URL}?q=${query}&page=${page}&per_page=${perPage}&${params}`
    );
    return await responce.json();
  } catch (error) {
    return console.log('error :>> ', error);
  }
}
