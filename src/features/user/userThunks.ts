import { fetchUser } from '../api/userApi';
import { Dispatch } from 'redux';
import { userLoading, userLoaded, userError,} from './userSlice'
// import { AppDispatch } from './store'; // Предполагается, что у вас есть store и AppDispatch
// import { removeFromCartRequest, removeFromCartSuccess, removeFromCartFailure } from './cartSlice';
// import axios from 'axios';
// Создаем асинхронную Thunk для получения пользователя по id
  
  export const getUser = (id:string) => {
    return async (dispatch: Dispatch) => {
      try {
        dispatch(userLoading());
        const data = await fetchUser(id);
        dispatch(userLoaded(data));
      } catch (error) {
        const errorMessage = typeof error === 'string' ? error : 'An error occurred';
        dispatch(userError(errorMessage));
      }
    };
  };
  // export const removeProductFromCart = (userId: string, productId: string) => async (dispatch: AppDispatch) => {
  //   try {
  //     dispatch(removeFromCartRequest());
  
  //     // Выполните запрос на удаление товара
  //     await axios.delete(`/cart/removeFromCart/${userId}/${productId}`);
  
  //     dispatch(removeFromCartSuccess());
  //   } catch (error) {
  //     dispatch(removeFromCartFailure(error.message));
  //   }
  // };