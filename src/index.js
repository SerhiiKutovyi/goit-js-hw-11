import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');

const API_KEY = '32386885-8dbf1bc36075d10a6eaf5580b';
const BASE_URL = 'https://pixabay.com/api/';

formRef.addEventListener('submit', onClickSearch);

function onClickSearch(eve) {
  eve.preventDefault();

  const form = eve.target;
  const input = form.elements.searchQuery.value;

  fetchSearch(input)
    .then(users => renderSearch(users))
    .catch(error => {
      console.log(error);
    });
}

function fetchSearch(input) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true `
  )
    .then(response => {
      return response.json();
    })
    .then(resold => {
      return resold;
    })
    .catch(error => {
      console.log(error);
    });
}

function renderSearch({ hits }) {
  const markup = hits
    .map(ele => {
      return `<div class="photo-card">
    <img src="${ele.webformatURL}" alt="${ele.tags}" width="500px" height="400px" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b><span>${ele.likes}</span>
      </p>
      <p class="info-item">
        <b>Views:</b><span>${ele.views}</span>
      </p>
      <p class="info-item">
        <b>Comments:</b><span>${ele.comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads:</b><span>${ele.downloads}</span>
      </p>
    </div>
  </div>`;
    })
    .join('');
  galleryRef.insertAdjacentHTML('beforeend', markup);
}
