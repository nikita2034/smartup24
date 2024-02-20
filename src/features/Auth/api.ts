// api.ts
import axios, { AxiosResponse } from 'axios';

export interface UserData {
  email: string;
  password: string;
  // Добавьте другие поля, если необходимо
}

interface AuthResponse {
  user: { displayName: string };
  token: string;
}

// Функция для регистрации пользователя
export const registerUser = async (userData: UserData): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post('/api/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функция для входа в систему
export const loginUser = async (userData: UserData): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post('/api/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
