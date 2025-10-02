import iziToast from 'izitoast';
import { gallery, Lightbox, searchForm } from './main';

export function createGallery(images) {
  if (images.length === 0) {
    // iziToast.error({
    //   title: 'Error',
    //   position: 'topRight',
    //   message:
    //     'Sorry, there are no images matching your search query. Please try again!',
    // });
    searchForm.reset();
    return;
  } else {
    const markup = images
      .map(
        ({
          webformatURL,
          tags,
          largeImageURL,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<li class="photo-card">
        <a href="${largeImageURL}" class="gallery-link">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <ul class="info-list">
          <li class="info-item">
            <b>Likes</b>
            <p>${likes}</p>
          </li>
          <li class="info-item">
            <b>Views</b>
            <p>${views}</p>
          </li>
          <li class="info-item">
            <b>Comments</b>
            <p>${comments}</p>
          </li>
          <li class="info-item">
            <b>Downloads</b>
            <p>${downloads}</p>
          </li>
        </ul>`;
        }
      )
      .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    Lightbox.refresh();
  }
}
