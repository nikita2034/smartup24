import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSuppliers } from '../api/suppliersApi'; // Импортируйте функцию для запроса к серверу

export const fetchSuppliersAsync = createAsyncThunk('suppliers/fetchSuppliers', async () => {
    try {
      // dispatch(productsLoading());
      // const data = await fetchProducts();
      // dispatch(productsLoaded(data));
      console.log('dddd');
      const response = await fetchSuppliers();
      // dispatch(productsLoaded(response.data));
        console.log(response);
      return response;
    
    } catch (error) {
      // const errorMessage = typeof error === 'string' ? error : 'An error occurred';
      // dispatch(productsError(errorMessage));
    }


  // const response = await fetchSuppliers();
  // return response.data;
});


