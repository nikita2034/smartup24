import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Создаем асинхронную Thunk для получения пользователя по id
interface UserData {
    id: string;
    name: string;
    // Другие поля пользователя
  }
  
// export const getProducts = () => {
//   return async (dispatch: Dispatch) => {
//     try {
//       dispatch(productsLoading());
//       const data = await fetchProducts();
//       dispatch(productsLoaded(data));
//     } catch (error) {
//       const errorMessage = typeof error === 'string' ? error : 'An error occurred';
//       dispatch(productsError(errorMessage));
//     }
//   };
// };

  // Создание Thunk для получения данных пользователя по ID
  export const fetchUser = createAsyncThunk<UserData, string>(
    'user/fetchUserById', // Уникальное имя для Thunk
    async (id, thunkAPI) => {
      try {
        // Отправляем GET-запрос на сервер, передавая id пользователя в URL
        const response = await axios.get(`http://localhost:3300/user/${id}`);
        console.log(response.data);
        // Возвращаем полученные данные как результат успешного запроса
        return response.data as UserData;
      } catch (error:any) {
        // В случае ошибки, используем rejectWithValue для передачи ошибки
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
      }
    }
  );