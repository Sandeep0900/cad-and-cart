import axios from 'axios';

export const getAllProducts = () => {
  return axios.get('https://dummyjson.com/products');
};
