import { Dispatch } from 'redux';
import { productsLoading, productsLoaded, productsError } from './ProductsSlice';
import { fetchProducts } from '../api/productsApi';

export const getProducts = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(productsLoading());
      const data = await fetchProducts();
      dispatch(productsLoaded(data));
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : 'An error occurred';
      dispatch(productsError(errorMessage));
    }
  };
};