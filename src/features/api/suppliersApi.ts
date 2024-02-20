// supplierAPI.ts
import axios from 'axios';

const baseURL = 'http://localhost:3500'; // Замените на фактический URL вашего сервера

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Настройте таймаут запроса, если необходимо
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSuppliers = async () => {
  try {
    const response = await axiosInstance.get('/suppliers'); // Замените на конечную точку вашего API
    return response.data;
  } catch (error) {
    throw error;
  }
};
