import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';

export const getAllProducts = () => axios.get(BASE_URL);
export const getProductById = (id) => axios.get(`${BASE_URL}/{id}`);
export const searchProducts = (query) =>
  axios.get(`${BASE_URL}/search?q=${query}`);
export const getProductsByCategory = (category) =>
  axios.get(`${BASE_URL}/category/${category}`);
export const getAllCategories = () =>
  axios.get(`${BASE_URL}/categories`);
