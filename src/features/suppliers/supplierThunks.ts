
import { fetchSuppliers } from '../api/suppliersApi'; // Импортируйте функцию для запроса к серверу
import { Dispatch } from 'redux';
import { supplierLoading, supplierLoaded, supplierError } from './SuppliersSlice';

export const getSuppliers = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(supplierLoading());
      const data = await fetchSuppliers();
      console.log(data)
      dispatch(supplierLoaded(data));
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : 'An error occurred';
      dispatch(supplierError(errorMessage));
    }
  };
};
