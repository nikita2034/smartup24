import axios from 'axios';

const baseURL = 'http://localhost:3500'; // Замените на базовый URL вашего сервера

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Настройте таймаут запроса, если необходимо
  headers: {
    'Content-Type': 'application/json',
  },
});


export const fetchSearchProducts = async (query:string) => {
  try {
    const response = await axiosInstance.get(`/products?search=${query}`);
    // const response = await axios.get(`/api/products?query=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

