// authAsync.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './api';
import { setUser, setToken, logout } from './authSlice';
import { UserData } from './api';
interface AuthResponse {
  user: { displayName: string };
  token: string;
}

export const registerAsync = createAsyncThunk('auth/register', async (userData: UserData, { dispatch }) => {
  try {
    const response: AuthResponse = await registerUser(userData);
    dispatch(setUser(response.user));
    dispatch(setToken(response.token));
    localStorage.setItem('token', response.token);
    return response;
  } catch (error:any) {
    console.error('Registration failed', error.message);
    throw error;
  }
});

// export const loginAsync = createAsyncThunk('auth/login', async (userData: UserData, { dispatch }) => {
//   try {
//     const response: AuthResponse = await loginUser(userData);
//     dispatch(setUser(response.user));
//     dispatch(setToken(response.token));
//     localStorage.setItem('token', response.token);
//     return response;
//   } catch (error) {
//     console.error('Login failed', error.message);
//     throw error;
//   }
// });
export const loginAsync = createAsyncThunk('auth/login', async (userData: UserData, { dispatch }) => {
  try {
    const response: AuthResponse = await registerUser(userData);

    // Выполнение асинхронных операций (если необходимо) перед отправкой действия
    // Например, сохранение данных в localStorage
    localStorage.setItem('token', response.token);

    // Отправка синхронного действия с использованием dispatch
    dispatch(setUser(response.user));
    dispatch(setToken(response.token));

    return response;
  } catch (error:any) {
    console.error('Login failed', error.message);
    throw error;
  }
});
