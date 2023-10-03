import { productsLoading, productsLoaded, productsError } from './ProductsSlice';
import { fetchProducts } from '../api/productsApi';
import { AppDispatch } from '@/store';

export const getProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(productsLoading());
    const response = await fetchProducts();
    dispatch(productsLoaded(response.data));
  } catch (error: any) { // Явно указываем тип как any, можно указать более конкретный тип ошибки, если известен
    dispatch(productsError(error.message));
  }
};