import axios from 'axios';

export async function getImagesByQuery(query, page) {
  const res = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '44405455-dc304595c2bd7cb59ead2c04f',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 10,
      page: page,
    },
  });
  console.log(res.data.hits);
  return res.data;
}
