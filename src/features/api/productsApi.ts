// productsApi.ts

import axios from 'axios';
import { Product } from '../products/ProductsSlice';
const baseURL = 'http://localhost:3500'; // Замените на базовый URL вашего сервера

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Настройте таймаут запроса, если необходимо
  headers: {
    'Content-Type': 'application/json',
  },
});


export const fetchProducts = async (nextPage: number, itemsPerPage: number): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get(`/products?page=${nextPage}`
    // , {
    //   params: {
    //     startIndex: startIndex,
    //     itemsPerPage: itemsPerPage,
    //   },
    // }
    );

    console.log(response); // Замените на конечную точку вашего API
    return response.data as Product[];
  } catch (error) {
    throw error;
  }
};