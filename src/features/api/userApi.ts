import axios from 'axios';

const baseURL = 'http://localhost:3200'; // Замените на базовый URL вашего сервера

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Настройте таймаут запроса, если необходимо
  headers: {
    'Content-Type': 'application/json',
  },
});


export const fetchUserFromAPI = async () => {
  try {
    const response = await axiosInstance.get('/user:id'); // Пример запроса к серверу
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};