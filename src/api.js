import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
export const fetchImages = async (query, page) => {
  const KEY = '38144965-ad727792052d7b57e9a98ff41';
  const QUANTITY = 12;
  const response = await axios.get(
    `/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${QUANTITY}`
  );
  return response.data;
};
