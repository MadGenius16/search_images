import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImagesByQuery } from './pixabay-api';
import { createGallery } from './render-functions';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const Lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const gallery = document.querySelector('.gallery');
export const searchForm = document.querySelector('.form');
export const loadMoreBtn = document.querySelector('.load-more');

let query = null;
let page = 1;
const perPage = 10;

function showLoadMoreButton() {
  loadMoreBtn.classList.remove('visually-hidden');
}
function hideLoadMoreButton() {
  loadMoreBtn.classList.add('visually-hidden');
}

function myScroll() {
  const height = gallery.firstChild.getBoundingClientRect().height;

  scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  gallery.innerHTML = '';
  query = event.target.elements.searchQuery.value.trim();
  page = 1;
  if (query !== '') {
    try {
      const images = await getImagesByQuery(query, page);
      createGallery(images);
      if (images.length === perPage && images.length !== 0) {
        showLoadMoreButton();
      }
    } catch {
      // iziToast.error({
      //   message:
      //     'Sorry, there are no images matching your search query. Please try again!',
      //   color: 'red',
      //   position: 'topRight',
      // });
    }
  }

  event.target.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  const images = await getImagesByQuery(query, page);
  createGallery(images);
  if (images.length < perPage) {
    hideLoadMoreButton();
  }
  myScroll();
});
